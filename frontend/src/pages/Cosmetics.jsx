import React from "react";
import ShopCard from "../components/ShopCard";
import { shopsData } from "../data/ShopsData";
import "../index.css";

const Cosmetics = () => {
  return (
    <div className="container">
      <h2>Cosmetics Shops</h2>
      <div className="shop-grid">
        {shopsData.cosmetics.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default Cosmetics;
