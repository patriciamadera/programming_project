const mongoose = require('mongoose');
const Movie = require('./Movies'); 

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    release_date: { type: Date, required: true },
    rating: { type: Number, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryMongo', required: true },
    poster: { type: String, required: false },
}, { collection: 'moviemongos' });

const MovieMongo = mongoose.model('Movie', MovieSchema);

module.exports = MovieMongo;