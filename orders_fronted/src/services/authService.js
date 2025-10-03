import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://obama.localhost/login";

const instance = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

const login = (payload) => instance.post("/authuser", payload);
const register = (payload) => instance.post("/createuser", payload);

const setToken = (token) => localStorage.setItem("token", token);
const getToken = () => localStorage.getItem("token");
const removeToken = () => localStorage.removeItem("token");

export default { login, register, setToken, getToken, removeToken };
