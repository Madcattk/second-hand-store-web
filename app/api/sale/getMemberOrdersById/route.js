import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Member_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        let query = `
            SELECT * 
            FROM Sale 
            WHERE Member_Id = ${Member_Id} 
            ORDER BY Sale_Date DESC`;
        let values = [];
        const [result] = await conn.execute(query, values);
        const data = result;
        
        if(result?.length > 0){
            for (let i = 0; i < result.length; i++) {
                query = `
                    SELECT Product_Image
                    FROM Product 
                    WHERE Sale_Id = ${result?.[i]?.Sale_Id}`;
                const [product] = await conn.execute(query, values);
                result[i] = {...result[i], Product_Images: product}
            }
        }

        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
