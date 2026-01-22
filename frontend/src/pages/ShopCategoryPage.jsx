import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import "../Styles/ShopCategoryPage.css";

const ShopCategoryPage = () => {
  const { category } = useParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          `/api/profiles/shops/?category=${category}`
        );
        setShops(response.data);
      } catch (err) {
        console.error("Failed to fetch shops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [category]);

  if (loading) return <p>Loading shops...</p>;
  if (shops.length === 0)
    return <p>No shops found in {category}</p>;

  return (
    <div className="shop-category-page">
      <h1>
        {category.charAt(0).toUpperCase() + category.slice(1)} Shops
      </h1>

      <div className="shop-grid">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shop/${shop.id}`}
            className="shop-card-link"
          >
            <div className="shop-card">
              <img
                src={
                  shop.image
                    ? `http://127.0.0.1:8000${shop.image}`
                    : "/placeholder.png"
                }
                alt={shop.shop_name}
              />
              <h2>{shop.shop_name}</h2>
              <p>{shop.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopCategoryPage;
