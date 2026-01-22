import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import "../../Styles/ShopHome.css";
import ShopProducts from "../ShopProducts"; // <-- adjust the path

import { FaUser, FaBoxOpen, FaBell, FaCog, FaStore } from "react-icons/fa";

const CATEGORY_OPTIONS = ["Clothing", "Food", "Accessories", "Cosmetics", "Technology"];

const ShopHome = () => {
  const [shopProfile, setShopProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Form state
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        const response = await axios.get("/api/profiles/shop-profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setShopProfile(response.data);
        setShopName(response.data.shop_name || "");
        setDescription(response.data.description || "");
        setCategory(response.data.category || "");
      } catch (err) {
        console.error("Failed to fetch shop profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const formData = new FormData();
    formData.append("shop_name", shopName);
    formData.append("description", description);
    formData.append("category", category);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.patch("/api/profiles/shop-profile/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  };

  if (!shopProfile) return <p>Loading...</p>;

  return (
    <div className="shop-dashboard">
      {/* Sidebar */}
      <aside className="shop-sidebar">
        <div className="shop-sidebar-header">
          <FaStore className="shop-icon" />
          <h2>{shopProfile.shop_name || "Your Shop"}</h2>
        </div>

        <nav className="shop-nav">
          <div className={`shop-nav-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
            <FaUser /><span>Profile</span>
          </div>
          <div className={`shop-nav-item ${activeTab === "products" ? "active" : ""}`} onClick={() => setActiveTab("products")}>
            <FaBoxOpen /><span>Products</span>
          </div>
          <div className={`shop-nav-item ${activeTab === "notifications" ? "active" : ""}`} onClick={() => setActiveTab("notifications")}>
            <FaBell /><span>Notifications</span>
          </div>
          <div className={`shop-nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
            <FaCog /><span>Settings</span>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className="shop-content">
        {activeTab === "profile" && (
          <div className="profile-form">
            <h1>Shop Profile</h1>
            <form onSubmit={handleSaveProfile}>
              <label>Shop Name</label>
              <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />

              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <label>Shop Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />

              <button type="submit" className="auth-btn">Save Profile</button>
            </form>
          </div>
        )}

        {activeTab === "products" && (
          <ShopProducts shopProfile = {shopProfile} />)}
          
        {activeTab === "notifications" && <h1>Notifications</h1>}
        {activeTab === "settings" && <h1>Settings</h1>}
      </main>
    </div>
  );
};

export default ShopHome;
