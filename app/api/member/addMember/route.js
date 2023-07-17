import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getMemberById } from "@app/api/getAPI/member";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Member_Firstname, 
        Member_Lastname, 
        Member_Username, 
        Member_Email, 
        Member_Password, 
        Member_Sex, 
        Member_Birth_Date, 
        Member_Image,
        Member_Phone } = await request.json();

        const formattedDate = DateFormat(Member_Birth_Date)
    try {       
        const conn = await dbConnection();
        const [existingMember] = await conn.execute('SELECT * FROM Member WHERE Member_Email = ?', [Member_Email]);

        if (existingMember.length > 0) {
            conn.end();
            return NextResponse.json({ message: "duplicated" }, { status: 400 });
        }
        const query = `INSERT INTO Member 
            (Member_Firstname, 
            Member_Lastname, 
            Member_Username, 
            Member_Email, 
            Member_Password, 
            Member_Sex, 
            Member_Birth_Date, 
            Member_Image, Member_Phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            Member_Firstname,
            Member_Lastname,
            Member_Username,
            Member_Email,
            Member_Password,
            Member_Sex,
            formattedDate,
            Member_Image,
            Member_Phone
        ];
        const [result] = await conn.execute(query, values);
        const res = await getMemberById(result?.insertId || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
