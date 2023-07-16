import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function PUT(request) {
    const { Sale_Status, Sale_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Sale SET 
        Sale_Status = ?
        WHERE Sale_Id = ?;`;
        const values = [Sale_Status, Sale_Id];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
