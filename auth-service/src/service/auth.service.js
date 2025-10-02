/* auth.service.js
Este archivo contiene la lógica de negocio para la autenticación de usuarios.
*/

const User = require("../model/user.model");

// Función para crear un nuevo usuario
exports.createUser = async (username, password) => {
  const user = await User.create({ username, password });
  return user;
};

// Función para autenticar un usuario
exports.authUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) return null;

  if (user.password !== password) return null;
  return user;
};
