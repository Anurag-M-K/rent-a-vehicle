import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import connection from "../config/database";

export const fetchAllVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const [rows, fields] = await connection.execute("SELECT * FROM vehicles");
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const fetchVehicleByNumberOfWheels = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { number_of_wheels } = req.params;
      const vehicle_type = number_of_wheels == "2" ? "bike_types" : "car_types";
      const query = `SELECT * FROM ${vehicle_type}`;
      const vehicles = await connection.query(query);

      res.status(200).json(vehicles.shift());
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const fetchVehicleByModelType = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { type } = req.params;
      const query = `SELECT * FROM vehicles WHERE vehicle_model_type = '${type}'`;
      const vehicles = await connection.query(query);
      res.status(200).json(vehicles.shift());
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);



export const bookVehicle = async (req:any, res:any) => {
  try {
    const { first_name, last_name, number_of_wheels, type, vehicle,vehicleType } = req.body;
    const startDate = new Date(req.body.startDate).toISOString().split("T")[0];
    const endDate = new Date(req.body.endDate).toISOString().split("T")[0];

    // Check if the vehicle is available for the requested dates
    const [existingBookings]:any = await connection.execute(
      `SELECT * FROM bookings WHERE vehicle_id = ? AND ((start_date <= ? AND end_date >= ?) OR (start_date <= ? AND end_date >= ?))`,
      [vehicle, startDate, startDate, endDate, endDate]
    );

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: "Vehicle not available for the requested dates" });
    }


    // Insert the booking details
    const result = await connection.query(
                `INSERT INTO bookings (first_name, last_name, number_of_wheels, type, vehicle_id, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  first_name,
                  last_name,
                  number_of_wheels,
                  vehicleType,
                  vehicle,
                  startDate,
                  endDate,
                ]
              );

    // Update the vehicle's availability status  need to change logic here later
    // await connection.execute(`UPDATE vehicles SET is_available = 0 WHERE id = ?`, [vehicle]);

    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error(`DB operation failed - ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};