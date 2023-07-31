import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getPromotionById } from "@app/api/getAPI/promotion";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Promotion_Name,
        Promotion_Start_Date,
        Promotion_End_Date,
        Promotion_Discount,
        Promotion_Price_Condition } = await request.json();
        
    try {
        const conn = await dbConnection();
        const query = `INSERT INTO Promotion
                (Promotion_Name, 
                Promotion_Start_Date, 
                Promotion_End_Date,
                Promotion_Discount,
                Promotion_Price_Condition)
                VALUES (?, ?, ?, ?, ?)`;
        const values = [
            Promotion_Name,
            DateFormat(Promotion_Start_Date),
            DateFormat(Promotion_End_Date),
            Promotion_Discount,
            Promotion_Price_Condition
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
