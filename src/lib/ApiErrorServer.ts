import { NextResponse } from "next/server";
import { ZodError } from "zod";


export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomError";
    }
}
export const ApiErrorServer = (error: any) => {
    console.log('error', error);
    if (error instanceof ZodError) {
        return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }
    if (error.message == 'Unexpected end of JSON input') {
        return NextResponse.json({ error: "Fields are required", message: 'To know fields leave request body {}' }, { status: 400 });
    }

    if (error instanceof CustomError) {
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode }
        );
    }

    if (error.code === '23505') {
        return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }
    if (error.code === '23503') {
        return NextResponse.json({ error: error.detail }, { status: 400 });

    }
    if (error.code === '22P02' || error.code === 'UNDEFINED_VALUE') {
        return NextResponse.json({ message: "Invalid uuid or data not found", error: error }, { status: 400 });
    }
    if (error.message === 'invalid token') {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    return NextResponse.json({ error: "Something went wrong.", detail: error, message: error.message }, { status: 500 });
};