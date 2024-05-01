import express from "express";
import {  fetchAllVehicle, fetchVehicleByNumberOfWheels,fetchVehicleByModelType, bookVehicle } from "../controllers/rentController";
const router = express.Router();

router.route("/fetch-all-vehicle").get(fetchAllVehicle)

router.route("/fetch-vehicle-by-number-of-wheels/:number_of_wheels").get(fetchVehicleByNumberOfWheels)

router.route("/fetch-vehicle-by-model-type/:type/:number_of_wheels").get(fetchVehicleByModelType)

router.route("/book-a-vehicle").post(bookVehicle)

export default router;
