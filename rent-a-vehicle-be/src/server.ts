import express, { Request, Response } from "express";
import db from "./config/database";
const app = express();
const port = 3000;
import rendingRutes from "./router/rent";
import cors from "cors";

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("db connection succeeded");
    app.use("/api/rent", rendingRutes);
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("db connection failed ", err);
    process.exit(1);
  }
})();
