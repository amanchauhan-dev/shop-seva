import { NextRequest, NextResponse } from "next/server";
import { LoginUserSchema, PublicUserFieldNames } from "@/validations/user";
import sql from "@/lib/db";
import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
import { ApiErrorServer, CustomError } from "@/lib/ApiErrorServer";
import { filterObject } from "@/utils/utils";

export const POST = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const { rememberMe } = Object.fromEntries(url.searchParams.entries());
        const body = await req.json()
        // validate
        const data = LoginUserSchema.parse(body)
        // fetch user
        const user = await sql`
                SELECT *
                FROM users 
                WHERE email = ${data.email} AND is_active=true
        `

        if (user.length == 0) {
            throw new CustomError('Either email or password is wrong', 400)
        }
        // authenticate
        const isAuth = compareSync(data.password, user[0].password)
        if (isAuth == false) {
            throw new CustomError('Either email or password is wrong', 400)
        }

        // create token
        let accessToken = jwt.sign(
            { id: user[0].id, email: user[0].email, role: user[0].role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h', });
        let cookieExpire = 60 * 60;
        if (rememberMe && rememberMe == 'true') {
            accessToken = jwt.sign(
                { id: user[0].id, email: user[0].email, role: user[0].role },
                process.env.JWT_SECRET!,
                { expiresIn: '7d', });
            cookieExpire = 7 * 24 * 60 * 60;
        }

        // set last login 
        const date = new Date(Date.now())
        await sql`
            UPDATE users 
            SET last_login = ${date}
            WHERE id = ${user[0].id}
            `
        // filter data

        const newUser = filterObject(user[0], PublicUserFieldNames)
        // set cookies and send response 
        const response = NextResponse.json({ message: "Login successful", user: newUser });
        response.headers.set(
            "Set-Cookie",
            serialize("accessToken", accessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
                maxAge: cookieExpire  // 1 hour
            })
        );
        return response;

    } catch (error) {
        return ApiErrorServer(error)
    }
}