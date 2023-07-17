import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Review_Detail, Review_Rating, Product_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `INSERT INTO Review 
            (Review_Detail, Review_Rating, Product_Id)
            VALUES (?, ?, ?)`;
        const values = [Review_Detail, Review_Rating, Product_Id];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
