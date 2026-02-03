import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/ShopProducts.css";
import { FaPlus, FaEdit } from "react-icons/fa";

const ShopProducts = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const [sections, setSections] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [header, setHeader] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  /* ================= FETCH SECTIONS ================= */
  const fetchSections = useCallback(async () => {
    try {
      const res = await axios.get("/api/products/sections/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(res.data);
    } catch (err) {
      console.error("Failed to fetch sections:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchSections();
  }, [fetchSections]);

  /* ================= ADD PRODUCT ================= */
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!header || !name || !price) {
      alert("Section, name, and price are required");
      return;
    }

    const formData = new FormData();
    formData.append("header", header);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      await axios.post("/api/products/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setHeader("");
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setShowForm(false);

      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  /* ================= UPDATE BASIC INFO ================= */
  const handleUpdateProduct = async (productId) => {
    try {
      await axios.patch(
        `/api/products/products/${productId}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditingId(null);
      fetchSections();
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="shop-products">
      {/* ===== HEADER ===== */}
      <div className="shop-products-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Product
        </button>
      </div>

      {/* ===== ADD PRODUCT FORM ===== */}
      {showForm && (
        <form className="add-product-form" onSubmit={handleAddProduct}>
          <h2>Add Product</h2>

          <input
            placeholder="Section / Header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />

          <input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />

          <div className="form-actions">
            <button className="auth-btn" type="submit">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ===== SECTIONS & PRODUCTS ===== */}
      {sections.map((section) => (
        <div key={section.id} className="product-section">
          <h2 className="section-title">{section.name}</h2>

          <div className="product-grid">
            {section.products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() =>
                  navigate(`/shop/products/${product.id}`)
                }
              >
                {editingId === product.id ? (
                  <>
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      value={editData.price}
                      onChange={(e) =>
                        setEditData({ ...editData, price: e.target.value })
                      }
                    />
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />
                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateProduct(product.id);
                      }}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {product.image && (
                      <img src={product.image} alt={product.name} />
                    )}
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span className="price">${product.price}</span>

                    <button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingId(product.id);
                        setEditData({
                          name: product.name,
                          price: product.price,
                          description: product.description,
                        });
                      }}
                    >
                      <FaEdit /> Quick Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
