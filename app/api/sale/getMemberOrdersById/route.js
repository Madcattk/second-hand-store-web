import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Member_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `
            SELECT * 
            FROM Sale 
            WHERE Member_Id = ${Member_Id} 
            ORDER BY Sale_Date DESC`;
        const values = [];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
