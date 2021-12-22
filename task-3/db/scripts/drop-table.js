import { fileURLToPath } from "url";
import { pool } from "../index.js";

export async function dropUsersTable() {
  await pool.query("DROP TABLE IF EXISTS users;");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  dropUsersTable()
    .then(() => console.log("Dropped 'users' table"))
    .catch(console.error)
    .finally(() => pool.end());
}
