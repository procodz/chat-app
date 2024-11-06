// const express = require("express");
// const dotenv = require("dotenv");
// const app = express();
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js"
import connectDB from "./db/connnection.js";
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on ${PORT}`)
}
    
);