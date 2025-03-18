class Category {
    constructor(id, name, description) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  
    // Métodos comunes
    getName() {
      return this.name;
    }
  
    getDescription() {
      return this.description;
    }
  
    update(name, description) {
      this.name = name;
      this.description = description;
    }
  }
  
  module.exports = Category;