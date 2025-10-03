import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-card">
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link to="/" className="btn primary">Volver al inicio</Link>
      </div>
    </div>
  );
}
