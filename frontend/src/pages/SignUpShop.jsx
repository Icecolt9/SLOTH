import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../Styles/Auth.css";

const SignupShop = () => {
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await API.post("/api/auth/signup/", {
        email,
        password,
        role: "shop",
        shop_name: shopName,
      });

      if (response.status === 201) {
        alert("Shop account created!");
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
        <h1>Shop Registration</h1>
        <p className="auth-subtitle">Register your business</p>

        <input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Business Email"
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
          Register Shop
        </button>
      </div>
    </div>
  );
};

export default SignupShop;
