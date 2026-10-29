import express from "express";
import * as coursesController from "../controllers/courses.controller.js";
const coursesRouter = express.Router();
//read all houses
coursesRouter.get("/", coursesController.getAllCourses);
//read a singel house
coursesRouter.get("/:id", coursesController.getCoursesById);
export default coursesRouter;
