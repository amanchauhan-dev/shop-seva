import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import sql from "@/lib/db";
import { ApiErrorServer } from "@/lib/ApiErrorServer";
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const queryParams = Object.fromEntries(url.searchParams.entries());

        // Check if token exists in query params
        if (!queryParams?.token) {
            return NextResponse.json({ message: "Token is missing." }, { status: 400 });
        }

        // Verify and decode the JWT token
        const decoded = jwt.verify(queryParams.token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

        // Ensure email exists in the decoded token
        if (!decoded?.email) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }

        // Update the database using the decoded email
        await sql`
            UPDATE users
            SET email_verified = true
            WHERE email = ${decoded.email}
        `;

        return NextResponse.json({ message: "Email verified successfully." });
    } catch (error) {
       return ApiErrorServer(error)
    }
}