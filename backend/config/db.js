import mysql from "mysql2/promise";

import "dotenv/config";

let db;
try {
  db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await db.getConnection();
  console.log("database connexion", process.env.DB_NAME);
} catch (error) {
  console.error(
    "erreurs lors de la connexion de la base de donnée ",
    error.message,
  );
  process.exit(1);
}

export { db };
