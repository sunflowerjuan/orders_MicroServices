/* auth.routes.js
Este archivo define las rutas relacionadas con la autenticación de usuarios.
*/

const express = require("express");
const router = express.Router();
const { createUser, authUser, hello } = require("./auth.controller");

router.post("/createuser", createUser);
router.post("/authuser", authUser);
router.get("/hello", hello);

module.exports = router;
