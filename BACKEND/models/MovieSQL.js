//const { DataTypes } = require("sequelize");
//const { sequelize } = require("../config/db");
//const CategorySQL = require("./CategorySQL");

//const MovieSQL = sequelize.define("MovieSQL", {
  //title: { type: DataTypes.STRING, allowNull: false },
  //description: { type: DataTypes.TEXT, allowNull: false },
  //price: { type: DataTypes.FLOAT, allowNull: false },
  //release_date: { type: DataTypes.DATE, allowNull: false },
  //rating: { type: DataTypes.FLOAT, allowNull: false },
  //duration: { type: DataTypes.INTEGER, allowNull: false },
  //categoryId: { 
    //type: DataTypes.INTEGER, 
    //allowNull: false, 
    //references: { model: CategorySQL, key: "id" } // Relación con Categoría
  //},
  //poster: { type: DataTypes.STRING, allowNull: true }
//});

//sequelize.sync();
//module.exports = MovieSQL;
