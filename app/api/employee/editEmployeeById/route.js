import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getEmployeeById } from "@app/api/getAPI/employee";
import { DateFormat } from "@components/formats";

export async function PUT(request) {
    const { Employee_Id,
        Employee_Firstname, 
        Employee_Lastname, 
        Employee_Email, 
        Employee_Password, 
        Employee_Sex, 
        Employee_Birth_Date, 
        Employee_Image,
        Employee_Phone } = await request.json();
        
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Employee SET 
            Employee_Firstname = ?, 
            Employee_Lastname = ?, 
            Employee_Email = ?, 
            Employee_Password = ?, 
            Employee_Sex = ?, 
            Employee_Birth_Date = ?, 
            Employee_Image = ?, 
            Employee_Phone = ?
            WHERE Employee_Id = ?`;
        const values = [
            Employee_Firstname,
            Employee_Lastname,
            Employee_Email,
            Employee_Password,
            Employee_Sex,
            Employee_Birth_Date,
            Employee_Image,
            Employee_Phone,
            Employee_Id
        ];
        const [result] = await conn.execute(query, values);
        const res = await getEmployeeById(Employee_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
