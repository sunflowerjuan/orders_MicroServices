import React from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function Navbar() {
  const token = authService.getToken();
  const navigate = useNavigate();

  const logout = () => {
    authService.removeToken();
    navigate("/auth", { replace: true });
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate("/clients");
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <a href="/" onClick={handleBrandClick} className="brand">
          Orders App
        </a>

        <div className="nav-links">
          {token ? (
            <>
              <Link to="/clients" className="nav-link">Clients</Link>
              <Link to="/orders" className="nav-link">Orders</Link>
              <button className="btn-ghost" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/auth" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
