import { NextRequest, NextResponse } from "next/server";
import query from "@/app/lib/mysql";

export interface UserRequest {
    Name: string;
    Email: string;
    Password: string;
}
export async function GET(req: Request): Promise<NextResponse> {
    try {
        const queryResult = await query("SELECT * FROM users", []);
        return NextResponse.json({ message: 'success', users: queryResult });
    } catch (error) {
        if (error instanceof Error) {
            // Handle known error type
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            // Handle unknown error type
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    const body: UserRequest = await req.json() as UserRequest;

    const { Name, Email, Password } = body;
    try {
        const queryResult = await query("INSERT into users (Name,Email,Password) value(?,?,?);", [Name, Email, Password]);
        return NextResponse.json({ message: 'success', data: queryResult });
    } catch (error) {
        if (error instanceof Error) {
            // Handle known error type
            return NextResponse.json({ message: error.message }, { status: 500 });
        } else {
            // Handle unknown error type
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}

