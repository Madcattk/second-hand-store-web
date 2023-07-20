import mysql from "mysql2/promise"

export default async function dbConnection() {  
    return await mysql.createConnection({
        host: "localhost",
        port: "3306",
        database: "second-hand-store",
        user: "root",
        password: "Pim12345-",
    });
}

// export default async function dbConnection() {  
//     return await mysql.createConnection({
//         host: process.env.DB_HOST || "second-hand-store-web.cwooxccimumv.ap-southeast-2.rds.amazonaws.com",
//         port: process.env.DB_PORT || "3306",
//         database: process.env.DB_DATABASE || "SecondHandStore",
//         user: process.env.DB_USER || "admin",
//         password: process.env.DB_PASSWORD || "PimNan12345",
//     });
// }