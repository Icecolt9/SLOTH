import React, { useState } from "react";
import "../../Styles/ShopHome.css";
import { FaBoxOpen, FaBatteryFull, FaUsers, FaShoppingBag, FaBell, FaCog } from "react-icons/fa";

const ShopHome = () => {
  const [activeTab, setActiveTab] = useState("Products");

  return (
    <div className="shop-home">

      
      <header className="shop-header">
        <h1>Shopwrong</h1>
        <span className="status-badge">Open now</span>
      </header>

      
      <div className="stats-row">
        <div className="stat-card">
          <FaBoxOpen className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">156</span>
            <span className="stat-label">Products</span>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">2.4k</span>
            <span className="stat-label">Customers</span>
          </div>
        </div>
        <div className="stat-card">
          <FaShoppingBag className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">Orders</span>
            <span className="stat-label">Today</span>
          </div>
        </div>
      </div>

      {/* Main Content Placeholder */}
      <div className="shop-main-content">
        <p>Content for the selected tab will appear here.</p>
      </div>

      {/* Bottom Navigation */}
      <nav className="shop-bottom-nav">
        <div
          className={`nav-item ${activeTab === "Products" ? "active" : ""}`}
          onClick={() => setActiveTab("Products")}
        >
          <FaBoxOpen />
          <span>Add Products</span>
        </div>
        <div
          className={`nav-item ${activeTab === "Orders" ? "active" : ""}`}
          onClick={() => setActiveTab("Orders")}
        >
          <FaShoppingBag />
          <span>View Orders</span>
        </div>
        <div
          className={`nav-item ${activeTab === "Deliveries" ? "active" : ""}`}
          onClick={() => setActiveTab("Deliveries")}
        >
          <FaBatteryFull />
          <span>View Deliveries</span>
        </div>
        <div
          className={`nav-item ${activeTab === "Notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("Notifications")}
        >
          <FaBell />
          <span>Notifications</span>
        </div>
        <div
          className={`nav-item ${activeTab === "Settings" ? "active" : ""}`}
          onClick={() => setActiveTab("Settings")}
        >
          <FaCog />
          <span>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default ShopHome;
