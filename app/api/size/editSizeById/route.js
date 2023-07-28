import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function PUT(request) {
    const { Size_Id,
        Size_Name } = await request.json();
    
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Size SET 
            Size_Name = ?
            WHERE Size_Id = ?`;
        const values = [
            Size_Name,
            Size_Id
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
