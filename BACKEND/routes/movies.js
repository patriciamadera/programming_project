const express = require("express");
const MovieMongo = require("../models/MovieMongo");
const MovieSQL = require("../models/MovieSQL");

const router = express.Router();

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();  // Esto obtiene todas las películas
    res.json(movies);  // Devuelve las películas en formato JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las películas' });
  }
});

//POST
router.post("/mongo", async (req, res) => {
  const { title, description, release_date, rating, duration, price, category, poster } = req.body;

  // Validación de campos
  if (!title || !description || !release_date || !rating || !duration || !price || !category) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const movie = new MovieMongo(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar película" });
  }
});

router.post("/mongo", async (req, res) => {
  try {
    const movie = new MovieMongo(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    console.error(error);  // Imprimir error para depuración
    res.status(400).json({ message: `Error al agregar película: ${error.message}` });
  }
});


// Obtener película por ID en MongoDB
router.get("/mongo/:id", async (req, res) => {
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

// Obtener película por ID en SQL
router.get("/sql/:id", async (req, res) => {
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

// Agregar película en MongoDB
router.post("/mongo", async (req, res) => {
  try {
    const movie = new MovieMongo(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar película" });
  }
});

// Agregar película en SQL
router.post("/sql", async (req, res) => {
  try {
    const movie = await MovieSQL.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: "Error al agregar película" });
  }
});

// Actualizar película en MongoDB
router.put("/mongo/:id", async (req, res) => {
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

// Actualizar película en SQL
router.put("/sql/:id", async (req, res) => {
  try {
    const [updated] = await MovieSQL.update(req.body, {
      where: { id: req.params.id }
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

// Eliminar película en MongoDB
router.delete("/mongo/:id", async (req, res) => {
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

// Eliminar película en SQL
router.delete("/sql/:id", async (req, res) => {
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
