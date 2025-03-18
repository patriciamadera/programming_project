const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbSQL');
const Category = require('./Category');

const CategorySQLModel = sequelize.define('CategorySQL', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING },
});

class CategorySQL extends Category {
  constructor(category) {
    super(category.id, category.name, category.description);
  }

  static async findById(id) {
    const category = await CategorySQLModel.findByPk(id);
    return category ? new CategorySQL(category) : null;
  }

  async save() {
    const category = await CategorySQLModel.upsert({
      id: this.id,
      name: this.name,
      description: this.description,
    });
    return new CategorySQL(category[0]);
  }

  async delete() {
    await CategorySQLModel.destroy({ where: { id: this.id } });
  }
}

CategorySQL.findAll = async function () {
  const categories = await CategorySQLModel.findAll();
  return categories.map((category) => new CategorySQL(category));
};

module.exports = CategorySQLModel;