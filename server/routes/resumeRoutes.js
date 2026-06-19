const express = require("express");
const router = express.Router();
const multer = require("multer");

const analyzeResume = require("../utils/analyzeResume");
const pool = require("../config/db");

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  upload.single("resume"),
  async (req, res) => {

    try {

      const jobDescription =
        req.body.jobDescription;

      const aiResponse =
        await analyzeResume(
          "",
          jobDescription
        );

      await pool.query(
        "INSERT INTO resume_history (score, job_description) VALUES ($1, $2)",
        [
          aiResponse.score,
          jobDescription,
        ]
      );

      res.json({
        success: true,
        aiResponse,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message,
      });

    }

  }
);

router.get(
  "/history",
  async (req, res) => {

    try {

      const result =
        await pool.query(
          "SELECT * FROM resume_history ORDER BY id DESC"
        );

      res.json(result.rows);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        error: error.message,
      });

    }

  }
);

module.exports = router;