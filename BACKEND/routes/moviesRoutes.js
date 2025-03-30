const express = require("express");
const router = express.Router();
const MovieMongo = require("../models/MovieMongo");
const authMiddleware = require("./middlewares/authMiddleware");
const verificarToken = require("./middlewares/TokenVerification");
const { callOpenAIFunction } = require("../utils/openIAService");
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
      console.error("Error en /api/movies/description:", error);
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
      console.error("Error al obtener las películas:", error);
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
router.post("/", authMiddleware, async (req, res) => {
  try {
    const movie = new MovieMongo(req.body);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: `Error al agregar película: ${error.message}` });
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