// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Login from "./components/login";
import Consign from "./components/consign";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar token={token} setToken={setToken} />
        <div className="App-content">
          <Routes>
            <Route path="/contact" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/" element={<Consign token={token} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
