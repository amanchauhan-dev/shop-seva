import { NextResponse } from "next/server";
import { PostgresError } from "postgres";
import { ZodError } from "zod";


export class CustomError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "CustomError";
    }
}
export const ApiErrorServer = (error: Error | ZodError | CustomError | PostgresError | any) => {
    // console.error(error); // Log error for debugging
    if (error instanceof ZodError) {
        return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }
    if (error.message == 'Unexpected end of JSON input') {
        return NextResponse.json({ error: "Make sure to provide body data or empty body {}" }, { status: 400 });
    }

    if (error instanceof CustomError) {
        return NextResponse.json(
            { error: error.message },
            { status: error.statusCode }
        );
    }

    if (error instanceof PostgresError && error.code === '23505') {
        return NextResponse.json({ error: "Email already exists." }, { status: 400 });
    }

    if (error instanceof PostgresError && error.code === '22P02') {
        return NextResponse.json({ message: "Invalid uuid" }, { status: 400 });
    }

    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
};