import React, { useState } from "react";
import customerService from "../services/customersService";
import logo from "../assets/logo.png";
import "./ClientsPage.css";

export default function ClientsPage() {
  const [tab, setTab] = useState("create");
  const [form, setForm] = useState({
    document: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
  });
  const [searchDoc, setSearchDoc] = useState("");
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const { data } = await customerService.createCustomer(form);
      setMessage("Cliente creado exitosamente");
      setCustomer(data);
    } catch (err) {
      setMessage("Error creando cliente: " + (err.response?.data?.message || err.message));
    }
  };

  const handleSearch = async () => {
    try {
      const { data } = await customerService.findCustomerById(searchDoc);
      setCustomer(data);
      setForm(data);
      setMessage("Cliente encontrado, ahora puedes actualizarlo");
    } catch (err) {
      setCustomer(null);
      setMessage("Cliente no encontrado");
    }
  };

  const handleUpdate = async () => {
    if (!customer) {
      setMessage("Debes buscar un cliente antes de actualizarlo");
      return;
    }
    try {
      const { data } = await customerService.updateCustomer(form);
      setMessage("Cliente actualizado correctamente");
      setCustomer(data);
    } catch (err) {
      setMessage("Error actualizando cliente: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="clients-page">
      <div className="card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="tabs">
          <button
            className={tab === "create" ? "tab active" : "tab"}
            onClick={() => setTab("create")}
          >
            Crear
          </button>
          <button
            className={tab === "search" ? "tab active" : "tab"}
            onClick={() => setTab("search")}
          >
            Buscar / Actualizar
          </button>
        </div>

        <div className="card-body">
          {tab === "create" ? (
            <>
              <h3>Registrar Nuevo Cliente</h3>
              <div className="form-grid">
                <input
                  type="text"
                  name="document"
                  placeholder="Documento"
                  value={form.document}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="firstname"
                  placeholder="Nombre"
                  value={form.firstname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Apellido"
                  value={form.lastname}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Dirección"
                  value={form.address}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={form.phone}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-buttons">
                <button onClick={handleCreate}>Crear Cliente</button>
              </div>
            </>
          ) : (
            <>
              <h3>Buscar Cliente</h3>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Documento"
                  value={searchDoc}
                  onChange={(e) => setSearchDoc(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
              </div>

              {customer && (
                <div className="customer-card">
                  <h4>Datos del Cliente</h4>
                  <div className="customer-info">
                    <p><strong>Documento:</strong> {customer.document}</p>
                    <p><strong>Nombre:</strong> {customer.firstname} {customer.lastname}</p>
                    <p><strong>Dirección:</strong> {customer.address}</p>
                    <p><strong>Teléfono:</strong> {customer.phone}</p>
                    <p><strong>Correo:</strong> {customer.email}</p>
                  </div>

                  <h4>Actualizar Datos</h4>
                  <div className="form-grid">
                    <input
                      type="text"
                      name="firstname"
                      placeholder="Nombre"
                      value={form.firstname}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      value={form.lastname}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Dirección"
                      value={form.address}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Teléfono"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Correo"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-buttons">
                    <button onClick={handleUpdate}>Actualizar Cliente</button>
                  </div>
                </div>
              )}
            </>
          )}

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}
