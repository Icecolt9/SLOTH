import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IndexPage from "./pages/IndexPage";
import ShopCategoryPage from "./pages/ShopCategoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpCustomer from "./pages/SignUpCustomer";
import SignUpShop from "./pages/SignUpShop";
import SignUpRider from "./pages/SignUpRider";
import RiderHome from "./pages/rider/RiderHome";
import ShopHome from "./pages/shop/ShopHome";
import ProductPage from "./pages/CustomerShopPage";
import ShopListPage from "./pages/shop/ShopListPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />

        <Route
          path="/home"
          element={<><Navbar /><Home /></>}
        />

        <Route
          path="/shops/:category"
          element={<><Navbar /><ShopCategoryPage /></>}
        />

        

        <Route
          path="/shop/:shopId"
          element={<><Navbar /><ProductPage /></>}
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup/customer" element={<SignUpCustomer />} />
        <Route path="/signup/shop" element={<SignUpShop />} />
        <Route path="/signup/rider" element={<SignUpRider />} />

        <Route path="/rider-home" element={<RiderHome />} />
        <Route path="/shop-home" element={<ShopHome />} />
        <Route path="/shops" element={<ShopListPage />} />
      </Routes>

      <footer>
        <p>© {new Date().getFullYear()} Sloth — Shop At Your Own Pace</p>
      </footer>
    </Router>
  );
};

export default App;
