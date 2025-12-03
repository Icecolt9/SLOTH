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

        <NavLink to="/clothing" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaTshirt /> Clothing
        </NavLink>

        <NavLink to="/cosmetics" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaPalette /> Cosmetics
        </NavLink>

        <NavLink to="/food" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaAppleAlt /> Food
        </NavLink>

        <NavLink to="/accessories" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaShoppingBag /> Accessories
        </NavLink>

        <NavLink to="/technology" className="nav-link" onClick={() => setMenuOpen(false)}>
          <FaHeadphones /> Technology
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
