import express from "express";
import * as housesController from "../controllers/houses.controller.js";
const housesRouter = express.Router();
//read all houses
housesRouter.get("/", housesController.getAllHouses);
//read a singel house
housesRouter.get("/:id", housesController.getHousesById);

export default housesRouter;
