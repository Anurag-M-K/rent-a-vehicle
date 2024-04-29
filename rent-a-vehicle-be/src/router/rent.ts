import express from "express";
import { bookingVehicle, fetchAllVehicle } from "../controllers/rentController";
const router = express.Router();

router.route("/fetch-all-vehicle").get(fetchAllVehicle)

router.route("/booking").post(bookingVehicle)

export default router;
