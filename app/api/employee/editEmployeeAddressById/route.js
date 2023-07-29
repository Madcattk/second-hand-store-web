import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getEmployeeAddressesById } from "@app/api/getAPI/employee";

export async function PUT(request) {
    const { Employee_Id, Employee_Address, New_Employee_Address } = await request.json();
    try {       
        const conn = await dbConnection();
        const query = `UPDATE Employee_Address SET 
        Employee_Address = ? WHERE Employee_Id = ? AND Employee_Address = ?`;
        const values = [New_Employee_Address, Employee_Id, Employee_Address];
        const [result] = await conn.execute(query, values);
        const res = await getEmployeeAddressesById(Employee_Id || null);
        conn.end();
        return NextResponse.json({ data: res?.data, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
