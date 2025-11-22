import React from "react";
import ShopCard from "../components/ShopCard";
import { shopsData } from "../data/ShopsData";
import "../index.css";

const Accessories = () => {
  return (
    <div className="container">
      <h2>Accessories Shops</h2>
      <div className="shop-grid">
        {shopsData.accessories.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default Accessories;
