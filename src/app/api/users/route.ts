import { ApiErrorServer } from '@/lib/ApiErrorServer';
import sql from '@/lib/db';
import { backendClient } from '@/lib/edgestore-server';
import { getPaginated } from '@/utils/apiPagination';
import { filterObject } from '@/utils/utils';
import { AddUserSchema, PublicUserFieldNames } from '@/validations/user';
import { genSaltSync, hashSync } from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

// get all users

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        // pagination
        const { limit, offset, page } = getPaginated(url)
        // filter
        const { role, email_verified, is_active, search, gender } = queryParams;
        const whereClauses = [];
        if (role) whereClauses.push(sql`role = ${role}`);

        if (email_verified !== undefined) whereClauses.push(sql`email_verified = ${email_verified}`);
        if (gender !== undefined) {
            if (gender == 'unknown') {
                whereClauses.push(sql`gender is NULL`);
            } else {
                whereClauses.push(sql`gender = ${gender}`);
            }
        }

        if (is_active !== undefined) whereClauses.push(sql`is_active = ${is_active}`);

        if (search) whereClauses.push(sql`(full_name LIKE ${'%' + search + '%'} OR email LIKE ${'%' + search + '%'})`);

        let whereQuery = sql``;
        if (whereClauses.length > 0) {
            whereQuery = sql`WHERE ${whereClauses[0]} `
            for (let i = 1; i < whereClauses.length; i++) {
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
        let message = 'Users found'
        if (users.length == 0) {
            message = 'Users not found'
        }

        return NextResponse.json({
            message, length: users.length,
            total: parseInt(total[0].count),
            pagination: { page, limit },
            params: queryParams,
            data: users,
        });
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
            date_of_birth: form.get('date_of_birth'),
            avatar: file,
            is_active: form.get('is_active')
        })
        const userExist = await sql`
        SELECT * FROM users WHERE email = ${data.email}
        `
        if (userExist.length > 0) {
            return NextResponse.json({ message: "User already exist with this email", data: [] }, { status: 400 });
        }

        let uploadResponse = null
        if (file) {
            uploadResponse = await backendClient.publicFiles.upload({
                content: {
                    blob: new Blob([file], { type: "image/*" }),
                    extension: "png",
                }
            });
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
        email_verified,
        is_active
        )
        VALUES
        (
        ${data.full_name},
        ${data.email},
        ${data.phone_number || null},
        ${hashPassword},
        ${data.date_of_birth || null},
        ${uploadResponse?.url || null},
        ${data.gender || null},
        ${data.role || "customer"},
        ${false},
        ${data.is_active == 'true' ? true : false}
        )
        returning *
        `
        const createdUser = filterObject(result[0], PublicUserFieldNames)
        return NextResponse.json({ message: "User created successfully", data: createdUser })
    } catch (error) {
        return ApiErrorServer(error)
    }
}
