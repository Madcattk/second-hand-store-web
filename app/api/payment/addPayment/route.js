import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { DateTimeFormat } from "@components/formats";

export async function POST(request) {
    const { Payment_Slip, Sale_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = 
        `INSERT INTO Payment 
        (Payment_Slip, Sale_Id, Payment_Date) 
        VALUES (?, ?, ?)`;
        const values = [Payment_Slip, Sale_Id, DateTimeFormat(new Date())];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
