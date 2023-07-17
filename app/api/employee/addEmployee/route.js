import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getEmployeeById } from "@app/api/getAPI/employee";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Employee_Firstname, 
        Employee_Lastname, 
        Employee_Email, 
        Employee_Password, 
        Employee_Sex, 
        Employee_Birth_Date, 
        Employee_Image,
        Employee_Phone } = await request.json();

        const formattedDate = DateFormat(Employee_Birth_Date)
    try {       
        const conn = await dbConnection();
        const [existingEmployee] = await conn.execute('SELECT * FROM Employee WHERE Employee_Email = ?', [Employee_Email]);

        if (existingEmployee.length > 0) {
            conn.end();
            return NextResponse.json({ message: "duplicated" }, { status: 201 });
        }
        const query = `INSERT INTO Employee 
            (Employee_Firstname, 
            Employee_Lastname,  
            Employee_Email, 
            Employee_Password, 
            Employee_Sex, 
            Employee_Birth_Date, 
            Employee_Image, Employee_Phone)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            Employee_Firstname,
            Employee_Lastname,
            Employee_Email,
            Employee_Password,
            Employee_Sex,
            formattedDate,
            Employee_Image,
            Employee_Phone
        ];
        const [result] = await conn.execute(query, values);
        const res = await getEmployeeById(result?.insertId || null);
        conn.end();
        return NextResponse.json({ data: res?.data?.[0], message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
