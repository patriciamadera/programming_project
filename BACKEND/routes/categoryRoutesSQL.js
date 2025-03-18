const express = require("express");
const router = express.Router();
const CategorySQL = require("../models/CategorySQL");
const authMiddleware = require("./middlewares/authMiddleware");

// Crear categoría (Protegido por autenticación)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = await CategorySQL.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await CategorySQL.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const category = await CategorySQL.findByPk(req.params.id); // Cambiado a findByPk
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar categoría (Protegido por autenticación)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await CategorySQL.findByPk(req.params.id); // Cambiado a findByPk
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;
    await category.save(); // Añadido await
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar categoría (Protegido por autenticación)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await CategorySQL.findByPk(req.params.id); // Cambiado a findByPk
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    await category.destroy(); // Cambiado a destroy
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;