import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/mysql";


export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id

    try {
        const db = await pool.getConnection()

        const query = 'select * from customers where id = ' + slug
        const [rows] = await db.execute(query, [slug])
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}