const express = require("express");
const axios = require("axios");
const router = express.Router();

// Load API key from .env for security (optional)
const API_KEY =
  process.env.FINDWORK_API_KEY || "f45848e020bb2cd293b45195f0148fb67635f448";

router.get("/", async (req, res) => {
  const { title = "", location = "" } = req.query;

  console.log(`[Request] title: ${title}, location: ${location}`);

  try {
    const url = `https://findwork.dev/api/jobs/?location=${location}&search=${title}&sort_by=relevance`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${API_KEY}`,
      },
      timeout: 5000, // ⏱ Timeout after 5 seconds
    });

    const jobs = response.data.results.map((job) => ({
      title: job.role || "N/A",
      company: job.company_name || "N/A",
      location: job.location || "Remote",
      // Add more fields if needed
    }));

    res.json(jobs);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ error: "Upstream job API timed out." });
    }
    if (err.response) {
      return res
        .status(err.response.status)
        .json({ error: err.response.statusText });
    }
    res.status(500).json({ error: "Failed to fetch job listings." });
  }
});

module.exports = router;
