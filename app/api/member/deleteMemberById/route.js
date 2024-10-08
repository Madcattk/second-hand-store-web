import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";

export async function DELETE(request) {
    const { Member_Id } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `DELETE FROM Member WHERE Member_Id = ?`;
        const values = [Member_Id];
        const [result] = await conn.execute(query, values);
        const data = result;
        conn.end();
        return NextResponse.json({ data, message: "success" }, { status: 200 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
