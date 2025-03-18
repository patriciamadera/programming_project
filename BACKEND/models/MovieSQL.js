const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const Movie = require('./Movies');
const CategorySQL = require('./CategorySQL');

const MovieSQLModel = sequelize.define('MovieSQL', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  release_date: { type: DataTypes.DATE, allowNull: false },
  rating: { type: DataTypes.DECIMAL(3, 1), allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: CategorySQL, key: 'id' } },
  poster: { type: DataTypes.STRING, allowNull: true },
});

class MovieSQL extends Movie {
  constructor(movie) {
    super(
      movie.id,
      movie.title,
      movie.description,
      movie.release_date,
      movie.rating,
      movie.duration,
      movie.price,
      movie.categoryId,
      movie.poster
    );
  }

  static async findById(id) {
    const movie = await MovieSQLModel.findByPk(id, { include: CategorySQL });
    return movie ? new MovieSQL(movie) : null;
  }

  async save() {
    const movie = await MovieSQLModel.upsert({
      id: this.id,
      title: this.title,
      description: this.description,
      release_date: this.release_date,
      rating: this.rating,
      duration: this.duration,
      price: this.price,
      categoryId: this.categoryId,
      poster: this.poster,
    });
    return new MovieSQL(movie);
  }

  async delete() {
    await MovieSQLModel.destroy({ where: { id: this.id } });
  }
}

MovieSQL.findAll = async function () {
  const movies = await MovieSQLModel.findAll({ include: CategorySQL });
  return movies.map((movie) => new MovieSQL(movie));
};

module.exports = MovieSQL;