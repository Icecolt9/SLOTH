import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaTshirt, FaPalette, FaAppleAlt, FaShoppingBag, FaTablet, } from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="brand">
          <div className="brand-title">SLOTH</div>
          <div className="brand-sub">shop at your own pace</div>
        </div>
      </div>

      <nav className="nav-right">
        <NavLink to="/" className="nav-link" end>
          <FaHome style={{ marginRight: "5px" }} /> Home
        </NavLink>
        <NavLink to="/clothing" className="nav-link">
          <FaTshirt style={{ marginRight: "5px" }} /> Clothing
        </NavLink>
        <NavLink to="/cosmetics" className="nav-link">
          <FaPalette style={{ marginRight: "5px" }} /> Cosmetics
        </NavLink>
        <NavLink to="/food" className="nav-link">
          <FaAppleAlt style={{ marginRight: "5px" }} /> Food
        </NavLink>
        <NavLink to="/accessories" className="nav-link">
          <FaShoppingBag style={{ marginRight: "5px" }} /> Accessories
        </NavLink>
        <NavLink to="/technology" className="nav-link">
          <FaTablet style={{ marginRight: "5px" }} /> Technology
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
