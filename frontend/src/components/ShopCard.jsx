import React from "react";
import "../Styles/ShopCard.css";

const ShopCard = ({ name, description, image }) => {
  return (
    <div className="shop-card">
      <img src={image} alt={name} className="shop-image" />
      <h3 className="shop-name">{name}</h3>
      <p className="shop-desc">{description}</p>
      <button className="view-btn">View Shop</button>
    </div>
  );
};

export default ShopCard;
