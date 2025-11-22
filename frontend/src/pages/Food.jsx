import React from "react";
import ShopCard from "../components/ShopCard";
import { shopsData } from "../data/ShopsData";
import "../index.css";

const Food = () => {
  return (
    <div className="container">
      <h2>Food Shops</h2>
      <div className="shop-grid">
        {shopsData.food.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </div>
    </div>
  );
};

export default Food;
