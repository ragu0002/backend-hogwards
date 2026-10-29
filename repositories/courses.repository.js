import { pool } from "../db.js";

async function addStudentsToCourses(courses) {
  const studentsResult = await pool.query("SELECT * FROM students");

  const studentCoursesResult = await pool.query("SELECT * FROM courses_students");

  const students = studentsResult.rows;
  const studentCourses = studentCoursesResult.rows;

  const coursesWithStudents = courses.map((course) => {
    const courseStudentIds = studentCourses.filter((cs) => cs.fk_courses === course.id).map((cs) => cs.fk_students);

    const courseStudents = students.filter((student) => courseStudentIds.includes(student.id));

    return {
      ...course,
      students: courseStudents.map((student) => ({
        name: student.name,
      })),
    };
  });

  return coursesWithStudents;
}

export async function getAllCourses() {
  const result = await pool.query(`SELECT courses.id, courses.name, teachers.name AS teacher FROM courses JOIN teachers ON courses.fk_teachers = teachers.id`);

  return addStudentsToCourses(result.rows);
}

export async function getCoursesById(id) {
  const result = await pool.query(`SELECT courses.id, courses.name, teachers.name AS teacher FROM courses JOIN teachers ON courses.fk_teachers = teachers.id WHERE courses.id = $1`, [id]);

  if (result.rowCount === 0) {
    return null;
  }

  const coursesWithStudents = await addStudentsToCourses(result.rows);

  return coursesWithStudents[0];
}
