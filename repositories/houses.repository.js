import { pool } from "../db.js";
export async function getAllHouses() {
  const result = await pool.query("Select * from houses");
  return result.rows;
}
export async function getHousesById(id) {
  const one = await pool.query("SELECT id, name, color, founder FROM houses WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}
