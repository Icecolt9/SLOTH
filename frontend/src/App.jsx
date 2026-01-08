import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IndexPage from "./pages/IndexPage";
//import Clothing from "./pages/Clothing";
//import Cosmetics from "./pages/Cosmetics";
//import Food from "./pages/Food";
//import Accessories from "./pages/Accessories";
//import Technology from "./pages/Technology";
import ShopCategoryPage from "./Pages/ShopCategoryPage";
import "./index.css";

//Auth
import LoginPage from "./pages/LoginPage";
import SignUpCustomer from "./pages/SignUpCustomer";
import SignUpShop from "./pages/SignUpShop";
import SignUpRider from "./pages/SignUpRider";


import RiderHome from "./pages/rider/RiderHome";
import ShopHome from "./pages/shop/ShopHome";
import ProductPage from "./pages/shop/ProductPage";
import ShopListPage from "./pages/shop/ShopListPage";


const App = () => {
  return (
    <Router>
      <Routes>

        
        <Route path="/" element={<IndexPage />} />
        <Route path="home" element={<><Navbar /><Home /></>} />
        
        <Route path="/shops/:category" element={<ShopCategoryPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/customer" element={<SignUpCustomer />} />
        <Route path="/signup/shop" element={<SignUpShop />} />
        <Route path="/signup/rider" element={<SignUpRider />} />

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
