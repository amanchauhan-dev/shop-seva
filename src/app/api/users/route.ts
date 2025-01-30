import { NextResponse } from 'next/server';

// get all users

export async function GET() {
    try {
        // const user = new User()
        // user.firstName = 'John'
        // user.lastName = 'Doe'
        // user.email = 'email@gmail.com'
        // user.password = 'password'
        // user.phone = 'number'
        // const result = await user.save()
        return NextResponse.json({ message: "Hello World" });

    } catch (error) {
        return NextResponse.json({ message: "Error",error });
    }
}