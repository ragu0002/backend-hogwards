import express from "express";

const app = express();
const port = 3000;

import housesRouter from "./routers/houses.router.js";
import teachersRouter from "./routers/teachers.router.js";
import studentsRouter from "./routers/students.router.js";
import coursesRouter from "./routers/courses.router.js";
import examsRouter from "./routers/exams.router.js";
import errorhandler from "./errorhandling/errorhandler.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies
//HOUSES

app.use("/houses/", housesRouter);

//TEACHERS

app.use("/teachers/", teachersRouter);
//STUDENTS

app.use("/students/", studentsRouter);
//COURSES

app.use("/courses/", coursesRouter);

//EXAMS
app.use("/exams/", examsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(errorhandler);
