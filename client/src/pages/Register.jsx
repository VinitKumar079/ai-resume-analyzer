import { useState } from "react";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e
  ) => {

    e.preventDefault();

    const response = await fetch(
      "https://ai-resume-analyzer-8lvz.onrender.com/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    alert(data.message);
  };

  return (

    <div style={{

      minHeight: "100vh",

      display: "flex",

      justifyContent: "center",

      alignItems: "center",

      background:
        "#0f172a",

    }}>

      <form
        onSubmit={handleRegister}
        style={{

          width: "350px",

          background:
            "#1e293b",

          padding: "30px",

          borderRadius: "10px",

        }}
      >

        <h1 style={{
          color: "white",
        }}>
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>
            setName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <button style={buttonStyle}>
          Register
        </button>

      </form>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "12px",

  marginTop: "15px",

  border: "none",

  borderRadius: "8px",
};

const buttonStyle = {

  width: "100%",

  padding: "12px",

  marginTop: "20px",

  border: "none",

  borderRadius: "8px",

  background: "#2563eb",

  color: "white",

  fontSize: "16px",
};

export default Register;