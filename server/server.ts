import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import restaurants from "./routes/restaurants.js";

/* CONFIGURATION */
const app = express();
dotenv.config();

/* MIDDLEWARE */
app.use(express.json());
app.use(morgan("dev"));

/* ROUTES */
app.use("/api/restaurants", restaurants);

const PORT = Number(process.env["PORT"]) || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
