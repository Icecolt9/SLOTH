import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/CartPage.css";

const CartPage = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/products/cart/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(res.data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  if (loading) return <p className="loading">Loading cart...</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                {item.product_image && (
                  <img
                    src={`http://127.0.0.1:8000${item.product_image}`}
                    alt={item.product_name}
                  />
                )}
                <span className="cart-product-name">
                  {item.product_name}
                </span>
              </div>
            ))}
          </div>

          {/* ✅ CHECKOUT BUTTON */}
          <div className="cart-checkout">
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
