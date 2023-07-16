import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { DateTimeFormat } from "@components/formats";

export async function PUT(request) {
    const { Payment_Slip, Sale_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Payment SET 
            Payment_Slip = ?,
            Payment_Date = ?
            WHERE Sale_Id = ?`;
        const values = [Payment_Slip, DateTimeFormat(new Date()), Sale_Id];
        const [result] = await conn.execute(query, values);
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
