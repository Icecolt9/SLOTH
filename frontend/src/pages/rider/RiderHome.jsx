import React from "react";
import { FaBoxOpen, FaBell, FaCog, FaBicycle, FaStar } from "react-icons/fa";
import "../../Styles/RiderHome.css";

const RiderHome = () => {
  return (
    <div className="rider-wrapper">
      
      <header className="rider-header">
        <div className="profile-pic">JD</div>
        <h2 className="rider-name">John Doe</h2>
        <span className="rider-status">Available</span>
      </header>

      
      <div className="stats-cards">
        <div className="stat-card">
          <FaBoxOpen className="stat-icon" />
          <div>
            <span className="stat-number">23</span>
            <span className="stat-label">Deliveries</span>
          </div>
        </div>
        <div className="stat-card">
          <FaBicycle className="stat-icon" />
          <div>
            <span className="stat-number">2</span>
            <span className="stat-label">Active Orders</span>
          </div>
        </div>
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <div>
            <span className="stat-number">4.8 ★</span>
            <span className="stat-label">Rating</span>
          </div>
        </div>
      </div>

      
      <nav className="bottom-nav">
        <div className="nav-item active">
          <FaBoxOpen />
          <span>Deliveries</span>
        </div>
        <div className="nav-item">
          <FaBell />
          <span>Notifications</span>
        </div>
        <div className="nav-item">
          <FaCog />
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default RiderHome;
