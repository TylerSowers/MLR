import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import Consign from "./components/consign";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Navbar />
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/contact" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/" element={<Consign token={token} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
