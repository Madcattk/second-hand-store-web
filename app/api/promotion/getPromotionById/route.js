import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Promotion_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `SELECT * FROM Promotion WHERE Promotion_Id = ${Promotion_Id} `;
        const values = [];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
