import { pool } from "../db.js";

export async function getAllStudents() {
  const result = await pool.query(/*sql*/ `SELECT students.id, 
                                            students.name, houses.name as house, students.birthday, schoolyear.year as schoolyear
                                            from students 
                                            left join houses 
                                            on students.house_id = houses.id
                                            left join schoolyear
                                            on students.school_year = schoolyear.id`);
  return result.rows;
}

export async function getStudentsById(id) {
  const one = await pool.query(
    /*sql*/ `SELECT students.id, 
                                            students.name, houses.name as house, students.birthday, schoolyear.year as schoolyear
                                            from students 
                                            left join houses 
                                            on students.house_id = houses.id
                                            left join schoolyear
                                            on students.school_year = schoolyear.id
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
    /*sql*/ `INSERT into students (name, house_id, birthday, school_year)
                                            values ($1, $2, $3, $4) returning id`,
    [student.name, student.house_id, student.birthday, student.school_year],
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
  const upd = await pool.query(
    /*sql*/ `UPDATE students 
                                        SET name = $1, house_id = $2, birthday = $3, school_year = $4
                                        WHERE id = $5 RETURNING *`,
    [student.name, student.house_id, student.birthday, student.school_year, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    const updatedId = upd.rows[0].id;
    return getStudentsById(updatedId);
  }
}
