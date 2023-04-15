import express from "express";
import dotenv from "dotenv";

/* CONFIGURATION */
dotenv.config();

const app = express();
const PORT = Number(process.env["PORT"]) || 3001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
