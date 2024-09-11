import mysql from 'mysql2/promise'
import { NextResponse } from 'next/server'

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_SCHEMA,
//     waitForConnections: true
// })

// export default pool

export default async function query(queryString: string, values: any[] = []): Promise<any> {
    const dbConnection = mysql.createPool({
        host: process.env.DB_HOST!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASS!,
        database: process.env.DB_SCHEMA!,
        waitForConnections: true,
    });

    try {
        // Execute the query
        const [rows] = await dbConnection.execute(queryString, values);
        console.log('Database is connected');

        return rows;
    } catch (error) {
        // Handle and log the error
        if (error instanceof Error) {
            console.error(error.message);
            throw new Error(`Database query failed: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
            throw new Error('Database query failed: An unknown error occurred');
        }
    }
}