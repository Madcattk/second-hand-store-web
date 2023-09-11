import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaProductStatus } from "@components/Meta";

export async function POST(request) {
    const { Product_Type_Id, Product_Id, Product_Name } = await request.json();
    try { 
        const _p = Product_Name.split(' ').filter(Boolean);
        const likeConditions = _p.map(item => `LOWER(p.Product_Name) LIKE LOWER('%${item}%')`);
        const likeClause = likeConditions.join(' OR '); 
        
        const conn = await dbConnection();
        let query = `
            SELECT p.*, s.Size_Name, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating, m.Member_Username
            FROM Product p
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Member m ON ss.Member_Id = m.Member_Id
            WHERE p.Product_Type_Id = ${Product_Type_Id} 
                    AND p.Product_Status = '${MetaProductStatus[0].id}'
                    AND p.Product_Id != ${Product_Id}
                    AND (${likeClause})
            LIMIT 4;
        `;
        let values = [];
        let [result] = await conn.execute(query, values);
        let data = result;
        let id = [Product_Id]

        for (let i = 0; i < data.length; i++) {
            id.push(data?.[i]?.Product_Id);
        }
        
        if(data?.length < 4){
            query = `
            SELECT p.*, s.Size_Name, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating, m.Member_Username
            FROM Product p
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Member m ON ss.Member_Id = m.Member_Id
            WHERE p.Product_Type_Id = ${Product_Type_Id} 
                    AND p.Product_Status = '${MetaProductStatus[0].id}'
                    AND p.Product_Id NOT IN (${id.join(', ')})
            LIMIT ${4 - data?.length};
            `;
            let [result2] = await conn.execute(query, values);
            data?.push(...result2)
        }

        if(data?.length < 4){
            query = `
            SELECT p.*, s.Size_Name, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating, m.Member_Username
            FROM Product p
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Member m ON ss.Member_Id = m.Member_Id
            WHERE p.Product_Status = '${MetaProductStatus[0].id}'
                    AND p.Product_Id NOT IN (${id.join(', ')})
                    AND (${likeClause})
            LIMIT ${4 - data?.length};
            `;
            let [result3] = await conn.execute(query, values);
            data?.push(...result3)
        }

        if(data?.length < 4){
            query = `
            SELECT p.*, s.Size_Name, pt.Product_Type_Name, r.Review_Id, r.Review_Detail, r.Review_Rating, m.Member_Username
            FROM Product p
            LEFT JOIN Size s ON p.Size_Id = s.Size_Id
            JOIN Product_Type pt ON p.Product_Type_Id = pt.Product_Type_Id
            LEFT JOIN Review r ON p.Product_Id = r.Product_Id
            LEFT JOIN Sale ss ON p.Sale_Id = ss.Sale_Id
            LEFT JOIN Member m ON ss.Member_Id = m.Member_Id
            WHERE p.Product_Status = '${MetaProductStatus[0].id}'
                    AND p.Product_Id NOT IN (${id.join(', ')})
            LIMIT ${4 - data?.length};
            `;
            let [result4] = await conn.execute(query, values);
            data?.push(...result4)
        }
        
        conn.end();
        return NextResponse.json({ data , message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
