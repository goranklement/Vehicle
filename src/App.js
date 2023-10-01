import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import NavbarLogoff from "./pages/NavbarLogoff";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from "react";
import { AuthContext } from "./components/AuthProvider";
import { useContext } from "react";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";

import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

import Navbar from "./pages/Navbar";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          {isAuthenticated ? (
            <React.Fragment>
              <Navbar />
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<Marketplace />} />
              </Routes>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavbarLogoff />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </React.Fragment>
          )}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
