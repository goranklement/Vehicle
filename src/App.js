import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Marketplace from "./components/Marketplace";
import Login from "./components/Login";
import Register from "./components/Register";
import React from "react";

import "primeicons/primeicons.css";

import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </React.Fragment>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
