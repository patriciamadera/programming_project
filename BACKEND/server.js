const express = require("express");
const cors = require("cors");
const { mongoDB, connectSQL } = require("./config/db");
const categoryRoutes = require("./routes/categoryRoutes");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a bases de datos
mongoDB();

// Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/categories", require("./routes/categoryRoutes"));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
