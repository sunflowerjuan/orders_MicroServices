import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.login({ username, password });
      // res is axios response
      if (res.status === 200) {
        const token = res.data?.token || res.data?.accessToken || null;
        if (!token) {
          setError("Respuesta del servidor no contiene token");
        } else {
          authService.setToken(token);
          navigate("/clients", { replace: true });
        }
      } else {
        setError(res.data?.message || "Credenciales inválidas");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Error de conexión con el servidor"
      );
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

      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Entrar"}
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
