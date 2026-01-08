import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Auth.css";

const SignupCustomer = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await API.post("/api/auth/signup/", {
        email,
        password,
        role: "customer",
      });

      if (response.status === 201) {
        alert("Signup successful!");
        navigate("/login"); // redirect to login page
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Customer Sign Up</h1>
        <p className="auth-subtitle">Create your customer account</p>

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
          Create Account
        </button>
      </div>
    </div>
  );
};

export default SignupCustomer;
