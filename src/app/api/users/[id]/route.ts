import { ApiErrorServer } from "@/lib/ApiErrorServer";
import sql from "@/lib/db";
import { backendClient } from "@/lib/edgestore-server";
import { filterObject } from "@/utils/utils";
import { PublicUserFieldNames, UpdateUserSchema } from "@/validations/user";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, context: any) {
    try {
        const { id } = await context.params;
        const user = await sql`
        SELECT ${sql(PublicUserFieldNames)} FROM users WHERE id = ${id}
        `
        if (user.length == 0) {
            return NextResponse.json({ message: "User not found", data: [] });
        }
        return NextResponse.json({ message: "User found", data: user[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}


export const PUT = async (req: NextRequest, context: any) => {
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
            avatar: file,
            is_active: form.get('is_active'),
            avatarURL: form.get('avatarURL'),
        })
        let uploadResponse = null
        if (file) {
            uploadResponse = await backendClient.publicFiles.upload({
                content: {
                    blob: new Blob([file], { type: "image/*" }),
                    extension: "png",
                }
            });
        }
        const updatedUser = await sql`
                                WITH previous_data AS (
                                    SELECT avatar as prev_avatar, id FROM users WHERE id = ${id}
                                ),
                                updated_data AS (
                                    UPDATE users 
                                    SET
                                        full_name = ${data.full_name},
                                        email = ${data.email},
                                        phone_number = ${data.phone_number},
                                        date_of_birth = ${data.date_of_birth},
                                        avatar = ${uploadResponse?.url || data.avatarURL || null},
                                        gender = ${data.gender},
                                        role = ${data.role},
                                        is_active = ${data.is_active == 'true' ? true : false}
                                    WHERE id = ${id}
                                    RETURNING *
                                )
                                SELECT 
                                    p.*,  -- Previous data
                                    u.*   -- Updated data
                                FROM previous_data p
                                JOIN updated_data u ON p.id = u.id;
        `;

        const user = filterObject(updatedUser[0], PublicUserFieldNames)
        // delete last avatar 
        if (updatedUser.length > 0 && updatedUser[0].prev_avatar && updatedUser[0].prev_avatar.length) {
            await backendClient.publicFiles.deleteFile({ url: updatedUser[0].prev_avatar });
        }

        return NextResponse.json({
            message: "User Updated successfully", data: user
        })
    } catch (error) {
        return ApiErrorServer(error)
    }
}

export async function DELETE(req: NextRequest, context: any) {
    try {
        const { id } = await context.params;
        const data = await sql`
        DELETE FROM users WHERE id = ${id}
        returning *
        `
        const user = filterObject(data[0], PublicUserFieldNames)

        return NextResponse.json({ message: "User deleted successfully", data: user[0] });
    } catch (error) {
        return ApiErrorServer(error)
    }

}
