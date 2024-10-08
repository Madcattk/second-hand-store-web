import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Sale_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        let query = `
        SELECT s.*, p.* 
        FROM Sale s
        LEFT JOIN Promotion p ON s.Promotion_Id = p.Promotion_Id
        WHERE s.Sale_Id = ${Sale_Id} `;
        let values = [];
        let [result] = await conn.execute(query, values);
        let data = result;

        query = `
        SELECT p.* 
        FROM Sale s
        JOIN Payment p ON p.Sale_Id = s.Sale_Id
        WHERE s.Sale_Id = ${Sale_Id} `;
        values = [];
        [result] = await conn.execute(query, values);
        let update = {...data[0], Payment: result[0]}
        data = update;
        
        query = `
            SELECT p.*, s.*, pt.*, r.Review_Id
            FROM Sale ss 
            JOIN Product p ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            WHERE ss.Sale_Id = ${Sale_Id} `;
        values = [];
        [result] = await conn.execute(query, values);
        update = {...data, Product: result}
        data = update;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
