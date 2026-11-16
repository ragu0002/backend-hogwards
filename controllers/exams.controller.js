import * as examesRepository from "../repositories/exams.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";
import CreateExamDto from "../dtos/createexam.dto.js";
import UpdateExamDto from "../dtos/updateexam.dto.js";

export async function getAllExams(req, res) {
  const allExams = await examesRepository.getAllExams();
  res.json(allExams);
}

export async function getExamsById(req, res) {
  const id = req.params.id;
  const exam = await examesRepository.getExamsById(id);
  if (!exam) throw new HTTPError(404, "This exam does not exist");
  res.status(200).json(exam);
}

export async function getExamsByStudent(req, res) {
  const id = req.params.id;
  const exam = await examesRepository.getExamsByStudent(id);
  if (!exam) throw new HTTPError(404, "This student does not exist");
  res.status(200).json(exam);
}

export async function getExamsByCourse(req, res) {
  const id = req.params.id;
  const exam = await examesRepository.getExamsByCourse(id);
  if (!exam) throw new HTTPError(404, "This course does not exist");
  res.status(200).json(exam);
}

export async function createExam(req, res) {
  const data = req.body;
  const exam = CreateExamDto.parse(data);
  const newExam = await examesRepository.createExam(exam);

  res.status(200).json(newExam);
}
export async function deleteExam(req, res) {
  const id = req.params.id;
  const findExam = await examesRepository.getExamsById(id);
  if (!findExam) throw new HTTPError(404, "This exam does not exist");

  const delExam = await examesRepository.deleteExam(id);
  if (delExam) {
    res.sendStatus(200);
  }
}
export async function updateExam(req, res) {
  const id = req.params.id;
  const data = req.body;

  const oldExam = await examesRepository.getExamsById(id);
  if (!oldExam) throw new HTTPError(404, "This exam does not exist");
  const newExamData = UpdateExamDto.parse(data);

  const updatedExam = await examesRepository.updateExam(id, newExamData);

  res.status(200).json(updatedExam);
}
