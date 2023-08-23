import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaProductStatus } from "@components/Meta";

export async function GET(request) {
    try {       
        const conn = await dbConnection();
        const query = `
            SELECT Product_Id, Product_Image
            FROM Product
            WHERE Product_Status = '${MetaProductStatus[0].id}'
            ORDER BY Product_Id ASC
            LIMIT 6;
        `;
        const values = [];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
