//const express = require("express");
import express from "express";
//const pool = require("./db");
import { pool } from "./db.js";
const app = express();
const port = 3000;

import housesRouter from "./routers/houses.router.js";
import teachersRouter from "./routers/teachers.router.js";
import studentsRouter from "./routers/students.router.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies
//HOUSES

app.use("/houses/", housesRouter);

//TEACHERS

app.use("/teachers/", teachersRouter);
//STUDENTS

app.use("/students/", studentsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
