import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query(/*sql*/ `SELECT students.id, 
                                            students.name, houses.name as house 
                                            from students 
                                            join houses 
                                            on students.house_id = houses.id`);
  return result.rows;
}

export async function getStudentsById(id) {
  const one = await pool.query(
    /*sql*/ `SELECT students.id, 
                                            students.name, houses.name as house 
                                            from students 
                                            join houses 
                                            on students.house_id = houses.id 
                                            WHERE students.id = $1`,
    [id],
  );
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

export async function createStudent(student) {
  const result = await pool.query(
    /*sql*/ `INSERT into students (name, year, house_id)
                                            values ($1, $2, $3) returning id`,
    [student.name, student.year, student.house_id],
  );
  if (result.rowCount === 0) {
    return null;
  } else {
    const newId = result.rows[0].id;
    return getStudentsById(newId);
  }
}

export async function deleteStudent(id) {
  const del = await pool.query(
    /*sql*/ `DELETE FROM students
    WHERE id = $1`,
    [id],
  );
  return del.rowCount > 0;
}

export async function updateStudent(id, student) {
  const upd = await pool.query(/*sql*/ `UPDATE students SET name = $1, year = $2, house_id = $3 WHERE id = $4 RETURNING *`, [student.name, student.year, student.house_id, id]);
  if (upd.rowCount === 0) {
    return null;
  } else {
    const updatedId = upd.rows[0].id;
    return getStudentsById(updatedId);
  }
}
