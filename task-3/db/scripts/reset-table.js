import { fileURLToPath } from "url";
import { pool } from "../index.js";
import { createUsersTable } from "./create-table.js";
import { dropUsersTable } from "./drop-table.js";
import { seedUsersTable } from "./seed-table.js";

export async function resetUsersTable() {
  await dropUsersTable();
  await createUsersTable();
  await seedUsersTable();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  resetUsersTable()
    .then(() => console.log("Dropped, re-created and re-seeded 'users' table"))
    .catch(console.error)
    .finally(() => pool.end());
}
