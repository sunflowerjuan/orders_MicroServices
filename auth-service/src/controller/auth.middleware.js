const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.KEY;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token requerido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token expirado o inválido" });
  }
};
