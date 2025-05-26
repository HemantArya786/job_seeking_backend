console.log("API server is starting...");

const express = require("express");
const dotenv = require("dotenv");
const jobRoutes = require("./jobs");
const serverless = require("serverless-http");
var cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
}

module.exports.handler = serverless(app);
