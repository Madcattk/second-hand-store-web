import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function GET(request) {
    try {       
        const conn = await dbConnection();
        let query = 'SELECT * FROM Employee';
        let values = [];
        const [result] = await conn.execute(query, values);
        let data = result;

        if(data?.length > 0){
            for (let index = 0; index < data.length; index++) {
                query = `
                    SELECT * FROM
                    Employee_Address 
                    WHERE Employee_Id = ?
                ;`;
                const [address] = await conn.execute(query, [data[index].Employee_Id]);
                data[index] = { ...data[index], Addresses: address };
            }
        }

        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
