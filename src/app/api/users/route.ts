import { NextResponse } from "next/server";
import query from "@/app/lib/mysql";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const queryResult = await query("SELECT * FROM customers", []);
        return NextResponse.json(queryResult);
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