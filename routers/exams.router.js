import express from "express";
import * as examsController from "../controllers/exams.controller.js";
const examsRouter = express.Router();
//read all exams
examsRouter.get("/", examsController.getAllExams);
//read a singel exam
examsRouter.get("/:id", examsController.getExamsById);
//read all the exams for one sudent
examsRouter.get("/students/:id", examsController.getExamsByStudent);
//read all the exams for one course
examsRouter.get("/courses/:id", examsController.getExamsByCourse);
//Create exam
examsRouter.post("/", examsController.createExam);
//DELETE en exam
examsRouter.delete("/:id", examsController.deleteExam);
//UPDATE en exam
examsRouter.put("/:id", examsController.updateExam);

export default examsRouter;
