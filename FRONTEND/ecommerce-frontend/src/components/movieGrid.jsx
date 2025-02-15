import { useState } from 'react';
import avatar from '../assets/img/avatar2.jpg';
import batman from '../assets/img/batman-vs-superman.webp';
import mufasa from '../assets/img/mufasa.png';
import spiderman from '../assets/img/spiderman1.jpg';
import moana from '../assets/img/moana.jpg';
import dexter from '../assets/img/dextere.jpg';
import madMax from '../assets/img/mad-max.jpg';
import Detalle from '../components/movieDetail';

const movies = [
    { id: 1, title: "Avatar", image: avatar },
    { id: 2, title: "Mufasa", image: mufasa },
    { id: 3, title: "Spiderman", image: spiderman },
    { id: 4, title: "Moana 2", image: moana },
    { id: 5, title: "Dexter", image: dexter },
    { id: 6, title: "Batman vs Superman", image: batman },
    { id: 7, title: "Mad Max Fury Road", image: madMax },
    { id: 8, title: "Captain America", image: avatar },
  ];

  const MovieGrid = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    return (
      <div className="flex flex-col items-center">
        {selectedMovie ? (
          // Muestra la película en detalle
          <Detalle movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
        ) : (
          // Muestra la grilla de películas
          <>
            <h1 className="text-4xl font-bold text-center my-8">Películas Destacadas</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 w-full max-w-screen-xl mx-auto">
              {movies.map((movie) => (
                <div key={movie.id} className="bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
                  <img src={movie.image} alt={movie.title} className="w-full h-56 object-cover" />
                  <h3 className="text-center p-4 text-xl">{movie.title}</h3>
                  <button 
                    onClick={() => setSelectedMovie(movie)} 
                    className="block mx-auto mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Ver más
                  </button>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    );
  };

export default MovieGrid;
