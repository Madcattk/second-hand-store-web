import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getMemberAddressesById } from "@app/api/getAPI/member";

export async function PUT(request) {
    const { Product_Id, Product_Status, Sale_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Product SET 
        Product_Status = ?,
        Sale_Id = ?
        WHERE Product_Id IN (${Product_Id.join(",")})`;
        const values = [Product_Status, Sale_Id];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
