const express = require("express");
const router = express.Router();
const MovieSQL = require("../models/MovieSQL");
const authMiddleware = require("./middlewares/authMiddleware");

// Obtener todas las películas (SQL)
router.get("/", async (req, res) => {
  try {
    const movies = await MovieSQL.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las películas" });
  }
});

// Obtener película por ID (SQL)
router.get("/:id", async (req, res) => {
  try {
    const movie = await MovieSQL.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener película" });
  }
});

// Agregar película (SQL) (Protegido por autenticación)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const movie = await MovieSQL.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar película" });
  }
});

// Actualizar película (SQL) (Protegido por autenticación)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const [updated] = await MovieSQL.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    const movie = await MovieSQL.findByPk(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar película" });
  }
});

// Eliminar película (SQL) (Protegido por autenticación)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await MovieSQL.destroy({ where: { id: req.params.id } });
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar película" });
  }
});

module.exports = router;