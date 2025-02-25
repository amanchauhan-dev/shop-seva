import { NextRequest, NextResponse } from "next/server";
import { ForgotPassword, ForgotPasswordSchema } from "@/validations/user";
import sql from "@/lib/db";
import { SendForgotPasswordMail } from "@/lib/mailer";
import { ApiErrorServer } from "@/lib/ApiErrorServer";
import jwt from 'jsonwebtoken'

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data: ForgotPassword = ForgotPasswordSchema.parse(body)
        // create email verify token
        const token = jwt.sign(
            { email: data.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h', });
        // save user in database
        await sql`
        UPDATE users
        SET forgot_password_token= ${token} WHERE email = ${data.email}
        `
        // Send verification mail
        await SendForgotPasswordMail(data.email, token, data.email_callback_url || process.env.NEXT_PUBLIC_SERVER_URL + '/api/auth/reset-password')
        return NextResponse.json({ message: "Password reset link is sent to your email" }, { status: 201 });
    } catch (error) {
        return ApiErrorServer(error)
    }
}