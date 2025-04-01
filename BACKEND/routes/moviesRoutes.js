const express = require("express");
const router = express.Router();
const MovieMongo = require("../models/MovieMongo");
const authMiddleware = require("./middlewares/authMiddleware");
const verificarToken = require("./middlewares/TokenVerification");
const { callOpenAIFunction } = require("../utils/openIAService");
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const cors = require("cors");

router.use(cors({
  origin: "http://localhost:5173",
}));

// Endpoint para obtener la descripción de una película usando OpenAI
router.post("/description", async (req, res) => {
  const { movieTitle } = req.body;
  console.log("Solicitud recibida en /api/movies/description:", { movieTitle });

  const messages = [{ role: "user", content: `Dame una descripción de la película ${movieTitle}` }];

  try {
      const response = await callOpenAIFunction(messages);
      console.log("Respuesta de OpenAI:", response);

      res.json({ description: response.message });
  } catch (error) {
      res.status(500).json({ message: "Error al obtener la descripción." });
  }
});

// Obtener todas las películas (MongoDB)
router.get("/", verificarToken, async (req, res) => { 
  try {
      console.log("Solicitud GET /api/movies recibida");
      const movies = await MovieMongo.find().populate('category'); 
      console.log("Películas encontradas:", movies);
      res.json(movies);
  } catch (error) {
      res.status(500).json({ message: "Error al obtener las películas" });
  }
});

// Obtener película por ID (MongoDB)
router.get("/:id", async (req, res) => {
  try {
    const movie = await MovieMongo.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener película" });
  }
});

// Agregar película (MongoDB) (Protegido por autenticación)
router.post("/", [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('description').notEmpty().withMessage('La descripción es obligatoria'),
  body('release_date').isISO8601({ strict: true, strictSeparator: true }).toDate().withMessage('Fecha de lanzamiento inválida'),
  body('rating').isNumeric().withMessage('La calificación debe ser un número'),
  body('duration').isNumeric().withMessage('La duración debe ser un número'),
  body('price').isNumeric().withMessage('El precio debe ser un número'),
  body('category').notEmpty().withMessage('Categoría es obligatoria'),
  body('poster').optional().isURL().withMessage('El poster debe ser una url valida'),
], authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const { title, description, release_date, rating, duration, price, category, poster } = req.body;

      // Validar que la categoría exista y que sea un ObjectId válido
      if (!mongoose.Types.ObjectId.isValid(category)) {
          return res.status(400).json({ message: 'Categoría inválida.' });
      }

      const categoryExists = await mongoose.model('CategoryMongo').findById(category);

      if (!categoryExists) {
          return res.status(400).json({ message: 'La categoría especificada no existe.' });
      }

      // Convertir tipos de datos explícitamente
      const movie = new MovieMongo({
          title,
          description,
          release_date: new Date(release_date),
          rating: parseFloat(rating),
          duration: parseInt(duration),
          price: parseFloat(price),
          category: category, 
          poster,
      });

      const savedMovie = await movie.save();
      res.status(201).json(savedMovie);
  } catch (error) {
      res.status(400).json({ message: `Error al agregar película: ${error.message}`, error: error });
  }
});

// Actualizar película (MongoDB) (Protegido por autenticación)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await MovieMongo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar película" });
  }
});

// Eliminar película (MongoDB) (Protegido por autenticación)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const movie = await MovieMongo.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar película" });
  }
});

module.exports = router;