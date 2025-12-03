import React from "react";
import { useParams } from "react-router-dom";
import { shopsData } from "../../data/ShopsData";

import "../../Styles/ProductPage.css";

const ProductPage = () => {
  const { category, shopId } = useParams();
  const shop = shopsData[category].find((s) => s.id === parseInt(shopId));

  // Placeholder
  const products = [
    { id: 1, name: "Product 1", price: 19.99, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 29.99, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 9.99, image: "https://via.placeholder.com/150" },
  ];

  if (!shop) return <p>Shop not found</p>;

  return (
    <div className="productpage-wrapper">
      <h1 className="productpage-title">{shop.name}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
