import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Home.css";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // You can later add search filtering logic here
  };

  return (
    <div className="home">
      <h1>Shop At Your Own Pace</h1>
      <p>
        Welcome to Sloth, where you can browse and shop for your favorite items
        without any rush. Explore our categories and find what you need.
      </p>

      {/* Search bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleSearch}
      />

      <div className="button-group">
        <button className="outlined-btn">Explore Categories</button>
        <button className="outlined-btn">Browse Trending</button>
      </div>
    </div>
  );
};

export default Home;
