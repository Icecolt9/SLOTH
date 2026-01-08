import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // make sure axios is configured with baseURL
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("/api/auth/login/", {
        email,
        password,
      });

      const { access, refresh, role } = response.data;

      // Save tokens in localStorage
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "customer") {
        navigate("/home");
      } else if (role === "shop") {
        navigate("/shop-home");
      } else if (role === "rider") {
        navigate("/rider-home");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <p className="login-back">
        Back to <Link to="/index">Home</Link>
      </p>
    </div>
  );
};

export default LoginPage;
