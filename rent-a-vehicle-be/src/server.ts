import express, { Request, Response } from "express";
import db from "./config/database";
const app = express();
const port = 3000;

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("db connection succeeded");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("db connection failed ", err);
    process.exit(1);
  }
})();
