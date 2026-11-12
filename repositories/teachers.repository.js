import { pool } from "../db.js";

export async function getAllTeachers() {
  const result = await pool.query(/*sql*/ `SELECT teachers.id, 
                                            teachers.name, houses.name as house 
                                            from teachers 
                                            join houses 
                                            on teachers.house_id = houses.id`);
  return result.rows;
}

export async function getTeachersById(id) {
  const one = await pool.query(
    /*sql*/ `SELECT teachers.id,
                                        teachers.name, houses.name as house
                                        from teachers
                                        left join houses
                                        on teachers.house_id = houses.id
                                        WHERE teachers.id = $1`,
    [id],
  );
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

export async function createTeacher(teacher) {
  const result = await pool.query(
    /*sql*/ `INSERT into teachers (name, house_id)
                                            values ($1, $2) returning id`,
    [teacher.name, teacher.house_id],
  );
  if (result.rowCount === 0) {
    return null;
  } else {
    const newId = result.rows[0].id;
    return getTeachersById(newId);
  }
}

export async function deleteTeacher(id) {
  const del = await pool.query(
    /*sql*/ `DELETE FROM teachers
    WHERE id = $1`,
    [id],
  );
  return del.rowCount > 0;
}

export async function updateTeacher(id, teacher) {
  const upd = await pool.query(
    /*sql*/ `UPDATE teachers
                                        SET name = $1, house_id = $2
                                        WHERE id = $3 RETURNING *`,
    [teacher.name, teacher.house_id, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    const updatedId = upd.rows[0].id;
    return getTeachersById(updatedId);
  }
}
