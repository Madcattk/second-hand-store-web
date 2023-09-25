import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { searchInput, searchType, searchSex } = await request.json();
    try {       
        const conn = await dbConnection();
        let query = '';
        let values = [];
        if(searchType && searchSex){
            query = `
                SELECT p.*, s.Size_Name, pt.Product_Type_Name
                FROM Product p
                LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                WHERE p.Product_Type_Id = '${searchType}' AND p.Product_Sex = '${searchSex}'
                ORDER BY Product_Status;
            `;
        }
        else if(searchType && !searchSex){
            query = `
                SELECT p.*, s.Size_Name, pt.Product_Type_Name
                FROM Product p
                LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                WHERE p.Product_Type_Id = '${searchType}' 
                ORDER BY Product_Status;
            `;
        }
        else if(searchInput){
            query = `
                SELECT p.*, s.Size_Name, pt.Product_Type_Name
                FROM Product p
                LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                WHERE LOWER(p.Product_Name) LIKE LOWER(?)
                ORDER BY Product_Status;
            `;
            values = [`%${searchInput.toLowerCase()}%`]
        }
        else if(searchSex && !searchType){
            query = `
                SELECT p.*, s.Size_Name, pt.Product_Type_Name
                FROM Product p
                LEFT JOIN Size s ON p.Size_Id = s.Size_Id
                JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
                WHERE p.Product_Sex = '${searchSex}' 
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
