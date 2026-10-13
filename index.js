// import express from "express";
import connectDB from "./config/db.js";
// const app = express();
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
