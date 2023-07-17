import mysql from "mysql2/promise"

export default async function dbConnection() {  
    return await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        database: process.env.DB_DATABASE || "second_hand_store",
        user: process.env.DB_USER || "root",
        // password: process.env.DB_PASSWORD || "your-password",
    });
}