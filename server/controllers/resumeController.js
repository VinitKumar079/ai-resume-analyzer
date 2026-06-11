const fs = require("fs");

const pdfParse = require("pdf-parse");

const analyzeResume =
require("../services/aiService");

const db =
require("../config/db");

const uploadResume =
async (req, res) => {

try {

  const filePath =
    req.file.path;

  const dataBuffer =
    fs.readFileSync(filePath);

  const pdfData =
    await pdfParse(dataBuffer);

  const jobDescription =
    req.body.jobDescription;

  const aiResponse =
    await analyzeResume(
      pdfData.text,
      jobDescription
    );

  await db.query(

    `
    INSERT INTO resume_history
    (score, job_description)

    VALUES ($1, $2)
    `,

    [
      aiResponse.score,
      jobDescription,
    ]

  );

  res.json({

    message:
      "Resume analyzed successfully",

    aiResponse,

  });

} catch (error) {

  console.log(error);

  res.status(500).json({
    error: error.message,
  });

}

};

const getResumeHistory =
async (req, res) => {

try {

  const result =
    await db.query(

      `
      SELECT *
      FROM resume_history
      ORDER BY id DESC
      `

    );

  res.json(result.rows);

} catch (error) {

  console.log(error);

  res.status(500).json({
    error: error.message,
  });

}

};

module.exports = {
uploadResume,
getResumeHistory,
};