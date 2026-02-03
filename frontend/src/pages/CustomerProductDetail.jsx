import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/CustomerProductDetail.css";

const CustomerProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${productId}/detail/`);
        setProduct(res.data);

        // default main image
        if (res.data.gallery && res.data.gallery.length > 0) {
          setSelectedImage(res.data.gallery[0].image);
        } else if (res.data.image) {
          setSelectedImage(res.data.image);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="error">Product not found</p>;

  const isAvailable = product.quantity > 0;

  const handleAddToCart = async () => {
    if (!isAvailable) return;

    setAddingToCart(true);
    const token = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "/api/products/cart/add/", // matches your backend
        { product_id: product.id }, // must be product_id
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Navigate to cart page after adding
      navigate("/cart");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Failed to add product to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="product-detail-page">
      {/* LEFT: IMAGES */}
      <div className="product-images">
        <div className="main-image">
          {selectedImage ? (
            <img
              src={`http://127.0.0.1:8000${selectedImage}`}
              alt={product.name}
            />
          ) : (
            <div className="image-placeholder">No Image</div>
          )}
        </div>

        {product.gallery && product.gallery.length > 0 && (
          <div className="image-gallery">
            {product.gallery.map((img) => (
              <img
                key={img.id}
                src={`http://127.0.0.1:8000${img.image}`}
                alt={product.name}
                className={selectedImage === img.image ? "active" : ""}
                onClick={() => setSelectedImage(img.image)}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: INFO */}
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <span className="product-price">
          ${parseFloat(product.price).toFixed(2)}
        </span>

        <p className="product-description">
          {product.full_description || "No detailed description provided."}
        </p>

        <div
          className={`availability ${isAvailable ? "available" : "unavailable"}`}
        >
          {isAvailable ? "In stock" : "Out of stock"}
        </div>

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!isAvailable || addingToCart}
        >
          {addingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default CustomerProductDetail;
