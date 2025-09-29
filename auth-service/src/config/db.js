/* src/config/db.js
Esta clase configura la conexión a la base de datos MySQL utilizando Sequelize.
*/

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "login_db",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "root",
  {
    host: process.env.DB_HOST || "mysql-db",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
