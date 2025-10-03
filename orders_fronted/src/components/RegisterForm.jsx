import React, { useState } from "react";
import authService from "../services/authService";

export default function RegisterForm({ onRegistered }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.register({ username, password });
      if (res.status === 201 || res.status === 200) {
        // registro OK
        onRegistered && onRegistered();
        alert("Usuario creado correctamente. Inicia sesión.");
        setUsername("");
        setPassword("");
      } else {
        setError(res.data?.message || "Error registrando usuario");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="input"
      />
      <input
        placeholder="Contraseña"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="input"
      />

      <button className="btn secondary" type="submit" disabled={loading}>
        {loading ? "Creando..." : "Registrarse"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
