import express from "express";
import * as gradesController from "../controllers/grades.controller.js";
const gradesRouter = express.Router();
//read all grades
gradesRouter.get("/", gradesController.getAllGrades);
//read a singel grade
gradesRouter.get("/:id", gradesController.getGradesById);

export default gradesRouter;
