import { ApiErrorServer } from "@/lib/ApiErrorServer";
import sql from "@/lib/db";
import { PublicUserFieldNames, UpdateUserSchema } from "@/validations/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextResponse, params: { params: any }) {
    try {
        const { id } = await params.params
        const user = await sql`
        SELECT ${sql(PublicUserFieldNames)} FROM users WHERE id = ${id}
        `
        if (user.length == 0) {
            return NextResponse.json({ message: "User not found" });
        }
        return NextResponse.json({ message: "User found", user: user[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}


export const PUT = async (req: NextRequest, params: { params: any }) => {
    try {
        const { id } = await params.params
        const body = await req.json();
        // validate
        const data = UpdateUserSchema.parse(body)
        // create user
        // const user = await sql`
        // UPDATE users 
        // (
        // full_name,
        // email,
        // phone_number,
        // date_of_birth,
        // avatar,
        // gender,
        // role,
        // email_verified
        // )
        // VALUES
        // (
        // ${data.full_name},
        // ${data.email},
        // ${data.phone_number},
        // ${data.date_of_birth},
        // ${data.avatar},
        // ${data.gender},
        // ${data.role},
        // ${true}
        // )
        // returning *
        // `
        return NextResponse.json({ message: "User Updated successfully", id })
    } catch (error) {
        return ApiErrorServer(error)
    }
}