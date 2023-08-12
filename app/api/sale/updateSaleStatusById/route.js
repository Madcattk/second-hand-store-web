import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaProductStatus, MetaSaleStatus } from "@components/Meta";

export async function PUT(request) {
    const { Sale_Status, Sale_Id, Employee_Id, Sale_Tracking_Number} = await request.json();
    try {       
        const conn = await dbConnection();
        let query;
        let result;
        let values;

        if(Sale_Status === MetaSaleStatus[5].id){
            query = `
                UPDATE Sale SET 
                Sale_Tracking_Number = ? ,
                Sale_Status = ?
                WHERE Sale_Id = ?;
            `
            values = [Sale_Tracking_Number, MetaSaleStatus[5].id, Sale_Id];
            [result] = await conn.execute(query, values);
        } else {
            query = `UPDATE Sale SET 
            Sale_Status = ?
            WHERE Sale_Id = ?;`;
            values = [Sale_Status, Sale_Id];
            [result] = await conn.execute(query, values);
        }

        if(Sale_Status === MetaSaleStatus[2].id || Sale_Status === MetaSaleStatus[3].id || Sale_Status === MetaSaleStatus[4].id){
            query = `
                UPDATE Payment SET 
                Employee_Id = ? 
                WHERE Sale_Id = ?;
            `
            values = [Employee_Id, Sale_Id];
            [result] = await conn.execute(query, values);
        }
        if(Sale_Status === MetaSaleStatus[4].id){
            query = `
                UPDATE Product SET 
                Product_Status = ? ,
                Sale_Id = NULL
                WHERE Sale_Id = ?;
            `
            values = [MetaProductStatus[0].id, Sale_Id];
            [result] = await conn.execute(query, values);
        }

        conn.end();
        return NextResponse.json({ data: result, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
