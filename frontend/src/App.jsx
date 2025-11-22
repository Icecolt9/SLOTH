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
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Index / Auth page: no navbar */}
        <Route path="/index" element={<IndexPage />} />

        {/* Pages with navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/clothing" element={<><Navbar /><Clothing /></>} />
        <Route path="/cosmetics" element={<><Navbar /><Cosmetics /></>} />
        <Route path="/food" element={<><Navbar /><Food /></>} />
        <Route path="/accessories" element={<><Navbar /><Accessories /></>} />
        <Route path="/technology" element={<><Navbar /><Technology /></>} />
      </Routes>

      <footer>
        <p>© {new Date().getFullYear()} Sloth — Shop At Your Own Pace</p>
      </footer>
    </Router>
  );
};

export default App;
