import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Sale_Total_Price, Member_Id } = await request.json();
    const today = new Date().toISOString().split('T')[0];
    try {       
        const conn = await dbConnection();
        const query = `
            SELECT p.*
            FROM Promotion p
            LEFT JOIN Sale ON p.Promotion_Id = Sale.Promotion_Id AND Sale.Member_Id = ${Member_Id}
            WHERE Sale.Promotion_Id IS NULL
                AND Promotion_Start_Date <= '${today}'
                AND Promotion_End_Date >= '${today}'
                AND Promotion_Price_Condition <= ${Sale_Total_Price};
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
