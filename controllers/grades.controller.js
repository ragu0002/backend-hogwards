import * as gradesRepository from "../repositories/grades.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";
export async function getAllGrades(req, res) {
  const allGrades = await gradesRepository.getAllGrades();
  res.json(allGrades);
}

export async function getGradesById(req, res) {
  const id = req.params.id;
  const grade = await gradesRepository.getGradesById(id);
  if (!grade) throw new HTTPError(404, "This grade does not exist");
  res.status(200).json(grade);
}
