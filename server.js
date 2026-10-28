//const express = require("express");
import express from "express";
//const pool = require("./db");
import { pool } from "./db.js";
const app = express();
const port = 3000;

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
app.put("/teachers/:id", async (req, res) => {
  const { name, house } = req.body;
  try {
    const upd = await pool.query("UPDATE teachers SET name = $1, house = $2 WHERE id = $3 RETURNING id, name, house", [name, house, req.params.id]);
    if (upd.rowCount === 0) return res.sendStatus(404);

    res.status(200).json(upd.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

//STUDENTS
//READ ALLE STUDENTS
app.get("/students", async (req, res) => {
  try {
    const result = await pool.query("Select * from students");
    console.log(result.rows);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error", code: error.code });
  }
});

//READ en STUDENT
app.get("/students/:id", async (req, res) => {
  try {
    const one = await pool.query("SELECT id, name, house, year FROM students WHERE id = $1", [req.params.id]);
    if (one.rowCount === 0) return res.sendStatus(404);

    res.status(200).json(one.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

//CREATE en LÆRER
app.post("/students", async (req, res) => {
  const { name, house, year } = req.body;
  try {
    const result = await pool.query("INSERT into students (name, house, year) values ($1, $2, $3) returning id, name, house, year", [name, house, year]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
//DELETE en STUDENTS
app.delete("/students/:id", async (req, res) => {
  try {
    const del = await pool.query("DELETE FROM students WHERE id = $1", [req.params.id]);
    if (del.rowCount === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
//UPDATE en STUDENTS
app.put("/students/:id", async (req, res) => {
  const { name, house, year } = req.body;
  try {
    const upd = await pool.query("UPDATE students SET name = $1, house = $2, year = $3 WHERE id = $4 RETURNING id, name, house, year", [name, house, year, req.params.id]);
    if (upd.rowCount === 0) return res.sendStatus(404);

    res.status(200).json(upd.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
