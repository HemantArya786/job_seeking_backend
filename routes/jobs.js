const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "f45848e020bb2cd293b45195f0148fb67635f448";

router.get("/", async (req, res) => {
  const {
    title = "",
    location = "",
    // salary_min = "",
    // sort_by = "",
    // salary_max = "",
    // what_exclude = "",
    // days_old = "",
    // full_time = "",
    // results_per_page = "",
    // permanent = "",
  } = req.query;

  console.log(req.query.title, "req query");

  try {
    console.log("try is called");
    let url = `https://findwork.dev/api/jobs/?location=${location}&search=${title}&sort_by=relevance`;
    const response = await axios.get(url, {
      headers: {
        Authorization: "Token f45848e020bb2cd293b45195f0148fb67635f448",
      },
    });
    // console.log(response.data.results[0], "response from api");
    const jobs = response.data.results.map((job) => ({
      title: job.role,
      company: job?.company_name,
      location: job?.location,
      // category: job.category.label,
      // salary: `${job.salary_min} - ${job.salary_max}`,
      // description: job.description,
      // url: job.redirect_url,
      // created: job.created,
    }));

    // console.log(jobs, "jobzz");
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch job listings." });
  }
});

module.exports = router;
