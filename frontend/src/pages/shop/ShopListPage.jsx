import React from "react";
import { Link } from "react-router-dom";
import ShopCard from "../../components/ShopCard";
import { shopsData } from "../../data/ShopsData";
import "../../Styles/ShopListPage.css";

const ShopListPage = () => {
  return (
    <div className="shoplist-wrapper">
      <h1 className="shoplist-title">Shops</h1>
      <div className="shoplist-grid">
        {Object.keys(shopsData).map((category) =>
          shopsData[category].map((shop) => (
            <Link key={shop.id} to={`/shop/${category}/${shop.id}`}>
              <ShopCard
                name={shop.name}
                description={shop.description}
                image={shop.image}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ShopListPage;
