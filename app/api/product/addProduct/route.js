import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getProductById } from "@app/api/getAPI/product";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Product_Name,
        Product_Price,
        Product_Description,
        Product_Image,
        Product_Sex,
        Product_Date,
        Product_Status,
        Product_Type_Id,
        Size_Id,
        Product_Size_Detail,
        Sale_Id } = await request.json();
    try {
        const conn = await dbConnection();
        const query = `INSERT INTO Product 
                (Product_Name,
                Product_Price,
                Product_Description,
                Product_Image,
                Product_Sex,
                Product_Date,
                Product_Status,
                Product_Type_Id,
                Size_Id,
                Product_Size_Detail,
                Sale_Id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            Product_Name,
            Product_Price,
            Product_Description,
            Product_Image,
            Product_Sex,
            DateFormat(Product_Date),
            Product_Status,
            Product_Type_Id,
            Size_Id,
            Product_Size_Detail,
            Sale_Id
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
