const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  release_date: { type: Date, required: true },
  rating: { type: Number, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryMongo", required: true }, // Relación con Categoría
  poster: { type: String, required: false }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

