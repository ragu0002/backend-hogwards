import express from "express";
import * as studentsController from "../controllers/students.controller.js";
const studentsRouter = express.Router();
//read all STUDENTS
studentsRouter.get("/", studentsController.getAllStudents);
//read a singelSTUDENTS
studentsRouter.get("/:id", studentsController.getStudentsById);
//CREATE en STUDENT
studentsRouter.post("/", studentsController.createStudent);
//DELETE en STUDENT
studentsRouter.delete("/:id", studentsController.deleteStudent);
//UPDATE en STUDENT
studentsRouter.put("/:id", studentsController.updateStudent);
export default studentsRouter;
