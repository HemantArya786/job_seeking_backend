const express = require("express");
const axios = require("axios");
const router = express.Router();

// Load API key from .env for security (optional)
const API_KEY =
  process.env.FINDWORK_API_KEY || "f45848e020bb2cd293b45195f0148fb67635f448";

router.get("/", async (req, res) => {
  const { title = "", location = "" } = req.query;

  console.log(`[Request] title: ${title}, location: ${location}`);
  res.json({ title: "hello" });
});

module.exports = router;
