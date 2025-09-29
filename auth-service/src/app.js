/* Archivo principal de la aplicación */

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/db");
const authRoutes = require("./controller/auth.routes");

const app = express();
app.use(bodyParser.json());

// Rutas
app.use("/", authRoutes);

// Sincronizar con DB
sequelize
  .sync()
  .then(() => console.log("Base de datos sincronizada"))
  .catch((err) => console.error("Error conectando a DB", err));
module.exports = app;
