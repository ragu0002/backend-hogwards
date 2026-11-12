import * as teachersRepository from "../repositories/teachers.repository.js";
import UpdateTeacherDto from "../dtos/updateteacher.dto.js";
import HTTPError from "../errorhandling/HTTPError.js";
import CreateTeacherDto from "../dtos/createteacher.dto.js";

export async function getAllTeachers(req, res) {
  const allTeachers = await teachersRepository.getAllTeachers();
  res.json(allTeachers);
}
export async function getTeachersById(req, res) {
  const id = req.params.id;
  const teacher = await teachersRepository.getTeachersById(id);

  if (!teacher) throw new HTTPError(404, "This teacher does not exist");

  res.status(200).json(teacher);
}
export async function createTeacher(req, res) {
  const data = req.body;
  const teacher = CreateTeacherDto.parse(data);

  const newTeacher = await teachersRepository.createTeacher(teacher);

  res.status(200).json(newTeacher);
}
export async function deleteTeacher(req, res) {
  const id = req.params.id;
  const findTeacher = await teachersRepository.getTeachersById(id);
  if (!findTeacher) throw new HTTPError(404, "This teacher does not exist");

  const delTeacher = await teachersRepository.deleteTeacher(id);
  if (delTeacher) {
    res.sendStatus(200);
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
