const authService = require("../service/auth.service");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.KEY;

// Crear usuario
exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
};

// Autenticar usuario
exports.authUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await authService.authUser(username, password);
    if (!user)
      return res.status(401).json({ message: "Credenciales inválidas" });

    // Generar token JWT con username
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      message: "Usuario autenticado",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error autenticando usuario", error });
  }
};

// test
exports.hello = async (req, res) => {
  res.json({ message: "HOLA QUE MAS" });
};
