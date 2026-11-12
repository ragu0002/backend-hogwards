import * as coursesRepository from "../repositories/courses.repository.js";
export async function getAllCourses(req, res) {
  const allCourses = await coursesRepository.getAllCourses();
  res.json(allCourses);
}

export async function getCoursesById(req, res) {
  const id = req.params.id;
  const course = await coursesRepository.getCoursesById(id);

  if (!course) throw new HTTPError(404, "This course does not exist");
  res.status(200).json(course);
}
