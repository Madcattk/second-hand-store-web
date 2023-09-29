import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaSaleStatus } from "@components/Meta";

export async function POST(request) {
    const { Start_Date, End_Date } = await request.json();
    try {       
        const conn = await dbConnection();
        let query = `
            SELECT s.*, p.Promotion_Name, p.Promotion_Discount, pm.Payment_Slip, pm.Payment_Date, pm.Employee_Id
            FROM Sale s
            LEFT JOIN Promotion p ON s.Promotion_Id = p.Promotion_Id
            LEFT JOIN Payment pm ON s.Sale_Id = pm.Sale_Id
            WHERE s.Sale_Date >= '${Start_Date}' 
            AND s.Sale_Date <= '${End_Date}' 
            AND (s.Sale_Status = '${MetaSaleStatus[2].id}' 
            OR s.Sale_Status = '${MetaSaleStatus[5].id}'
            OR s.Sale_Status = '${MetaSaleStatus[6].id}');`;
        let values = [];
        let [result] = await conn.execute(query, values);
        let data = result;

        const update = [];
        if (data?.length > 0) {
            for (const item of data) {
                query = `
                    SELECT p.*, s.*, pt.*, r.Review_Id
                    FROM Sale ss 
                    JOIN Product p ON p.Sale_Id = ss.Sale_Id
                    LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                    JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                    LEFT JOIN Review r ON p.Product_Id = r.Product_Id
                    WHERE ss.Sale_Id = '${item?.Sale_Id}' `;
                values = [];
                [result] = await conn.execute(query, values);
                update.push({ ...item, Product: result });
            }
            data = update;
        }

        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
