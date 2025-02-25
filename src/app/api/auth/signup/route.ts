import { NextRequest, NextResponse } from "next/server";
import { SignUpUser, SignUpUserSchema } from "@/validations/user";
import sql from "@/lib/db";
import { genSaltSync, hashSync } from 'bcrypt'
import { SendEmailVerifyMail } from "@/lib/mailer";
import { ApiErrorServer } from "@/lib/ApiErrorServer";
import jwt from 'jsonwebtoken'
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data: SignUpUser = SignUpUserSchema.parse(body)
        // encrypt password
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(data.password, salt)
        // create email verify token
        const token = jwt.sign(
            { email: data.email },
            process.env.JWT_SECRET!,
            { expiresIn: '1h', });

        // save user in database
        await sql`
        INSERT INTO users
        (full_name, email, password, phone_number,email_verify_token)
        VALUES (${data.full_name}, ${data.email}, ${hashedPassword}, ${data.phone_number},${token})
        returning *
        `

        await SendEmailVerifyMail(data.email, token, data.email_callback_url || process.env.NEXT_PUBLIC_SERVER_URL + '/api/auth/verify-email')
        // Send verification mail
        return NextResponse.json({ message: "User created successfully. Please verify your email." }, { status: 201 });
    } catch (error) {
        return ApiErrorServer(error)
    }
}