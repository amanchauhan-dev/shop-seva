import { ApiErrorServer } from '@/lib/ApiErrorServer';
import sql from '@/lib/db';
import { saveFiles } from '@/lib/uploader';
import { filterObject } from '@/lib/utils';
import { AddUserSchema, FilterUserSchema, PublicUserFieldNames } from '@/validations/userModel';
import { genSaltSync, hashSync } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

// get all users

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        const { role, email_verified, search, page, limit } = FilterUserSchema.parse(queryParams);

        const offset = (page - 1) * limit;

        const whereClauses = [];
        if (role) whereClauses.push(sql`role = ${role}`);

        if (email_verified !== undefined) whereClauses.push(sql`email_verified = ${email_verified}`);

        if (search) whereClauses.push(sql`(full_name LIKE ${'%' + search + '%'} OR email LIKE ${'%' + search + '%'})`);

        let whereQuery = sql``;
        if (whereClauses.length > 0) {
            whereQuery = sql`WHERE ${whereClauses[0]} `
            for (let i = 1; i < whereClauses.length - 1; i++) {
                whereQuery = sql`${whereQuery} AND ${whereClauses[i]}`
            }
        }

        const users = await sql`
                SELECT 
                ${sql(PublicUserFieldNames)} 
                FROM users 
                    ${whereQuery} 
                ORDER BY 
                    created_at DESC
                LIMIT ${limit} 
                OFFSET ${offset}
                `
        const total = await sql`
                SELECT 
                COUNT(id) as count
                FROM users 
                    ${whereQuery}
                `

        if (users.length == 0) {
            return NextResponse.json({ message: "User not found", users: [] });
        }

        return NextResponse.json({ message: "User found", length: users.length, total: total[0].count, page: page, limit: limit, filter: queryParams, users });
    } catch (error) {
        return ApiErrorServer(error)
    }
}


// Add user 

export const POST = async (req: NextRequest) => {
    try {
        const form = await req.formData();
        const file = form.get("avatar") as File | null;
        // validate
        const data = AddUserSchema.parse({
            full_name: form.get('full_name'),
            email: form.get('email'),
            password: form.get('password'),
            gender: form.get('gender'),
            role: form.get('role'),
            phone_number: form.get('phone_number'),
            avatar: file
        })
        let uploadResponse = null
        if (file) {
            uploadResponse = await saveFiles(file)
            uploadResponse = uploadResponse[0]
        }
        // create user
        const salt = genSaltSync(10);
        const hashPassword = hashSync(data.password, salt)

        const result = await sql`
        INSERT INTO users 
        (
        full_name,
        email,
        phone_number,
        password,
        date_of_birth,
        avatar,
        gender,
        role,
        email_verified
        )
        VALUES
        (
        ${data.full_name},
        ${data.email},
        ${data.phone_number || null},
        ${hashPassword},
        ${data.date_of_birth || null},
        ${uploadResponse},
        ${data.gender || null},
        ${data.role || "customer"},
        ${true}
        )
        returning *
        `
        const createdUser = filterObject(result[0], PublicUserFieldNames)
        return NextResponse.json({ message: "User created successfully", user: createdUser, data })
    } catch (error) {
        return ApiErrorServer(error)
    }
}
