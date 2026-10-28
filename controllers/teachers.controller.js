import * as teachersRepository from "../repositories/teachers.repository.js";
export async function getAllTeachers(req, res) {
  try {
    const allTeachers = await teachersRepository.getAllTeachers();
    res.json(allTeachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error", code: error.code });
  }
}
export async function getTeachersById(req, res) {
  try {
    const id = req.params.id;
    const teacher = await teachersRepository.getTeachersById(id);

    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function createTeacher(req, res) {
  try {
    const newTeacher = await teachersRepository.createTeacher(req.body);

    if (newTeacher) {
      res.status(200).json(newTeacher);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function deleteTeacher(req, res) {
  try {
    const id = req.params.id;
    const delTeacher = await teachersRepository.deleteTeacher(id);

    if (delTeacher) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
export async function updateTeacher(req, res) {
  const id = req.params.id;
  try {
    const updatedTeacher = await teachersRepository.updateTeacher(id, req.body);
    if (updatedTeacher) {
      res.status(200).json(updatedTeacher);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
