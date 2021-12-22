import { fileURLToPath } from "url";
import { pool } from "../index.js";

export async function createUsersTable() {
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(30) NOT NULL
    );`
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createUsersTable()
    .then(() => console.log("Created 'users' table"))
    .catch(console.error)
    .finally(() => pool.end());
}
