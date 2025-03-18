const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/auth");
const authSQLRoutes = require("./routes/authSQL"); 
const movieRoutes = require("./routes/moviesRoutes");
const movieSQLRoutes = require("./routes/moviesRoutesSQL"); 
const categoryRoutes = require("./routes/categoryRoutes");
const categorySQLRoutes = require("./routes/categoryRoutesSQL"); 

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Sequelize para PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Conectar a bases de datos
connectDB(); // Conecta a MongoDB

// Sincronizar modelos de Sequelize
sequelize
  .sync()
  .then(() => {
    console.log("Tablas creadas en la base de datos PostgreSQL");
  })
  .catch((error) => {
    console.error("Error al crear las tablas:", error);
  });

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/auth/sql", authSQLRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/movies/sql", movieSQLRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/categories/sql", categorySQLRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

