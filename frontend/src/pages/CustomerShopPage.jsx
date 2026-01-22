import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/CustomerShopPage.css";

const CustomerShopPage = () => {
  const { shopId } = useParams();

  const [shop, setShop] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) {
      setLoading(false);
      return;
    }

    const fetchShop = async () => {
      try {
        const res = await axios.get(
          `/api/products/shops/${shopId}/products/`
        );

        console.log("SHOP RESPONSE:", res.data);

        setShop(res.data.shop ?? null);
        setSections(res.data.sections ?? []);
      } catch (err) {
        console.error("API ERROR:", err.response?.data || err);
        setShop(null);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [shopId]);

  if (loading) return <p className="loading">Loading shop...</p>;
  if (!shop) return <p className="error">Shop not found</p>;

  return (
    <div className="customer-shop-page">
      {/* ===== SHOP HEADER ===== */}
      <div className="shop-header">
        <img
          src={
            shop.image
              ? `http://127.0.0.1:8000${shop.image}`
              : "/placeholder.png"
          }
          alt={shop.shop_name}
          className="shop-image"
        />

        <div className="shop-info">
          <h1>{shop.shop_name}</h1>
          <p>{shop.description || "No description provided."}</p>
        </div>
      </div>

      {/* ===== PRODUCT SECTIONS ===== */}
      {sections.length === 0 ? (
        <p className="empty-products">No products yet</p>
      ) : (
        sections.map((section) => (
          <div key={section.id} className="product-section">
            <h2 className="section-title">{section.name}</h2>

            {(!section.products || section.products.length === 0) ? (
              <p className="empty-section">No products in this section</p>
            ) : (
              <div className="product-grid">
                {section.products.map((product) => (
                  <div key={product.id} className="product-card">
                    {product.image && (
                      <img
                        src={`http://127.0.0.1:8000${product.image}`}
                        alt={product.name}
                        className="product-image"
                      />
                    )}

                    <div className="product-body">
                      <h3>{product.name}</h3>
                      <p>{product.description || "No description"}</p>
                      <span className="price">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default CustomerShopPage;
