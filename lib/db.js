import mysql from "mysql2/promise"

export default async function dbConnection() {  
    return await mysql.createConnection({
        host: "localhost",
        port: "3306",
        database: "second_hand_store",
        user: "root",
    });
}