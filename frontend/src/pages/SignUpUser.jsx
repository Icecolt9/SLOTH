import React from "react";
import "../Styles/Auth.css";

const SignupUser = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create Customer Account</h2>

        <input type="text" className="auth-input" placeholder="Username" />
        <input type="email" className="auth-input" placeholder="Email" />
        <input type="password" className="auth-input" placeholder="Password" />
        <input
          type="password"
          className="auth-input"
          placeholder="Confirm Password"
        />

        <button className="auth-btn">Sign Up</button>

        <div className="google-btn">Sign Up with Google</div>
      </div>
    </div>
  );
};

export default SignupUser;
