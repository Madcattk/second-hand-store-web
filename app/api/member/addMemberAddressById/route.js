import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getMemberAddressesById } from "@app/api/getAPI/member";

export async function POST(request) {
    const { Member_Id, Member_Address } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `INSERT INTO Member_Address (Member_Id, Member_Address) VALUES (?, ?)`;
        const values = [Member_Id, Member_Address];
        const [result] = await conn.execute(query, values);
        const res = await getMemberAddressesById(Member_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
