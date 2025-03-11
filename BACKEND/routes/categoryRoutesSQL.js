const express = require("express");
const router = express.Router();
const CategorySQL = require("../models/CategorySQL");

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const newCategory = await CategorySQL.create(req.body);
    res.status(201).json(newCategory);
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

module.exports = router;
