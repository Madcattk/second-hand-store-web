import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getProductTypeById } from "@app/api/getAPI/product-type";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Product_Type_Name } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `INSERT INTO Promotion_Type 
            (Product_Type_Name)
            VALUES (?)`;
            
        const values = [
            Product_Type_Name
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}