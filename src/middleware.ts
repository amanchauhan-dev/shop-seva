import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        try {
            const token = request.cookies.get('accessToken')?.value || ''
            const { payload } = await jwtVerify(token, secret);
            if (payload?.role == 'owner' || payload?.role == 'admin') {
                return NextResponse.next()
            } else {
                return NextResponse.rewrite(new URL('/', request.url))
            }
        } catch (error: any) {
            return NextResponse.rewrite(new URL('/', request.url))
        }
    }

}