const express = require("express");
const router = express.Router();
const CategoryMongo = require("../models/CategoryMongo");
const authMiddleware = require("./middlewares/authMiddleware");

// Crear categoría (Protegido por autenticación)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = new CategoryMongo(req.body);
    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await CategoryMongo.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const category = await CategoryMongo.findById(req.params.id);
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
    const category = await CategoryMongo.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    category.name = req.body.name || category.name;
    category.description = req.body.description || category.description;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar categoría (Protegido por autenticación)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await CategoryMongo.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }
    await category.delete();
    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;