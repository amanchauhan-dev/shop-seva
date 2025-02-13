import { ApiErrorServer } from "@/lib/ApiErrorServer";
import sql from "@/lib/db";
import { saveFiles } from "@/lib/uploader";
import { filterObject } from "@/lib/utils";
import { PublicUserFieldNames, UpdateUserSchema } from "@/validations/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {
    try {
        const { id } = await context.params;
        const user = await sql`
        SELECT ${sql(PublicUserFieldNames)} FROM users WHERE id = ${id}
        `
        if (user.length == 0) {
            return NextResponse.json({ message: "User not found" });
        }
        return NextResponse.json({ message: "User found", user: user[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}


export const PUT = async (req: NextRequest, context:any) => {
    try {
        const { id } = await context.params
        const form = await req.formData();
        const file = form.get("avatar") as File | null;
        // validate
        const data = UpdateUserSchema.parse({
            full_name: form.get('full_name'),
            email: form.get('email'),
            role: form.get('role'),
            phone_number: form.get('phone_number'),
            gender: form.get('gender'),
            date_of_birth: form.get('date_of_birth'),
            avatar: file
        })
        let uploadResponse = null
        if (file) {
            uploadResponse = await saveFiles(file)
            uploadResponse = uploadResponse[0]
        }

        const updatedUser = await sql`
                        UPDATE users 
                        SET
                            full_name=${data.full_name},
                            email=${data.email},
                            phone_number=${data.phone_number},
                            date_of_birth= ${data.date_of_birth},
                            ${uploadResponse ? sql`avatar = ${uploadResponse},` : sql``}
                            gender=${data.gender},
                            role= ${data.role}
                        WHERE id = ${id}
                       RETURNING *, avatar AS previous_avatar;
        `
        const user = filterObject(updatedUser[0], PublicUserFieldNames)
        return NextResponse.json({ message: "User Updated successfully", updatedUser: user })
    } catch (error) {
        return ApiErrorServer(error)
    }
}



export async function DELETE(req: NextRequest, context: any ) {
    try {
        const { id } = await context.params;
        const data = await sql`
        DELETE FROM users WHERE id = ${id}
        returning *
        `
        const user = filterObject(data[0], PublicUserFieldNames)

        return NextResponse.json({ message: "User deleted successfully", user: user[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}
