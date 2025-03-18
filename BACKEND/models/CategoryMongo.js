const mongoose = require('mongoose');
const Category = require('./Category');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { collection: 'categorymongos' });

class CategoryMongo extends Category {
  constructor(category) {
    super(category._id, category.name, category.description);
  }

  static async findById(id) {
    const category = await mongoose.model('Category', CategorySchema).findById(id);
    return category ? new CategoryMongo(category) : null;
  }

  async save() {
    const category = await mongoose.model('Category', CategorySchema).findByIdAndUpdate(
      this.id,
      { name: this.name, description: this.description },
      { new: true, upsert: true }
    );
    return new CategoryMongo(category);
  }

  async delete() {
    await mongoose.model('Category', CategorySchema).findByIdAndDelete(this.id);
  }
}

CategoryMongo.find = async function () {
  const categories = await mongoose.model('Category', CategorySchema).find();
  return categories.map((category) => new CategoryMongo(category));
};

module.exports = mongoose.model('CategoryMongo', CategorySchema); 