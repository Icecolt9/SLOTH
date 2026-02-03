import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/ShopProductDetail.css";

const ShopProductDetail = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [product, setProduct] = useState(null);
  const [fullDescription, setFullDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch product detail
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}/detail/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProduct(res.data);
        setFullDescription(res.data.full_description || "");
        setQuantity(res.data.quantity ?? 0);
      } catch (err) {
        console.error("Failed to load product detail", err);
        alert("Product not found");
        navigate("/shop-home");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token, navigate]);

  // Save updates
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch(
        `/api/products/products/${id}/`,
        {
          full_description: fullDescription,
          quantity: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product updated successfully");
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading product...</p>;
  if (!product) return null;

  const isAvailable = quantity > 0;

  return (
    <div className="shop-product-detail">
      {/* HEADER */}
      <div className="detail-header">
        <h1>{product.name}</h1>
        <span className="price">${product.price}</span>
      </div>

      {/* MAIN IMAGE */}
      {product.image && (
        <div className="main-image">
          <img src={product.image} alt={product.name} />
        </div>
      )}

      {/* GALLERY */}
      {product.images && product.images.length > 0 && (
        <div className="gallery">
          {product.images.map((img) => (
            <img key={img.id} src={img.image} alt="Product" />
          ))}
        </div>
      )}

      {/* INFO */}
      <div className="detail-form">
        <label>Full Description</label>
        <textarea
          value={fullDescription}
          onChange={(e) => setFullDescription(e.target.value)}
          rows={5}
        />

        <label>Quantity</label>
        <input
          type="number"
          min="0"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className={`availability ${isAvailable ? "in" : "out"}`}>
          {isAvailable ? "In Stock" : "Out of Stock"}
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default ShopProductDetail;
