import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";

const LoginPage = () => {
  const [accountType, setAccountType] = useState("customer");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate login success, then redirect based on account type
    if (accountType === "customer") {
      navigate("/home"); // customer home page
    } else if (accountType === "shop") {
      navigate("/shop-home"); // shop home page
    } else if (accountType === "rider") {
      navigate("/rider-home"); // rider home page
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>

      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="accountType">Account Type:</label>
        <select
          id="accountType"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="shop">Shop</option>
          <option value="rider">Rider</option>
        </select>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
      </form>

      <p className="login-back">
        Back to <Link to="/index">Home</Link>
      </p>
    </div>
  );
};

export default LoginPage;
