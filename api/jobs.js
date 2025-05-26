const express = require("express");
const axios = require("axios");
const router = express.Router();

console.log("Jobs route loaded");

router.get("/", async (req, res) => {
  const { title = "", location = "" } = req.query;

  try {
    const url = `https://findwork.dev/api/jobs/?location=${location}&search=${title}&sort_by=relevance`;

    const response = await axios.get(url, {
      headers: {
        Authorization: "Token f45848e020bb2cd293b45195f0148fb67635f448",
      },
    });

    const jobs = response.data.results.map((job) => ({
      title: job.role,
      company: job?.company_name,
      location: job?.location,
    }));

    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch job listings." });
  }
});

module.exports = router;
