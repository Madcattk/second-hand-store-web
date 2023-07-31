import { NextResponse } from "next/server";
import dbConnection from "@/lib/db";
import { MetaProductStatus, MetaSaleStatus } from "@components/Meta";
import { DateFormat } from "@components/formats";

export async function PUT(request) {
    try {       
        const conn = await dbConnection();
        const updateQuery = `UPDATE Sale SET 
            Sale_Status = ?
            WHERE DATEDIFF(NOW(), Sale_Date) > 3 AND Sale_Status = '${MetaSaleStatus[0].id}';`;

        const values = [MetaSaleStatus[4].id];
        const [updateResult] = await conn.execute(updateQuery, values);

        const selectQuery = `SELECT Sale_Id FROM Sale
            WHERE Sale_Status = ? AND DATEDIFF(NOW(), Sale_Date) > 3;`;

        const [selectResult] = await conn.execute(selectQuery, [MetaSaleStatus[4].id]);
        const updatedSaleIds = selectResult.map((row) => row.Sale_Id);

        const updateProductStatus = `UPDATE Product SET 
            Product_Status = ?,
            Sale_Id = NULL
            WHERE Sale_Id IN (${updatedSaleIds.join(",")})`;
        const [productResult] = await conn.execute(updateProductStatus, [MetaProductStatus[0].id]);
        conn.end();
        return NextResponse.json({ data: updatedSaleIds, message: "success" }, { status: 201 });
    } catch (error) {        
        return NextResponse.json({ error, message: "error" }, { status: 500 });
    }
}
