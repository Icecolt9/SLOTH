import React from "react";
import ShopCard from "../components/ShopCard";
import { shopsData } from "../data/ShopsData";
import "../index.css";

const Clothing = () => {
  return (
    <div className="container">
      <h2>Clothing Shops</h2>
      <div className="shop-grid">
        {shopsData.clothing.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default Clothing;
