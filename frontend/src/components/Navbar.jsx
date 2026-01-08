import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaTshirt, FaPalette, FaAppleAlt, FaShoppingBag, FaHome, FaHeadphones } from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* LEFT: BRAND */}
      <div className="nav-left">
        <div className="brand">
          <div className="brand-title">SLOTH</div>
          <div className="brand-sub">shop at your own pace</div>
        </div>
      </div>

      {/* MOBILE MENU ICON */}
      <div className="mobile-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      {/* RIGHT: LINKS */}
      <nav className={`nav-right ${menuOpen ? "open" : ""}`}>
        <NavLink to="/home" className="nav-link" end onClick={() => setMenuOpen(false)}>
          <FaHome /> Home
        </NavLink>

        <NavLink to="/shops/clothing" className="nav-link">
          <FaTshirt /> Clothing
        </NavLink>

        <NavLink to="/shops/cosmetics" className="nav-link">
          <FaPalette /> Cosmetics
        </NavLink>

        <NavLink to="/shops/food" className="nav-link">
          <FaAppleAlt /> Food
        </NavLink>

        <NavLink to="/shops/accessories" className="nav-link">
          <FaShoppingBag /> Accessories
        </NavLink>

        <NavLink to="/shops/technology" className="nav-link">
          <FaHeadphones /> Technology
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
