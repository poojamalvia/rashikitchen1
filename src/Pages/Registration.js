import React from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { redcolor } from "../Design";
import { db } from "../firebase-config";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Registration() {
  const RegCollectionref = collection(db, "Userdetails");
  const [registrationdata, setRegistrationdata] = React.useState([]);
  const [data, setData] = React.useState();

  let navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const validateFields = () => {
    return (
      data.fname && data.lname && data.email && data.password && data.mobileno
    );
  };
  const handleAddClick = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Please fill in all dining fields before adding.");
      return; // Prevent further execution if fields are not valid
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log(user);
      console.log("user registered successfully");
      await createuserregistration(user.uid, data);

      // Clear form fields after successful registration
      setData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        mobileno: "",
      });

      alert("Registration successful!");

      // Navigate to login page after signup
      navigate("/User/login");
    } catch (error) {
      console.log(error);
    }
  };


  const createuserregistration = async (userId, data) => {
    try {
      await setDoc(doc(db, "Userdetails", userId), {
        uid: userId, // Store Firebase Authentication user ID
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        mobileno: data.mobileno,
      });

      setRegistrationdata([
        ...registrationdata,
        {
          uid: userId,
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          mobileno: data.mobileno,
        },
      ]);

      console.log("User details saved to Firestore.");
    } catch (error) {
      console.error("Error saving user data:", error.message);
    }
  };
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
              name="fname"
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
              name="lname"
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
              name="email"
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
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <TextField
              required
              style={{ width: "100%" }}
              name="mobileno"
              label="Mobile number"
              type="number"
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
                backgroundColor: redcolor,
                border: "none",
                borderRadius: "4px",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s",
              }}
              onClick={handleAddClick}
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
                  color: redcolor,
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/user/Login")}
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
