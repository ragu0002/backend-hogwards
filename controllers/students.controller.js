import CreateStudentDto from "../dtos/createstudent.dto.js";
import UpdateStudentDto from "../dtos/updatestudent.dto.js";
import HTTPError from "../errorhandling/HTTPError.js";
import * as studentsRepository from "../repositories/students.repository.js";
export async function getAllStudents(req, res) {
  const allStudents = await studentsRepository.getAllStudents();
  res.json(allStudents);
}
export async function getStudentsById(req, res) {
  const id = req.params.id;
  const student = await studentsRepository.getStudentsById(id);
  if (!student) throw new HTTPError(404, "This student does not exist.");

  res.status(200).json(student);
}
export async function createStudent(req, res) {
  const data = req.body;
  const student = CreateStudentDto.parse(data);
  const newStudent = await studentsRepository.createStudent(student);

  res.status(200).json(newStudent);
}
export async function deleteStudent(req, res) {
  const id = req.params.id;
  const findStudent = await studentsRepository.getStudentsById(id);
  if (!findStudent) throw new HTTPError(404, "This student does not exist");

  const delStudent = await studentsRepository.deleteStudent(id);
  if (delStudent) {
    res.sendStatus(200);
  }
}
export async function updateStudent(req, res) {
  const id = req.params.id;
  const data = req.body;

  const oldStudent = await studentsRepository.getStudentsById(id);
  if (!oldStudent) throw new HTTPError(404, "This student does not exist");
  const newStudentData = UpdateStudentDto.parse(data);

  const updatedStudent = await studentsRepository.updateStudent(id, newStudentData);

  res.status(200).json(updatedStudent);
}
