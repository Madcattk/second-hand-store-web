import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getMemberById } from "@app/api/getAPI/member";
import { DateFormat } from "@components/formats";

export async function PUT(request) {
    const { Member_Id,
        Member_Firstname, 
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
        const query = `UPDATE Member SET 
            Member_Firstname = ?, 
            Member_Lastname = ?, 
            Member_Username = ?, 
            Member_Email = ?, 
            Member_Password = ?, 
            Member_Sex = ?, 
            Member_Birth_Date = ?, 
            Member_Image = ?, 
            Member_Phone = ?
            WHERE Member_Id = ?`;
        const values = [
            Member_Firstname,
            Member_Lastname,
            Member_Username,
            Member_Email,
            Member_Password,
            Member_Sex,
            formattedDate,
            Member_Image,
            Member_Phone,
            Member_Id
        ];
        const [result] = await conn.execute(query, values);
        const res = await getMemberById(Member_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
