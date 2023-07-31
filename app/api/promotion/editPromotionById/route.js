import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { DateFormat } from "@components/formats";

export async function PUT(request) {
    const { Promotion_Name,
        Promotion_Start_Date,
        Promotion_End_Date,
        Promotion_Discount,
        Promotion_Price_Condition } = await request.json();
        
    try {
        const conn = await dbConnection();
        const query = `UPDATE Promotion SET 
        Promotion_Name = ?,
        Promotion_Start_Date = ?,
        Promotion_End_Date = ?,
        Promotion_Discount = ?,
        Promotion_Price_Condition = ?
        WHERE Size_Id = ?`;
        const values = [
            Promotion_Name,
            DateFormat(Promotion_Start_Date),
            DateFormat(Promotion_End_Date),
            Promotion_Discount,
            Promotion_Price_Condition,
            Promotion_Id
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
