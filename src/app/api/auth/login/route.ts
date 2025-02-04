import { NextRequest, NextResponse } from "next/server";
import { LoginUserSchema, PublicUserFieldNames, User } from "@/validations/userModel";
import sql from "@/lib/db";
import { compareSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import { serialize } from "cookie";
import { filterObject } from "@/lib/utils";
import { ApiErrorServer, CustomError } from "@/lib/ApiErrorServer";
import { NextApiResponse } from "next";

export const POST = async (req: NextRequest, res: NextApiResponse) => {
    try {
        const url = new URL(req.url);
        const { rememberMe } = Object.fromEntries(url.searchParams.entries());
        const body = await req.json()
        // validate
        const data = LoginUserSchema.parse(body)
        // fetch user
        const user: User = await sql`
                SELECT *
                FROM users 
                WHERE email = ${data.email}
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
            { userId: user[0].id, email: user[0].email, role: user[0].role },
            process.env.JWT_SECRET!,
            { expiresIn: '1h', });

        let cookieExpire = 60 * 60;
        if (rememberMe && rememberMe == 'true') {
            accessToken = jwt.sign(
                { userId: user[0].id, email: user[0].email, role: user[0].role },
                process.env.JWT_SECRET!,
                { expiresIn: '7d', });
            cookieExpire = 7 * 24 * 60 * 60;
        }

        const newUser = filterObject(user[0], PublicUserFieldNames)
        const response = NextResponse.json({ message: "Login successful", user: newUser });
        response.headers.set(
            "Set-Cookie",
            serialize("accessToken", accessToken, {
                httpOnly: true,
                secure: true,
                path: "/",
                sameSite: "strict",
                maxAge: cookieExpire  // 1 hour
            })
        );
        return response;

    } catch (error: any) {
        return ApiErrorServer(error)
    }
}