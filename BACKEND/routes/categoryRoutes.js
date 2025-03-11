const express = require("express");
const router = express.Router();
const CategoryMongo = require("../models/CategoryMongo");

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const newCategory = new CategoryMongo(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
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

module.exports = router;
