import { NextRequest, NextResponse } from "next/server";
import { SignUpUser, SignUpUserSchema } from "@/validations/userModel";
import sql from "@/lib/db";
import { genSaltSync, hashSync } from 'bcrypt'
import { SendEmailVerifyMail, transport } from "@/lib/mailer";
import { generateVerificationToken } from "@/utils/utils";
import { ApiErrorServer } from "@/lib/ApiErrorServer";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const data: SignUpUser = SignUpUserSchema.parse(body)
        // encrypt password
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(data.password, salt)
        // create email verify token
        const token = generateVerificationToken()
        await SendEmailVerifyMail(data.email, token, 'http://localhost:3000/api/verify-email')
        
        // save user in database
        const user = await sql`
                            INSERT INTO users
                                (full_name, email, password, phone_number,email_verify_token)
                                VALUES (${data.full_name}, ${data.email}, ${hashedPassword}, ${data.phone_number},${token})
                            returning *
        `
        // Send verification mail
        return NextResponse.json({ message: "User created successfully. Please verify your email.", user }, { status: 201 });
    } catch (error: any) {
        return ApiErrorServer(error)
    }
}