import { useState } from "react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function Home() {

  const [resume, setResume] = useState(null);

  const [jobDescription, setJobDescription] =
    useState("");

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("resume", resume);

    formData.append(
      "jobDescription",
      jobDescription
    );

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://ai-resume-analyzer-8lvz.onrender.com/api/resume/upload",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);

      setResult(data.aiResponse);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
        padding: "40px",
        fontFamily: "Arial",
        color: "white",
      }}
    >

      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <button
          onClick={() => {

            localStorage.removeItem("token");

            window.location.href = "/login";

          }}

          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#ef4444",
            color: "white",
            cursor: "pointer",
            float: "right",
            marginBottom: "20px",
          }}
        >

          Logout

        </button>

        <h1
          style={{
            textAlign: "center",
            fontSize: "58px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          AI Resume Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "18px",
            marginBottom: "50px",
          }}
        >
          Analyze your resume with AI 🚀
        </p>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            padding: "35px",
            borderRadius: "25px",
          }}
        >

          <form onSubmit={handleSubmit}>

            <textarea
              placeholder="Paste Job Description Here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              rows="8"
              style={{
                width: "100%",
                padding: "18px",
                borderRadius: "15px",
                border: "none",
                marginBottom: "25px",
              }}
            />

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files[0])
              }
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "18px",
                marginTop: "20px",
                border: "none",
                borderRadius: "15px",
                background:
                  "linear-gradient(to right,#2563eb,#7c3aed)",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >

              {
                loading
                  ? "Analyzing Resume..."
                  : "Analyze Resume"
              }

            </button>

          </form>

        </div>

        {
          result && (

            <div
              style={{
                marginTop: "40px",
              }}
            >

              <div
                style={{
                  background: "#111827",
                  padding: "40px",
                  borderRadius: "25px",
                  marginBottom: "25px",
                  textAlign: "center",
                }}
              >

                <h2>ATS Score</h2>

                <div
                  style={{
                    width: "220px",
                    height: "220px",
                    margin: "auto",
                  }}
                >

                  <CircularProgressbar
                    value={result.score}
                    text={`${result.score}%`}
                    styles={buildStyles({
                      textColor: "#fff",
                      pathColor: "#22c55e",
                      trailColor: "#374151",
                    })}
                  />

                </div>

              </div>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default Home;