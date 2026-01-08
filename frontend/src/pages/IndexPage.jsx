import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/IndexPage.css"; // regular CSS file

const IndexPage = () => {
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  return (
    <div className="index-wrapper">
      {/* Navbar */}
      <nav className="index-navbar">
        <div className="index-nav-links">
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="index-hero">
        <h1 className="index-title">SLOTH</h1>
        <p className="index-tagline">Shop at your own pace</p>

        {/* Buttons / Cards */}
        {!showSignupOptions ? (
          <div className="index-buttons">
            <Link to="/login" className="index-btn login-btn">
              Login
            </Link>
            <button
              onClick={() => setShowSignupOptions(true)}
              className="index-btn signup-btn"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="index-buttons">
            <Link to="/signup/customer" className="index-btn option-btn">
              Register as Customer
            </Link>
            <Link to="/signup/rider" className="index-btn option-btn">
              Register as Rider
            </Link>
            <Link to="/signup/shop" className="index-btn option-btn">
              Register a Shop
            </Link>
            <button
              onClick={() => setShowSignupOptions(false)}
              className="index-btn back-btn"
            >
              Back
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default IndexPage;
