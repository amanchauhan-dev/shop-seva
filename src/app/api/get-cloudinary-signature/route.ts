import crypto from "crypto";
import { ApiErrorServer } from "@/lib/ApiErrorServer";
import { NextRequest, NextResponse } from "next/server";

const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string; // Replace with your Cloudinary API secret




export async function GET(req: NextRequest) {
    try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = crypto
            .createHash("sha1")
            .update(`timestamp=${timestamp}${CLOUDINARY_API_SECRET}`)
            .digest("hex");

        return NextResponse.json({ timestamp, signature }, { status: 200 });
    } catch (error) {
        return ApiErrorServer(error)
    }

}
