const express = require("express");
const bcrypt = require("bcryptjs");
const generarToken = require('../utils/TokenGenerator'); // Importa generarToken
const verificarToken = require('../routes/middlewares/TokenVerification'); // Importa verificarToken
const { UserSQL, UserSQLModel } = require("../models/UserSQL");
require("dotenv").config();

const router = express.Router();

//  Registro de usuario (PostgreSQL)
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;

    try {
        const existingUser = await UserSQLModel.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const user = await UserSQLModel.create({ firstName, lastName, email, password, role, phoneNumber });

        res.status(201).json({ message: "Usuario registrado", user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

//  Inicio de sesión (PostgreSQL)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserSQLModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const isMatch = await UserSQL.prototype.comparePassword.call(user, password);
        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = generarToken(user); // Usa generarToken
        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el login" });
    }
});

//  Obtener datos del usuario autenticado (PostgreSQL)
router.get("/me", verificarToken, async (req, res) => { // Usa verificarToken
    try {
        const user = await UserSQLModel.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos del usuario" });
    }
});

module.exports = router;