import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getProductById } from "@app/api/getAPI/product";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const {Product_Name,
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

        const formattedDate = DateFormat(Product_Date)
    try {       
        const conn = await dbConnection();
        const [existingEmployee] = await conn.execute('SELECT * FROM Employee WHERE Employee_Email = ?', [Employee_Email]);

        if (existingEmployee.length > 0) {
            conn.end();
            return NextResponse.json({ message: "duplicated" }, { status: 201 });
        }
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
                formattedDate,
                Product_Status,
                Product_Type_Id,
                Size_Id,
                Product_Size_Detail,
                Sale_Id
        ];
        const [result] = await conn.execute(query, values);
        const res = await getEmployeeById(result?.insertId || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
