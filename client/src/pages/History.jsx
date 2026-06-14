import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "https://ai-resume-analyzer-8lvz.onrender.com/api/resume/history"
      );

      setHistory(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Resume History 📊
      </h1>

      {

        history.map((item) => (

          <div
            key={item.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
            }}
          >

            <h2>ATS Score: {item.score}%</h2>

            <p>
              <strong>Job Description:</strong>
            </p>

            <p>{item.job_description}</p>

          </div>

        ))

      }

    </div>

  );

}

export default History;