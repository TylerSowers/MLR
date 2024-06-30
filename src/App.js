// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Calendar from "./components/calendar";
import Login from "./components/login";
import Consign from "./components/consign";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar />
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calendar" element={<Calendar token={token} />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/consign" element={<Consign />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
