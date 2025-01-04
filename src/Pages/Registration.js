import React from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

function Registration() {
  let navigate = useNavigate();
  const handleChange = () => {};
  const handleClick = () => {};
  return (
    <div style={{ margin: "5%" }}>
      <Paper
        elevation={5}
        style={{
          width: "25rem",
          padding: "2rem",
          margin: "auto",
          marginTop: "5rem",
          borderRadius: "8px",
        }}
      >
        <div>
          <center>
            <h3 style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
              Sign Up
            </h3>
          </center>

          {/* First Name Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="first-name"
              label="First Name"
              type="text"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="last-name"
              label="Last Name"
              type="text"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* Sign Up Button */}
          <div className="mb-3">
            <button
              type="button"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#f57c00",
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
              }}
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>

          {/* Link to Login */}
          <div className="mb-3" style={{ textAlign: "center" }}>
            <p style={{ margin: 0 }}>
              Already have an account?
              <a
                href="#"
                style={{
                  color: "#f57c00",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/Login")}
              >
                Log In
              </a>
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Registration;
