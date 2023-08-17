import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Product_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `
            SELECT p.*, s.Size_Name, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating, m.Member_Username
            FROM Product p
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Member m ON ss.Member_Id = m.Member_Id
            WHERE p.Product_Id = ${Product_Id} ;
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
