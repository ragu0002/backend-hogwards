import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query("Select * from students");
  return result.rows;
}

export async function getStudentsById(id) {
  const one = await pool.query("SELECT id, name, house FROM students WHERE id = $1", [id]);
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

export async function createStudent({ name, house, year }) {
  const result = await pool.query("INSERT into students (name, house, year) values ($1, $2, $3) returning id, name, house, year", [name, house, year]);
  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}

export async function deleteStudent(id) {
  const del = await pool.query("DELETE FROM students WHERE id = $1", [id]);
  return del.rowCount > 0;
}

export async function updateStudent(id, { name, house, year }) {
  const upd = await pool.query("UPDATE students SET name = $1, house = $2, year = $3 WHERE id = $4 RETURNING id, name, house, year", [name, house, year, id]);
  if (upd.rowCount === 0) {
    return null;
  } else {
    return upd.rows[0];
  }
}
