import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/carRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/mern";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.use("/api", route);
    console.log("Db concected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
