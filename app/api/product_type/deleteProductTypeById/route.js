import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Product_Type_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `DELETE FROM Product_Type WHERE Product_Type_Id = ?`;
        const values = [Product_Type_Id];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}