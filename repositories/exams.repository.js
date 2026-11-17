import { pool } from "../db.js";

async function addGradesToExam(exams) {
  const gradesData = await pool.query(/*sql*/ `SELECT * FROM grades`);
  const allGrades = gradesData.rows;

  return exams.map(({ grade_id, ...exam }) => {
    const grade = allGrades.find((grade) => grade.id === grade_id);

    return {
      ...exam,
      grade: grade
        ? {
            id: grade.id,
            letter: grade.letter,
            name: grade.name,
            description: grade.description,
            pass: grade.pass,
          }
        : null,
    };
  });
}

export async function getAllExams() {
  const result = await pool.query(/*sql*/ `SELECT e.id,
                                            c.name AS course,
                                            s.name AS student,
                                            e.grade AS grade_id
                                            FROM exams e
                                            JOIN courses  c ON e.course  = c.id
                                            JOIN students s ON e.student = s.id
                                            ORDER BY e.id;
  `);
  return addGradesToExam(result.rows);
}
export async function getExamsById(id) {
  const one = await pool.query(
    /*sql*/ `SELECT c.name  AS course, s.name  AS student, g.letter AS grade
                                            FROM exams e
                                            LEFT JOIN courses  c ON e.course  = c.id
                                            LEFT JOIN students s ON e.student = s.id
                                            LEFT JOIN grades   g ON e.grade   = g.id
                                            WHERE e.id = $1;`,
    [id],
  );
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows[0];
  }
}

export async function getExamsByStudent(id) {
  const one = await pool.query(
    /*sql*/ `SELECT c.name  AS course, s.name  AS student, g.letter AS grade
                                            FROM exams e
                                            LEFT JOIN courses  c ON e.course  = c.id
                                            LEFT JOIN students s ON e.student = s.id
                                            LEFT JOIN grades   g ON e.grade   = g.id
                                            WHERE s.id = $1;`,
    [id],
  );
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows;
  }
}

export async function getExamsByCourse(id) {
  const one = await pool.query(
    /*sql*/ `SELECT c.name  AS course, s.name  AS student, g.letter AS grade
                                            FROM exams e
                                            LEFT JOIN courses  c ON e.course  = c.id
                                            LEFT JOIN students s ON e.student = s.id
                                            LEFT JOIN grades   g ON e.grade   = g.id
                                            WHERE c.id = $1;`,
    [id],
  );
  if (one.rowCount === 0) {
    return null;
  } else {
    return one.rows;
  }
}

export async function createExam(exam) {
  const result = await pool.query(
    /*sql*/ `INSERT into exams (course, student, grade)
                                            values ($1, $2, $3) returning id`,
    [exam.course, exam.student, exam.grade],
  );
  if (result.rowCount === 0) {
    return null;
  } else {
    const newId = result.rows[0].id;
    return getExamsById(newId);
  }
}

export async function deleteExam(id) {
  const del = await pool.query(
    /*sql*/ `DELETE FROM exams
    WHERE id = $1`,
    [id],
  );
  return del.rowCount > 0;
}

export async function updateExam(id, exam) {
  const upd = await pool.query(
    /*sql*/ `UPDATE exams 
                                        SET course = $1, student = $2, grade = $3
                                        WHERE id = $4 RETURNING *`,
    [exam.course, exam.student, exam.grade, id],
  );
  if (upd.rowCount === 0) {
    return null;
  } else {
    const updatedId = upd.rows[0].id;
    return getExamsById(updatedId);
  }
}
