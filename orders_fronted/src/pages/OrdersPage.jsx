import React, { useState } from "react";
import ordersService from "../services/ordersService";
import customerService from "../services/customersService";
import logo from "../assets/logo.png";
import "./OrdersPage.css";

export default function OrdersPage() {
  const [tab, setTab] = useState("create");
  const [customer, setCustomer] = useState(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    orderID: "",
    customerid: "",
    product: "",
    quantity: 1,
    price: "",
  });
  const [searchOrderID, setSearchOrderID] = useState("");
  const [order, setOrder] = useState(null);
  const [ordersList, setOrdersList] = useState([]);
  const [newStatus, setNewStatus] = useState("Received");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCustomerSearch = async () => {
    try {
      const { data } = await customerService.findCustomerById(form.customerid);
      setCustomer(data);
      setMessage("Cliente encontrado, puedes crear el pedido.");
    } catch {
      setCustomer(null);
      setMessage("Cliente no encontrado. No puedes crear pedido.");
    }
  };

  const handleCreateOrder = async () => {
    if (!customer) {
      setMessage("Primero busca un cliente válido.");
      return;
    }
    try {
      const { data } = await ordersService.createOrder(form);
      setMessage("Pedido creado exitosamente.");
      setOrder(data);
    } catch (err) {
      setMessage(
        "Error creando pedido: " + (err.response?.data?.detail || err.message)
      );
    }
  };

  const handleSearchOrder = async () => {
    try {
      const { data } = await ordersService.findOrdersByCustomerId(searchOrderID);
      setOrdersList(data);
      setMessage("Pedidos encontrados para el cliente.");
    } catch {
      setOrdersList([]);
      setMessage("No se encontraron pedidos para este cliente.");
    }
  };

  const handleUpdateStatus = async (orderID) => {
    try {
      const { data } = await ordersService.updateOrderStatus(orderID, newStatus);
      setMessage("Estado actualizado correctamente.");
      console.log(data);
    } catch (err) {
      setMessage(
        "Error actualizando estado: " +
          (err.response?.data?.detail || err.message)
      );
    }
  };

  return (
    <div className="orders-page">
      <div className="card">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        <div className="tabs">
          <button
            className={tab === "create" ? "tab active" : "tab"}
            onClick={() => setTab("create")}
          >
            Crear Pedido
          </button>
          <button
            className={tab === "update" ? "tab active" : "tab"}
            onClick={() => setTab("update")}
          >
            Modificar Estado
          </button>
          <button
            className={tab === "list" ? "tab active" : "tab"}
            onClick={() => setTab("list")}
          >
            Ver Pedidos por Cliente
          </button>
        </div>

        <div className="card-body">
          {/* === CREAR PEDIDO === */}
          {tab === "create" && (
            <>
              <h3>Crear Pedido</h3>

              <div className="form-grid">
                <input
                  type="text"
                  name="customerid"
                  placeholder="ID del Cliente"
                  value={form.customerid}
                  onChange={handleChange}
                />
                <button
                  className="btn-search"
                  onClick={handleCustomerSearch}
                >
                  Buscar Cliente
                </button>

                <input
                  type="text"
                  name="orderID"
                  placeholder="ID del Pedido"
                  value={form.orderID}
                  onChange={handleChange}
                  disabled={!customer}
                />
                <input
                  type="text"
                  name="product"
                  placeholder="Producto"
                  value={form.product}
                  onChange={handleChange}
                  disabled={!customer}
                />
                <input
                  type="number"
                  name="quantity"
                  placeholder="Cantidad"
                  value={form.quantity}
                  onChange={handleChange}
                  disabled={!customer}
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={form.price}
                  onChange={handleChange}
                  disabled={!customer}
                />
              </div>

              {/* Info del cliente */}
              {customer && (
                <div className="customer-summary">
                  <h4>Cliente Encontrado</h4>
                  <p><strong>Nombre:</strong> {customer.firstname} {customer.lastname}</p>
                  <p><strong>Dirección:</strong> {customer.address}</p>
                  <p><strong>Correo:</strong> {customer.email}</p>
                </div>
              )}

              <div className="form-buttons">
                <button onClick={handleCreateOrder} disabled={!customer}>
                  Crear Pedido
                </button>
              </div>
            </>
          )}

          {/* === MODIFICAR ESTADO === */}
          {tab === "update" && (
            <>
              <h3>Actualizar Estado del Pedido</h3>
              <input
                type="text"
                placeholder="ID del Pedido"
                value={searchOrderID}
                onChange={(e) => setSearchOrderID(e.target.value)}
              />
              <div className="status-section">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className={`status-select ${newStatus.toLowerCase()}`}
                >
                  <option value="Received">Received</option>
                  <option value="In progress">In progress</option>
                  <option value="Sended">Sended</option>
                </select>
                <button onClick={() => handleUpdateStatus(searchOrderID)}>
                  Actualizar Estado
                </button>
              </div>
            </>
          )}

          {/* === LISTAR PEDIDOS === */}
          {tab === "list" && (
            <>
              <h3>Buscar Pedidos por Cliente</h3>
              <input
                type="text"
                placeholder="ID del Cliente"
                value={searchOrderID}
                onChange={(e) => setSearchOrderID(e.target.value)}
              />
              <button onClick={handleSearchOrder}>Buscar</button>

              {ordersList.length > 0 && (
                <div className="orders-list">
                  {ordersList.map((o) => (
                    <div key={o.orderID} className="order-card">
                      <p><strong>ID Pedido:</strong> {o.orderID}</p>
                      <p><strong>Producto:</strong> {o.product}</p>
                      <p><strong>Cantidad:</strong> {o.quantity}</p>
                      <p><strong>Precio:</strong> ${o.price}</p>
                      <p className={`status ${o.status.toLowerCase()}`}>
                        <strong>Estado:</strong> {o.status}
                      </p>
                    </div>
                  ))}
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
