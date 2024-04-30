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

// export const bookingVehicle = asyncHandler(
//   async (req: Request, res: Response) => {
//     try {
//       console.log("req.body", req.body);
//       const {
//         vehicle_id,
//         first_name,
//         last_name,
//         phone,
//         number_of_wheels,
//         type,
//         vehicle,
//         start_date,
//         end_date,
//       } = req.body;

//       if (
//         !first_name ||
//         !last_name ||
//         !phone ||
//         !number_of_wheels ||
//         !type ||
//         !vehicle ||
//         !start_date ||
//         !end_date
//       ) {
//         res.status(401).json({ message: "Please check your input fields!" });
//       }

//       const [result] = await connection.execute(
//         "INSERT INTO bookings (vehicle_id,first_name,last_name,phone,number_of_wheels,type,vehicle,start_date,end_date) VALUES (?,?,?,?,?,?,?,?,?)",
//         [
//           vehicle_id,
//           first_name,
//           last_name,
//           phone,
//           number_of_wheels,
//           type,
//           vehicle,
//           start_date,
//           end_date,
//         ]
//       );

//       res.status(201).json({ message: "Booking successful" });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   }
// );

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
      const query = `SELECT * FROM vehicles WHERE vehicle_model_type = '${type}' AND is_available = 1 `;
      const vehicles = await connection.query(query);
      res.status(200).json(vehicles.shift());
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export const bookVehicle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { first_name, last_name, number_of_wheels, type, vehicle } =
        req.body;

      const req_body_start_date = new Date(req.body.startDate);
      const startDate = req_body_start_date.toISOString().split("T")[0];
      const req_body_end_date = new Date(req.body.endDate);
      const endDate = req_body_end_date.toISOString().split("T")[0];

      // Check if the vehicle is available
      const availableVehicle: any = await connection.query(
        `SELECT * FROM vehicles WHERE id = ? AND is_available = 1`,
        [vehicle]
      );
      availableVehicle.pop();

      const availability = availableVehicle.flat();
      console.log("availableVehicle",availability)
      if (availability[0]?.is_available === 1) {
        // Assuming there's a booking table, insert the booking details
        const result = await connection.query(
          `INSERT INTO bookings (first_name, last_name, number_of_wheels, type, vehicle_id, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            first_name,
            last_name,
            number_of_wheels,
            type,
            vehicle,
            startDate,
            endDate,
          ]
        );

        // Update the vehicle's availability status
        await connection.query(
          `UPDATE vehicles SET is_available = 0 WHERE id = ?`,
          [vehicle]
        );

        res.status(200).json({ message: "Booking successful" });
      } else {
        res.status(404).json({ message: "Vehicle is not available" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
    return;
  }
);
