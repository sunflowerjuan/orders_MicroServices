import axios from "axios";

const BASE =
  process.env.REACT_APP_ORDER_API_URL || "http://obama.localhost/orders";

const instance = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const createOrder = (data) => instance.post("/createorder", data);
const updateOrderStatus = (orderID, status) =>
  instance.put(`/updateorderstatus?orderID=${orderID}&status=${status}`);
const findOrdersByCustomerId = (customerid) =>
  instance.get(`/findorderbycustomerid/${customerid}`);

export default { createOrder, updateOrderStatus, findOrdersByCustomerId };
