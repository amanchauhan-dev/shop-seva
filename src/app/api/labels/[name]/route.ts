import { ApiErrorServer } from "@/lib/ApiErrorServer";
import sql from "@/lib/db";
import { UpdateLabelSchema } from "@/validations/label";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {
    try {
        const { name } = await context.params;
        const result = await sql`
        SELECT * FROM labels WHERE name = ${name}
        `
        if (result.length == 0) {
            return NextResponse.json({ message: "Data not found", data: [] });
        }
        return NextResponse.json({ message: "Data found", data: result[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}


export const PUT = async (req: NextRequest, context: any) => {
    try {
        const { name } = await context.params
        const body = await req.json()
        const data = UpdateLabelSchema.parse(body)
        const result = await sql`
        UPDATE 
            labels 
        SET 
            name = ${data.name},
            is_active = ${data.is_active == 'true' ? true : false}
        WHERE 
            name = ${name}
             RETURNING *
        `
        if (result.length == 0) {
            return NextResponse.json({ message: "Data not found", data: [] });
        }
        return NextResponse.json({
            message: "Updated successfully",
            data: result[0]
        })
    } catch (error) {
        return ApiErrorServer(error)
    }
}

export async function DELETE(req: NextRequest, context: any) {
    try {
        const { name } = await context.params;
        const result = await sql`
        DELETE FROM labels WHERE name = ${name}
        returning *
        `
        return NextResponse.json({ message: "Deleted successfully", data: result[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}
