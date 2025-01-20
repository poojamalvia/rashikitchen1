import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { redcolor } from "../Design";

function Login() {
  const handleChange = (e) => {};

  const [adminid, setAdminid] = React.useState();
  const [adminpswd, setAdminpswd] = React.useState();
  const AdminCollectionRef = collection(db, "Admincredential");
  const [admindata, setAdmindata] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClicksnack = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let navigate = useNavigate();
  let aid;
  let apswd;

  useEffect(() => {
    const getadmindata = async () => {
      const data = await getDocs(AdminCollectionRef);
      setAdmindata(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getadmindata();
  }, []);

  const handleClick = () => {
    // Loop through fetched admin data to check if credentials match
    const foundAdmin = admindata.find(
      (admin) => admin.loginid === adminid && admin.pswd === adminpswd
    );

    //vbfcvbfcgb
    //dvdfvbdfvbcd
    //

    if (foundAdmin) {
      // If credentials match, navigate to the next page (e.g., admin dashboard)
      // localStorage.setItem('token', )
      navigate("/Admin/Menua");
    } else {
      // If credentials don't match, show error message.
      setErrorMessage("Invalid login credentials. Please try again.");
      handleClicksnack();
    }
  };

  return (
    <div style={{ margin: "5%", display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={5}
        style={{
          width: "25rem",
          padding: "2rem",
          margin: "auto",
          marginTop: "5rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        <div>
          <center>
            <h3 style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
              Log In
            </h3>
          </center>

          {/* Email Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="email"
              label="Your Email"
              type="text"
              variant="outlined"
              onChange={(e) => setAdminid(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              id="password"
              label="Your Password"
              type="password"
              variant="outlined"
              onChange={(e) => setAdminpswd(e.target.value)}
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="form-check mb-3"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="rememberMe"
              />
              <label
                className="form-check-label"
                htmlFor="rememberMe"
                style={{ marginLeft: "8px" }}
              >
                Remember Me
              </label>
            </div>
            <a
              href="#"
              style={{
                fontSize: "14px",
                color: "#f57c00",
                textDecoration: "none",
              }}
            >
              Forgot your password?
            </a>
          </div>

          {/* Log In Button */}
          <button
            style={{
              width: "100%",
              padding: "14px 20px",
              backgroundColor: redcolor,
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s",
            }}
            type="button"
            className="btn"
            onClick={handleClick}
          >
            Log In
          </button>

          {/* Sign Up Link */}
          {!window.location.pathname.includes("Admin") ? (
            <div className="mt-3" style={{ textAlign: "center" }}>
              <p style={{ margin: 0 }}>
                Don't have an account?{" "}
                <a
                  href=""
                  onClick={() => navigate("/User/Registration")}
                  style={{
                    color: "#f57c00",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  Sign Up
                </a>
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Positioned at the bottom-right
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
