const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Nombre único de la categoría (Ej: Acción, Terror)
  description: { type: String, required: false }         // Descripción opcional
});

module.exports = mongoose.model("CategoryMongo", categorySchema);
