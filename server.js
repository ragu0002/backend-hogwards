//const express = require("express");
import express from "express";
//const pool = require("./db");
import { pool } from "./db.js";
const app = express();
const port = 3000;
import * as StudentsController from "./controllers/students.controller.js";
import * as housesRepository from "./repositories/houses.repository.js";
import * as teachersController from "./controllers/teachers.controller.js";
import * as housesController from "./controllers/houses.controller.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse JSON bodies
//HOUSES
//READ ALLE HUSENE
app.get("/houses", housesController.getAllHouses);
//READ ETT HUS
app.get("/houses/:id", housesController.getHousesById);

//TEACHERS
//READ ALLE LÆRERNE
app.get("/teachers", teachersController.getAllTeachers);

//READ en LÆRER
app.get("/teachers/:id", teachersController.getTeachersById);

//CREATE en LÆRER
app.post("/teachers", teachersController.createTeacher);
//DELETE en LÆRER
app.delete("/teachers/:id", teachersController.deleteTeacher);
//UPDATE en LÆRER
app.put("/teachers/:id", teachersController.updateTeacher);

//STUDENTS
//READ ALLE STUDENTS

//Stundents
//READ ALLEStundents
app.get("/students", StudentsController.getAllStudents);

//READ Stundents
app.get("/students/:id", StudentsController.getStudentsById);

//CREATE Stundents
app.post("/students", StudentsController.createStudent);
//DELETE Stundents
app.delete("/students/:id", StudentsController.deleteStudent);
//UPDATE Stundents
app.put("/students/:id", StudentsController.updateStudent);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
