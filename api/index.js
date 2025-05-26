const express = require("express");
const dotenv = require("dotenv");
const jobRoutes = require("./jobs"); // ✅ Relative path to jobs.js in same folder
const serverless = require("serverless-http");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("✅ API server is starting...");
app.use("/api/jobs", jobRoutes); // ✅ Enable this line!

app.get("/", (req, res) => {
  res.send("API is working ✅");
});

module.exports = serverless(app); // ✅ Required by Vercel
