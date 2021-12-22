import { fileURLToPath } from "url";
import { pool } from "../index.js";
import { seedData } from "../seed-data.js";

export async function seedUsersTable() {
  /**
   * Should be injection-resistant as we're just dynamically generating N placeholders (where N is how many items we're seeding).
   *
   * (Plus, we control the seed data. It hasn't come from the user/some third party/someone we can't trust/control.)
   */
  const safePlaceholders = seedData.map((_, i) => `($${i + 1})`).join(",\n");
  const values = seedData.map((user) => user.username);

  await pool.query(
    `INSERT INTO users (username) VALUES ${safePlaceholders};`,
    values
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedUsersTable()
    .then(() => console.log("Seeded 'users' table"))
    .catch(console.error)
    .finally(() => pool.end());
}
