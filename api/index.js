const express = require("express");
const dotenv = require("dotenv");
const jobRoutes = require("./jobs"); // ✅ CORRECT PATH
const serverless = require("serverless-http");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("API server is starting...");

app.use("/api/jobs", jobRoutes); // ✅ Matches the route

module.exports.handler = serverless(app);
