import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function GET(request) {
    try {       
        const conn = await dbConnection()
        const query = 'SELECT * from Size';
        const values = [];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({data, message: "success"}, {status: 201});
    } catch (error) {        
        return NextResponse.json({error, message: "error"}, {status: 500});
    }
}