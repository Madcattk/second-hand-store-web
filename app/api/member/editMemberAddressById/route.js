import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getMemberAddressesById } from "@app/api/getAPI/member";

export async function PUT(request) {
    const { Member_Id, Member_Address, New_Member_Address } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Member_Address SET 
        Member_Address = ? WHERE Member_Id = ? AND Member_Address = ?`;
        const values = [New_Member_Address, Member_Id, Member_Address];
        const [result] = await conn.execute(query, values);
        const res = await getMemberAddressesById(Member_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
