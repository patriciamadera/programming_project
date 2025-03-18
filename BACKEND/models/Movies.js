class Movie {
    constructor(id, title, description, release_date, rating, duration, price, categoryId, poster) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.release_date = release_date;
      this.rating = rating;
      this.duration = duration;
      this.price = price;
      this.categoryId = categoryId;
      this.poster = poster;
    }
  
    // Métodos comunes
    getTitle() {
      return this.title;
    }
  
    getPrice() {
      return this.price;
    }
  
    update(title, description, release_date, rating, duration, price, categoryId, poster) {
      this.title = title;
      this.description = description;
      this.release_date = release_date;
      this.rating = rating;
      this.duration = duration;
      this.price = price;
      this.categoryId = categoryId;
      this.poster = poster;
    }
  }
  
  module.exports = Movie;