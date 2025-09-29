/* auth.controller.js
Este archivo maneja las solicitudes HTTP relacionadas con la autenticación de usuarios.
*/

const authService = require("../service/auth.service");

exports.createUser = async (req, res) => {
  const { customerid, password } = req.body;
  try {
    const user = await authService.createUser(customerid, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
};

exports.authUser = async (req, res) => {
  const { customerid, password } = req.body;
  try {
    const user = await authService.authUser(customerid, password);
    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });
    res.json({ message: "Usuario autenticado", user });
  } catch (error) {
    res.status(500).json({ message: "Error autenticando usuario", error });
  }
};
