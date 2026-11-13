import { pool } from "../db.js";

async function addStudentsToCourses(courses) {
  const studentsResult = await pool.query(/*sql*/ `SELECT * from students`);

  const studentCoursesResult = await pool.query(/*sql*/ `SELECT * from courses_students`);

  const students = studentsResult.rows;
  const studentCourses = studentCoursesResult.rows;

  const coursesWithStudents = courses.map((course) => {
    const courseStudentIds = studentCourses.filter((cs) => cs.fk_courses === course.id).map((cs) => cs.fk_students);

    const courseStudents = students.filter((student) => courseStudentIds.includes(student.id));

    return {
      ...course,
      students: courseStudents.map((student) => ({
        id: student.id,
        name: student.name,
      })),
    };
  });

  return coursesWithStudents;
}

export async function getAllCourses() {
  const result = await pool.query(/*sql*/ `SELECT
  courses.id,
  courses.name       AS course,
  teachers.name      AS teacher,
  course_type.name   AS type,
  course_level.name  AS level,
  schoolyear.year as year
FROM courses
JOIN teachers      ON teachers.id     = courses.fk_teachers
JOIN course_level  ON course_level.id = courses.level
JOIN course_type   ON course_type.id  = courses.type
JOIN schoolyear on schoolyear.id = courses.year;`);

  return addStudentsToCourses(result.rows);
}

export async function getCoursesById(id) {
  const result = await pool.query(/*sql*/ `SELECT
  courses.id,
  courses.name       AS course,
  teachers.name      AS teacher,
  course_type.name   AS type,
  course_level.name  AS level,
  schoolyear.year as year
FROM courses
JOIN teachers      ON teachers.id     = courses.fk_teachers
JOIN course_level  ON course_level.id = courses.level
JOIN course_type   ON course_type.id  = courses.type
JOIN schoolyear on schoolyear.id = courses.year;`);
  if (result.rowCount === 0) {
    return null;
  }

  const coursesWithStudents = await addStudentsToCourses(result.rows);

  return coursesWithStudents[0];
}
