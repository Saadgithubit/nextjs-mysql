import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
export interface UserRequest {
    Name: string;
    Email: string;
    Password: string;
}
export async function GET(req: Request): Promise<NextResponse> {
    try {
        const users = await User.findAll();
        return NextResponse.json({ status: 200, message: 'User Get Successfull', users: users })
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    const body = await req.json(); // Read the JSON body
    const { name } = body;
    try {
        const newUser = await User.create({ name });
        return NextResponse.json({ message: 'User added successfully', newUser });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

