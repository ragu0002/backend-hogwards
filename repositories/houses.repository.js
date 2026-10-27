import { pool } from "../db.js";
export async function getAllHouses() {
  const result = await pool.query("Select * from houses");
  return result.rows;
}
