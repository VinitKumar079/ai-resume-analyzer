const express = require("express");

const cors = require("cors");

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/resume", resumeRoutes);

pool.connect()
.then(async () => {

```
console.log("PostgreSQL Connected");

await pool.query(
  "CREATE TABLE IF NOT EXISTS resume_history (
    id SERIAL PRIMARY KEY,
    score INTEGER,
    job_description TEXT
  )
);

console.log("resume_history table ready");
```

})
.catch((err) => {

```
console.log(err);
```

});


app.get("/", (req, res) => {

  res.send("AI Resume Analyzer Backend Running");

});

const PORT = 5000;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});