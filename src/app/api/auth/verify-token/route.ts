import { ApiErrorServer } from "@/lib/ApiErrorServer";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import sql from "@/lib/db";
import { PublicUserFieldNames, User } from "@/validations/userModel";
import { filterObject } from "@/lib/utils";

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
        if (!decoded?.id) {
            return NextResponse.json({ message: "Invalid token" }, { status: 400 });
        }
        const user: User = await sql`
        SELECT *
        FROM users 
        WHERE id = ${decoded.id} AND email_verified = true`

        const filteredUser = filterObject(user[0], PublicUserFieldNames)
        return NextResponse.json({ message: "Verify Token", user: filteredUser });
    } catch (error) {
        return ApiErrorServer(error)
    }
}
