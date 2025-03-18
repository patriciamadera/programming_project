const express = require("express");
const bcrypt = require("bcryptjs");
const generarToken = require('../utils/TokenGenerator');
const verificarToken = require('../routes/middlewares/TokenVerification');
const UserModel = require("../models/UserMongo").UserModel; 
require("dotenv").config();

const router = express.Router();


// Registro de usuario
router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email }); 
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const user = new UserModel({ firstName, lastName, email, password, role, phoneNumber });
        await user.save();

        res.status(201).json({
            message: "Usuario registrado",
            user: { _id: user._id, email: user.email, role: user.role },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });
    }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Email recibido:", email);
        console.log("Contraseña recibida:", password);

        const user = await UserModel.findOne({ email }); 
        if (!user) {
            console.log("Usuario no encontrado para el email:", email);
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        console.log("Contraseña hasheada:", user.password);

        const isMatch = await bcrypt.compare(password, user.password); 

        console.log("Resultado de bcrypt.compare:", isMatch);

        if (!isMatch) {
            console.log("Contraseña incorrecta para el email:", email);
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = generarToken(user);
        res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el login" });
    }
});

// Obtener datos del usuario autenticado
router.get("/me", verificarToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password"); 
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener datos del usuario" });
    }
});

//Logout
router.post("/logout", async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const blacklistToken = new BlacklistToken({ token });
      await blacklistToken.save();
      res.json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).json({ message: "Error al cerrar sesión" });
    }
  });

module.exports = router;