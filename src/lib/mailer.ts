import nodemailer from "nodemailer";

const emailDomain = process.env.MAILTRAP_EMAIL_DOMAIN || "shop@seva.com";

export const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER as string,
        pass: process.env.MAILTRAP_PASS as string,
    }
});

export const SendEmailVerifyMail = async (email: string, token: string, emailCallBackUrl: string) => {
    try {
       
        const verifyUrl = `${emailCallBackUrl}?token=${token}`;
        await transport.sendMail({
            from: emailDomain,
            to: email,
            subject: "Email Verification",
            html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email.</p>`,
        })
    } catch (error) {
        console.log('error',error);
    }
}

export const SendForgotPasswordMail = async (email: string, token: string, emailCallBackUrl: string) => {
    try {
       
        const verifyUrl = `${emailCallBackUrl}?token=${token}`;
        await transport.sendMail({
            from: emailDomain,
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="${verifyUrl}">here</a> to reset your password.</p>`,
        })
    } catch (error) {
        console.log('error',error);
    }
}