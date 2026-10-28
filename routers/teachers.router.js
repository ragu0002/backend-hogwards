import express from "express";
import * as teachersController from "../controllers/teachers.controller.js";
const teachersRouter = express.Router();
//read all teachers
teachersRouter.get("/", teachersController.getAllTeachers);
//read a singelteachers
teachersRouter.get("/:id", teachersController.getTeachersById);
//CREATE en LÆRER
teachersRouter.post("/", teachersController.createTeacher);
//DELETE en LÆRER
teachersRouter.delete("/:id", teachersController.deleteTeacher);
//UPDATE en LÆRER
teachersRouter.put("/:id", teachersController.updateTeacher);
export default teachersRouter;
