import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Size_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `DELETE FROM Size WHERE Size_Id = ?`;
        const values = [Size_Id];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}