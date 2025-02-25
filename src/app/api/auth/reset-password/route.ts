import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import sql from "@/lib/db";
import { ChangePasswordSchema } from "@/validations/user";
import { ApiErrorServer } from "@/lib/ApiErrorServer";
export async function POST(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());

        // Check if token exists in query params
        if (!queryParams?.token) {
            return NextResponse.json({ message: "Token is missing." }, { status: 400 });
        }

        // Verify and decode the JWT token
        const decoded = jwt.verify(queryParams.token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        const body = await req.json()
        const data = ChangePasswordSchema.parse(body)
        // Ensure email exists in the decoded token
        if (!decoded?.email) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }

        // Update the database using the decoded email
        await sql`
            UPDATE users
            SET password = ${data.password}
            WHERE email = ${decoded.email} AND  email_verify_token = ${queryParams?.token}
        `;

        return NextResponse.json({ message: "Password changed successfully." });
    } catch (error) {
        return ApiErrorServer(error)
    }
}