import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { searchInput, searchType, searchSex } = await request.json();
    try {       
        const conn = await dbConnection();
        let query = '';
        let values = [];
        if(searchType){
            query = `
                SELECT *
                FROM Product
                WHERE Product_Type_Id = '${searchType}' 
                ORDER BY Product_Status;
            `;
        }
        else if(searchInput){
            query = `
                SELECT *
                FROM Product
                WHERE LOWER(Product_Name) LIKE LOWER(?)
                ORDER BY Product_Status;
            `;
            values = [`%${searchInput.toLowerCase()}%`]
        }
        else if(searchSex){
            query = `
                SELECT *
                FROM Product
                WHERE Product_Sex = '${searchSex}' 
                ORDER BY Product_Status;
            `;
        }
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
