require("dotenv").config(); // Cargar variables de entorno
const mongoose = require("mongoose");

// Conexión a MongoDB
const mongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("📌 Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error en MongoDB:", error);
  }
};





module.exports = { mongoDB};
