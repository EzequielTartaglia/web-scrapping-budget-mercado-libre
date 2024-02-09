import { createPool } from "mysql2/promise";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "web-scrapping-budget-mercado-libre_db",
});

export { pool };
