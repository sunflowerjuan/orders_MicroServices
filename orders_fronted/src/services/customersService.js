import axios from "axios";

const BASE =
  process.env.REACT_APP_CUSTOMER_API_URL || "http://obama.localhost/customers";

const instance = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Middleware para token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Endpoints
const createCustomer = (data) => instance.post("/createcustomer", data);
const updateCustomer = (data) => instance.put("/updatecustomer", data);
const findCustomerById = (document) =>
  instance.get(`/findcustomerbyid/${document}`);

export default { createCustomer, updateCustomer, findCustomerById };
