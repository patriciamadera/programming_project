// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// 🔹 Registro de usuario
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "El usuario ya existe" });

    // Crear un nuevo usuario
    const user = new User({ firstName, lastName, email, password, role });
    await user.save();  // Guardar el usuario en la base de datos

    res.json({ message: "Usuario registrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// 🔹 Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el login" });
  }
});

module.exports = router;
