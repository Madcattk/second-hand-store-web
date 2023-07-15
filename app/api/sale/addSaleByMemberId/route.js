import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Delivery_Address,
        Sale_Date,
        Sale_Status,
        Sale_Tracking_Number,
        Member_Id,
        Sale_Total_Price,
        Discounted_Total_Price,
        Promotion_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = 
        `INSERT INTO Sale 
        (Delivery_Address,
            Sale_Date,
            Sale_Status,
            Sale_Tracking_Number,
            Member_Id,
            Sale_Total_Price,
            Discounted_Total_Price,
            Promotion_Id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [Delivery_Address,
            Sale_Date,
            Sale_Status,
            Sale_Tracking_Number,
            Member_Id,
            Sale_Total_Price,
            Discounted_Total_Price,
            Promotion_Id];
            console.log(query, values);
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
