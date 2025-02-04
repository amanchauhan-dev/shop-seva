import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, query: any) {
    try {
        const { token } = await query.params;
        // verify email 
        const user = await sql`
            UPDATE users
            SET is_verified = true
            WHERE email_verify_token = ${token}
            RETURNING *
        `
        return NextResponse.json({ message: "Email verified successfully.", token,user })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong.",error })
    }
}