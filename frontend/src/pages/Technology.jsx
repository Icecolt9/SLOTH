import React from "react";
import ShopCard from "../components/ShopCard";
import { shopsData } from "../data/ShopsData";
import "../index.css";

const Technology = () => {
  return (
    <div className="container">
      <h2>Technology Shops</h2>
      <div className="shop-grid">
        {shopsData.technology.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default Technology;
