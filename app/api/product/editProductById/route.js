import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getProductById } from "@app/api/getAPI/product";

export async function PUT(request) {
    const { Product_Id,
        Product_Name,
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
        const query = `UPDATE Product SET 
            Product_Name = ?, 
            Product_Price = ?, 
            Product_Description = ?, 
            Product_Image = ?, 
            Product_Sex = ?, 
            Product_Date = ?, 
            Product_Status = ?, 
            Product_Type_Id = ?, 
            Size_Id = ?,
            Product_Size_Detail = ?,
            Sale_Id = ?
            WHERE Product_Id = ?`;
        const values = [
            Product_Name,
            Product_Price,
            Product_Description,
            Product_Image,
            Product_Sex,
            Product_Date,
            Product_Status,
            Product_Type_Id,
            Size_Id,
            Product_Size_Detail,
            Sale_Id,
            Product_Id
        ];

        const [result] = await conn.execute(query, values);
        const res = await getProductById(Product_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
