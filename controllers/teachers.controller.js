import * as teachersRepository from "../repositories/teachers.repository.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";
import HTTPError from "../errorhandling/HTTPError.js";
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
  const newTeacherData = req.body;
  try {
    const newTeacher = await teachersRepository.createTeacher(newTeacherData);

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
  const teacherData = req.body;

  const oldTeacher = await teachersRepository.getTeachersById(id);
  if (!oldTeacher) throw new HTTPError(404, "This teacher does not exist");

  const newTeacherData = UpdateTeacherDto.parse(teacherData);
  const updatedTeacher = await teachersRepository.updateTeacher(id, newTeacherData);

  res.status(200).json(updatedTeacher);
}
