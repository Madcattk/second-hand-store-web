import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function POST(request) {
    const { Member_Email, 
        Member_Password, } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `SELECT * FROM Member WHERE Member_Email = ? AND Member_Password = ?`;
        const values = [Member_Email, Member_Password];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
