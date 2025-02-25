import { ApiErrorServer } from '@/lib/ApiErrorServer';
import sql from '@/lib/db';
import { getPaginated } from '@/utils/apiPagination';
import { CreateLabelSchema } from '@/validations/label';
import { NextRequest, NextResponse } from 'next/server';

// get all 

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());
        // pagination code
        const { limit, offset, page } = getPaginated(url)

        // filter code
        const { order, is_active, search, sort } = queryParams;

        const whereClauses = [];
        if (is_active && (is_active == 'true' || is_active == 'false')) whereClauses.push(sql`is_active = ${is_active == 'false' ? false : true}`);
        if (search) whereClauses.push(sql`name LIKE ${'%' + search + '%'}`);
        let whereQuery = sql``;
        if (whereClauses.length > 0) {
            whereQuery = sql`WHERE ${whereClauses[0]} `
            for (let i = 1; i < whereClauses.length; i++) {
                whereQuery = sql`${whereQuery} AND ${whereClauses[i]}`
            }
        }
        let sorting = 'created_at';
        if (sort && sort.toLocaleLowerCase() === 'name') {
            sorting = 'name';
        }

        let ordering = 'asc';
        if (order && order.toLowerCase() === 'desc') {
            ordering = 'desc';
        }
        // Ensure sorting is correctly formatted
        const result = await sql`
            SELECT * 
            FROM labels 
            ${whereQuery}
            ORDER BY ${sql(sorting)} ${ordering == 'asc' ? sql`ASC` : sql`DESC`} 
            LIMIT ${limit} 
            OFFSET ${offset}
        `;
        // get total data
        const total = await sql`
                SELECT 
                COUNT(name) as count
                FROM labels 
                    ${whereQuery}
                `
        // return response
        let message = 'Data found'
        if (result.length == 0) {
            message = 'Data not found'
        }
        return NextResponse.json({
            message, length: result.length,
            params: queryParams,
            pagination: { page, limit },
            total: parseInt(total[0].count),
            data: result,
        });
    } catch (error) {
        return ApiErrorServer(error)
    }
}


// Add  

export const POST = async (req: NextRequest) => {
    try {
        const form = await req.json();
        // validate
        const data = CreateLabelSchema.parse(form)
        // create brand
        const result = await sql`
        INSERT INTO labels 
        (
        name,
        is_active
        )
        VALUES
        (
        ${data.name},
        ${data.is_active == 'true' ? true : false}
        )
        returning *
        `
        return NextResponse.json({ message: "Created successfully", data: result[0] })
    } catch (error: any) {
        if (error.code === '23505') {
            return NextResponse.json({ error: "Data already exists." }, { status: 400 });
        }
        return ApiErrorServer(error)
    }
}
