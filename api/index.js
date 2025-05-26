const express = require("express");
const dotenv = require("dotenv");
const jobRoutes = require("./jobs"); // make sure it's in the same /api folder
const serverless = require("serverless-http");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("API server is starting...");
app.use("/api/jobs", jobRoutes);

module.exports = serverless(app); // ✅ This is required by Vercel
