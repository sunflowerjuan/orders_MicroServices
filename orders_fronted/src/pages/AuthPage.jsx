import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import logo from "../assets/logo.png";
import "./AuthPage.css";

export default function AuthPage() {
  const [tab, setTab] = useState("login");

  return (
    <div className="auth-page">
      <div className="card">
        {/* Logo arriba */}
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={tab === "login" ? "tab active" : "tab"}
            onClick={() => setTab("login")}
          >
            Iniciar sesión
          </button>
          <button
            className={tab === "register" ? "tab active" : "tab"}
            onClick={() => setTab("register")}
          >
            Registrarse
          </button>
        </div>

        {/* Contenido */}
        <div className="card-body">
          {tab === "login" ? (
            <LoginForm />
          ) : (
            <RegisterForm onRegistered={() => setTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
