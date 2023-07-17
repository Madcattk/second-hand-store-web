import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Employee_Email, 
        Employee_Password, } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `SELECT * FROM Employee WHERE Employee_Email = ? AND Employee_Password = ?`;
        const values = [Employee_Email, Employee_Password];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
