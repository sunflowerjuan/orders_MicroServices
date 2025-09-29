/* auth.service.js
Este archivo contiene la lógica de negocio para la autenticación de usuarios.
*/

const User = require("../models/user.model");

// Función para crear un nuevo usuario
exports.createUser = async (customerid, password) => {
  const user = await User.create({ customerid, password });
  return user;
};

// Función para autenticar un usuario
exports.authUser = async (customerid, password) => {
  const user = await User.findOne({ where: { customerid } });
  if (!user) return null;

  if (user.password !== password) return null;
  return user;
};
