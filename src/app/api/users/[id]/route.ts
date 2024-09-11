import { NextRequest, NextResponse } from "next/server";
import { UserRequest } from "../route";
import query from "@/app/lib/mysql";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const slug = params.id // user id
    console.log('Received slug:', slug);
    if (!slug) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    try {
        const queryResult = await query("SELECT * FROM users where User_id = ?", [slug]);
        return NextResponse.json({ message: 'success', user: queryResult });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}

export async function PUT(req: NextRequest,
    { params }: { params: { id: string } }): Promise<NextResponse> {
    const id = params.id // user id
    console.log('Received id:', id);
    const body: UserRequest = await req.json() as UserRequest;

    const { Name, Email, Password } = body;

    // return NextResponse.json({ message: 'success', data: { Name, Email, Password } })

    try {
        const queryResult = await query(
            `UPDATE users
             SET Name = ?, Email = ?, Password = ?
             WHERE User_id = ?;`
            , [Name, Email, Password, id]);
        return NextResponse.json({ message: 'success', updateUser: queryResult });
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