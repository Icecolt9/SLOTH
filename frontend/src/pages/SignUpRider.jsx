import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Auth.css";

const SignupRider = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await API.post("/api/auth/signup/", {
        email,
        password,
        role: "rider",
        full_name: fullName,
      });

      if (response.status === 201) {
        alert("Rider account created!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Rider Sign Up</h1>
        <p className="auth-subtitle">Join as a delivery rider</p>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handleSignup}>
          Join as Rider
        </button>
      </div>
    </div>
  );
};

export default SignupRider;
