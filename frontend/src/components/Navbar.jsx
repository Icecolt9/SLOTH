import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTshirt,
  FaPalette,
  FaAppleAlt,
  FaShoppingBag,
  FaHome,
  FaHeadphones,
  FaChevronDown,
  FaTruck,
  FaShoppingCart,
  FaCog,
} from "react-icons/fa";
import "../Styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
      <div
        className="mobile-menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      {/* RIGHT: LINKS */}
      <nav className={`nav-right ${menuOpen ? "open" : ""}`}>
        <NavLink
          to="/home"
          className="nav-link"
          end
          onClick={() => setMenuOpen(false)}
        >
          <FaHome /> Home
        </NavLink>

        {/* CATEGORIES DROPDOWN */}
        <div
          className="nav-link dropdown"
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          Categories <FaChevronDown className="chevron" />

          {categoriesOpen && (
            <div className="dropdown-menu">
              <NavLink to="/shops/clothing" onClick={() => setMenuOpen(false)}>
                <FaTshirt /> Clothing
              </NavLink>

              <NavLink to="/shops/cosmetics" onClick={() => setMenuOpen(false)}>
                <FaPalette /> Cosmetics
              </NavLink>

              <NavLink to="/shops/food" onClick={() => setMenuOpen(false)}>
                <FaAppleAlt /> Food
              </NavLink>

              <NavLink to="/shops/accessories" onClick={() => setMenuOpen(false)}>
                <FaShoppingBag /> Accessories
              </NavLink>

              <NavLink to="/shops/technology" onClick={() => setMenuOpen(false)}>
                <FaHeadphones /> Technology
              </NavLink>
            </div>
          )}
        </div>

        {/* NEW LINKS */}
        <NavLink
          to="/deliveries"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaTruck /> Deliveries
        </NavLink>

        <NavLink
          to="/cart"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaShoppingCart /> Cart
        </NavLink>

        <NavLink
          to="/settings"
          className="nav-link"
          onClick={() => setMenuOpen(false)}
        >
          <FaCog /> Settings
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
