import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movies/${movie.id}`} 
      className="relative bg-gray-700 text-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300"
    >
      {/* Imagen con overlay */}
      <div className="relative w-full h-72"> 
        <img
          src={movie.image || "/placeholder.jpg"}
          alt={movie.title}
          onError={(e) => (e.target.src = "/placeholder.jpg")}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 transition duration-300 hover:bg-opacity-10"></div>
      </div>

      {/* Título */}
      <h3 className="text-center p-4 text-xl font-semibold tracking-wide truncate">
        {movie.title || "Título desconocido"}
      </h3>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired, 
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default MovieCard;