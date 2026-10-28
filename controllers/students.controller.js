import * as studentsRepository from "../repositories/students.repository.js";
export async function getAllStudents(req, res) {
  try {
    const allStudents = await studentsRepository.getAllStudents();
    res.json(allStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
export async function getStudentsById(req, res) {
  try {
    const id = req.params.id;
    const student = await studentsRepository.getStudentsById(id);

    if (student) {
      res.status(200).json(student);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function createStudent(req, res) {
  try {
    const newStudent = await studentsRepository.createStudent(req.body);

    if (newStudent) {
      res.status(200).json(newStudent);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function deleteStudent(req, res) {
  try {
    const id = req.params.id;
    const delStudent = await studentsRepository.deleteStudent(id);

    if (delStudent) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function updateStudent(req, res) {
  const id = req.params.id;
  try {
    const updatedStudent = await studentsRepository.updateStudent(id, req.body);
    if (updatedStudent) {
      res.status(200).json(updatedStudent);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
