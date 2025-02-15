import PropTypes from "prop-types";

const Detail = ({ movie }) => {
    const handleBack = () => {
      window.history.back();
    };
  
    return (
      <section className="max-w-5xl mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Volver
        </button>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={movie.image} alt={movie.title} className="rounded-lg shadow-lg" />
          </div>
  
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="mt-4 text-gray-300">{movie.description}</p>
            <p className="mt-4">
              <span className="font-bold">Género:</span> {movie.genre}
            </p>
            <p>
              <span className="font-bold">Duración:</span> {movie.duration}
            </p>
            <p>
              <span className="font-bold">Clasificación:</span> {movie.rating}
            </p>
  
            <div className="mt-4 flex items-center space-x-1">
              <span className="text-yellow-400 text-xl">
                {"★".repeat(Math.floor(movie.score)) + "☆".repeat(5 - Math.floor(movie.score))}
              </span>
              <span className="text-gray-300">({movie.score} / 5)</span>
            </div>
  
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Comprar
              </button>
              <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
                Editar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

Detail.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default Detail;
