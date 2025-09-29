/* src/model/user_model.js
Esta clase define el modelo de usuario para la base de datos utilizando Sequelize.

*/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  customerid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userCreated: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = User;
