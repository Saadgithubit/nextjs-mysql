import { NextRequest, NextResponse } from "next/server";
import { UserRequest } from "../route";
import User from "@/models/Users";
// import query from "@/app/lib/mysql";

// export async function GET(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     const slug = params.id // user id
//     console.log('Received slug:', slug);
//     if (!slug) {
//         return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
//     }
//     try {
//         const queryResult = await query("SELECT * FROM users where User_id = ?", [slug]);
//         return NextResponse.json({ message: 'success', user: queryResult });
//     } catch (error) {
//         if (error instanceof Error) {
//             return NextResponse.json({ error: error.message }, { status: 500 });
//         } else {
//             return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//         }
//     }
// }

export async function PUT(req: NextRequest,
    { params }: { params: { id: string } }): Promise<NextResponse> {
    const id = params.id // user id
    console.log('Received id:', id);
    const body = await req.json()
    const { name } = body;

    try {
        const user = await User.update(
            { name: name },
            { where: { id: id } }
        )
        return NextResponse.json({ message: 'updated successfull', user: user });
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const id = parseInt(params.id);
    console.log('Received id:', id);

    try {
        const deleteUser = async (userId: number) => {
            const deletedCount = await User.destroy({ where: { id: userId }, limit: 1 });
            if (deletedCount === 0) {
                return NextResponse.json({ message: 'No user found with that ID' }, { status: 404 });
            }
            return NextResponse.json({ message: 'User deleted successfully' });
        };

        return await deleteUser(id);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
