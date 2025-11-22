import React from "react";
import { Link } from "react-router-dom";
import "../Styles/IndexPage.css";
import bamboo from "../pics/bamboo.jpg"; 

const IndexPage = () => {
  return (
    <div
      className="index-wrapper"
      style={{ backgroundImage: `url(${bamboo})` }} 
    >
    
      <header className="index-navbar">
        <div className="index-brand">SLOTH</div>

        <nav className="index-nav-right">
          <Link to="/login" className="index-nav-link">
            Login
          </Link>

          <div className="index-dropdown">
            <button className="index-nav-link">Sign Up ▾</button>

            <div className="index-dropdown-menu">
              <Link to="/signup/user">Register as User</Link>
              <Link to="/signup/rider">Register as Rider</Link>
              <Link to="/signup/shop">Register a Shop</Link>
            </div>
          </div>
        </nav>
      </header>

      
      <div className="index-content">
        <h1>Shop At Your Own Pace</h1>
        <p>Lesotho’s most relaxed shopping experience.</p>

        
      </div>
    </div>
  );
};

export default IndexPage;
