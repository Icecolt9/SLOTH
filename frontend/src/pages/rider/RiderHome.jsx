import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "../../Styles/RiderHome.css";
import { FaBoxOpen, FaBell, FaCog, FaBicycle, FaStar } from "react-icons/fa";

const RiderHome = () => {
  const [riderProfile, setRiderProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("deliveries");

  useEffect(() => {
    const fetchRiderProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const res = await axios.get("/api/profiles/rider/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRiderProfile(res.data);
      } catch (err) {
        console.error("Rider fetch error status:", err.response?.status);
        console.error("Rider fetch error data:", err.response?.data);
        console.error("Full error:", err);
      }
    };

    fetchRiderProfile();
  }, []);

  if (!riderProfile) return <p>Loading rider profile...</p>;

  
  const initials =
    riderProfile.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "R";

  return (
    <div className="rider-layout">
      {/*SIDEBAR*/}
      <aside className="rider-sidebar">
        <div className="sidebar-profile">
          <div className="profile-pic">{initials}</div>
          <h3>{riderProfile.full_name || "Rider"}</h3>
          <span className="status">Available</span>
        </div>

        <nav className="sidebar-nav">
          <div
            className={`nav-item ${activeTab === "deliveries" ? "active" : ""}`}
            onClick={() => setActiveTab("deliveries")}
          >
            <FaBoxOpen />
            <span>Deliveries</span>
          </div>

          <div
            className={`nav-item ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            <FaBell />
            <span>Notifications</span>
          </div>

          <div
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog />
            <span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="rider-main">
        <h1 className="page-title">Rider Dashboard</h1>

        <div className="stats-cards">
          <div className="stat-card">
            <FaBoxOpen className="stat-icon" />
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">Deliveries</span>
            </div>
          </div>

          <div className="stat-card">
            <FaBicycle className="stat-icon" />
            <div>
              <span className="stat-number">0</span>
              <span className="stat-label">Active Orders</span>
            </div>
          </div>

          <div className="stat-card">
            <FaStar className="stat-icon" />
            <div>
              <span className="stat-number">—</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="deliveries-placeholder">
          <h2>Available Deliveries</h2>
          <p>No deliveries assigned yet.</p>
        </div>
      </main>
    </div>
  );
};

export default RiderHome;
