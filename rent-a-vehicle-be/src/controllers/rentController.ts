import { Request, Response } from "express";
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

export const bookingVehicle = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      console.log("req.body", req.body);
      const {
        vehicle_id,
        first_name,
        last_name,
        phone,
        number_of_wheels,
        type,
        vehicle,
        start_date,
        end_date,
      } = req.body;

      if (
        !first_name ||
        !last_name ||
        !phone ||
        !number_of_wheels ||
        !type ||
        !vehicle ||
        !start_date ||
        !end_date
      ) {
        throw new Error("Missing required fields in request body");
      }

      const [result] = await connection.execute(
        "INSERT INTO bookings (vehicle_id,first_name,last_name,phone,number_of_wheels,type,vehicle,start_date,end_date) VALUES (?,?,?,?,?,?,?,?,?)",
        [
          vehicle_id,
          first_name,
          last_name,
          phone,
          number_of_wheels,
          type,
          vehicle,
          start_date,
          end_date,
        ]
      );
      console.log("result: " + JSON.stringify(result));

      res.status(201).json({ message: "Booking successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
