import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaSaleStatus } from "@components/Meta";

export async function POST(request) {
    const { Start_Date, End_Date } = await request.json();
    try {       
        const conn = await dbConnection()
        let query = `
            SELECT pt.*, 
            GROUP_CONCAT(CASE WHEN s.Sale_Status IN (
                '${MetaSaleStatus[2].id}',
                '${MetaSaleStatus[5].id}',
                '${MetaSaleStatus[6].id}'
            ) AND s.Sale_Date >= '${Start_Date}' AND s.Sale_Date <= '${End_Date}' THEN p.Product_Id ELSE NULL END) as Product,
            COUNT(CASE WHEN s.Sale_Status IN (
                '${MetaSaleStatus[2].id}',
                '${MetaSaleStatus[5].id}',
                '${MetaSaleStatus[6].id}'
            ) AND s.Sale_Date >= '${Start_Date}' AND s.Sale_Date <= '${End_Date}' THEN 1 ELSE NULL END) as Count, 
            SUM(CASE WHEN s.Sale_Status IN (
                '${MetaSaleStatus[2].id}',
                '${MetaSaleStatus[5].id}',
                '${MetaSaleStatus[6].id}'
            ) AND s.Sale_Date >= '${Start_Date}' AND s.Sale_Date <= '${End_Date}' THEN p.Product_Price ELSE 0 END) as Total_Price
            FROM Product_Type pt
            LEFT JOIN Product p ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Size size ON p.Size_Id = size.Size_Id 
            LEFT JOIN Sale s ON p.Sale_Id = s.Sale_Id 
            GROUP BY pt.Product_Type_Id
            ORDER BY Count DESC;
        `;
        let values = [];
        let [countResult] = await conn.execute(query, values);
        
        for (const item of countResult) {
            if (item.Product) {
                const query = `
                    SELECT p.*, s.Size_Name, ss.*, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating
                    FROM Product p
                    LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                    LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
                    JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                    LEFT JOIN Review r ON p.Product_Id = r.Product_Id
                    WHERE p.Product_Id IN (${item.Product});
                `;
                const values = [];
                const [product] = await conn.execute(query, values);
                item.Product = product;
            } else {
                item.Product = [];
            }
        }
    
        let data = countResult || null;
        conn.end();
        return NextResponse.json({data, message: "success"}, {status: 201});
    } catch (error) {   
        console.log(error);     
        return NextResponse.json({error, message: "error"}, {status: 500});
    }
}
