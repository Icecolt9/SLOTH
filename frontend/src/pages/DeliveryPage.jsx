import React, { useState } from "react";
import "../Styles/DeliveryPage.css";

const DeliveryPage = () => {
  const [activeTab, setActiveTab] = useState("my-deliveries");

  return (
    <div className="delivery-page">
      {/* ===== SIDEBAR ===== */}
      <aside className="delivery-sidebar">
        <h2 className="sidebar-title">Deliveries</h2>

        <button
          className={`sidebar-btn ${
            activeTab === "my-deliveries" ? "active" : ""
          }`}
          onClick={() => setActiveTab("my-deliveries")}
        >
          My Deliveries
        </button>

        <button
          className={`sidebar-btn ${
            activeTab === "start-delivery" ? "active" : ""
          }`}
          onClick={() => setActiveTab("start-delivery")}
        >
          Start Delivery
        </button>
      </aside>

      {/* ===== CONTENT ===== */}
      <main className="delivery-content">
        {activeTab === "my-deliveries" && (
          <div className="deliveries-section">
            <h1>My Deliveries</h1>

            {/* Placeholder UI */}
            <div className="delivery-card">
              <p><strong>Order #1234</strong></p>
              <p>Status: In Transit</p>
              <p>Rider: Assigned</p>
            </div>

            <div className="delivery-card">
              <p><strong>Order #5678</strong></p>
              <p>Status: Delivered</p>
              <p>Rider: John D.</p>
            </div>
          </div>
        )}

        {activeTab === "start-delivery" && (
          <div className="start-delivery-section">
            <h1>Start a Delivery</h1>

            <form className="delivery-form">
              <label>
                Pickup Location
                <input type="text" placeholder="Shop address" />
              </label>

              <label>
                Drop-off Location
                <input type="text" placeholder="Customer address" />
              </label>

              <label>
                Delivery Notes
                <textarea placeholder="Optional notes for rider" />
              </label>

              <button type="button" className="start-delivery-btn">
                Send to Riders
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeliveryPage;
