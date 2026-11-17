import { pool } from "../db.js";
export async function getAllGrades() {
  const result = await pool.query(/*sql*/ `SELECT * FROM grades`);
  return result.rows;
}
export async function getGradesById(id) {
  const one = await pool.query(/*sql*/ `SELECT id, letter, name, description, pass FROM grades WHERE id = $1`, [id]);
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}
