import { pool } from "../db.js";

export async function getAllTeachers() {
  const result = await pool.query(/*sql*/ `SELECT teachers.id, 
                                            teachers.name, teachers.employment_start, teachers.currently_active, teachers.deceased, houses.name as house 
                                            from teachers 
                                            left join houses 
                                            on teachers.house_id = houses.id`);
  return result.rows;
}

export async function getTeachersById(id) {
  const one = await pool.query(
    /*sql*/ `SELECT teachers.id,
                                        teachers.name, teachers.employment_start, teachers.currently_active, teachers.deceased, houses.name as house 
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
    /*sql*/ `INSERT into teachers (name, house_id, employment_start, currently_active, deceased)
                                            values ($1, $2, $3, $4, $5) returning id`,
    [teacher.name, teacher.house_id, teacher.employment_start, teacher.currently_active, teacher.deceased],
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
                                        SET name = $1, house_id = $2, employment_start = $3, currently_active = $4, deceased = $5
                                        WHERE id = $6 RETURNING *`,
    [teacher.name, teacher.house_id, teacher.employment_start, teacher.currently_active, teacher.deceased, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    const updatedId = upd.rows[0].id;
    return getTeachersById(updatedId);
  }
}
