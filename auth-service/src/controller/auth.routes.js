/* auth.routes.js
Este archivo define las rutas relacionadas con la autenticación de usuarios.
*/

const express = require("express");
const router = express.Router();
const { createUser, authUser } = require("./controllers/auth_controller");

router.post("/createuser", createUser);
router.post("/authuser", authUser);

module.exports = router;
