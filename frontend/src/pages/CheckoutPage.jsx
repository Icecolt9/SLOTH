import React from "react";
import "../Styles/CheckoutPage.css";

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        {/* LEFT SIDE */}
        <div className="checkout-section">
          <h2>Delivery Information</h2>

          <label>
            Address
            <input type="text" placeholder="Enter delivery address" />
          </label>

          <label>
            City
            <input type="text" placeholder="City" />
          </label>

          <label>
            Phone Number
            <input type="text" placeholder="e.g. +123456789" />
          </label>
        </div>

        {/* RIGHT SIDE */}
        <div className="checkout-section">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>—</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>—</span>
          </div>

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <span>—</span>
          </div>

          <button className="place-order-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
