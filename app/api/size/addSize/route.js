import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { getEmployeeById } from "@app/api/getAPI/employee";
import { DateFormat } from "@components/formats";

export async function POST(request) {
    const { Size_Name } = await request.json();
    try {
        const conn = await dbConnection();
        const query = `INSERT INTO Size
            (Size_Name)
            VALUES (?)`;
        const values = [
            Size_Name
        ];
        const [result] = await conn.execute(query, values);
        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
