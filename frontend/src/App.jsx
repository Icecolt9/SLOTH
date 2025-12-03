import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IndexPage from "./pages/IndexPage";
import Clothing from "./pages/Clothing";
import Cosmetics from "./pages/Cosmetics";
import Food from "./pages/Food";
import Accessories from "./pages/Accessories";
import Technology from "./pages/Technology";
import LoginPage from "./pages/LoginPage";
import "./index.css";

import RiderHome from "./pages/rider/Riderhome";
import ShopHome from "./pages/shop/Shophome";
import ProductPage from "./pages/shop/ProductPage";
import ShopListPage from "./pages/shop/ShopListPage";


const App = () => {
  return (
    <Router>
      <Routes>

        
        <Route path="/" element={<IndexPage />} />
        <Route path="home" element={<><Navbar /><Home /></>} />
        <Route path="/clothing" element={<><Navbar /><Clothing /></>} />
        <Route path="/cosmetics" element={<><Navbar /><Cosmetics /></>} />
        <Route path="/food" element={<><Navbar /><Food /></>} />
        <Route path="/accessories" element={<><Navbar /><Accessories /></>} />
        <Route path="/technology" element={<><Navbar /><Technology /></>} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/rider-home" element={<><RiderHome /></>} />
        <Route path="/shop-home" element={<><ShopHome /></>} />
        <Route path="/shops" element={<ShopListPage />} />
        <Route path="/shop/:category/:shopId" element={<ProductPage />} />



      </Routes>

      <footer>
        <p>© {new Date().getFullYear()} Sloth — Shop At Your Own Pace</p>
      </footer>
    </Router>
  );
};

export default App;
