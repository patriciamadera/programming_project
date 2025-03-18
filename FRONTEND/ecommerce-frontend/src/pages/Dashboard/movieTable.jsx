import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovies } from "../services/peliculasService";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="w-full border-collapse mt-4 text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-800">
          <tr>
            <th className="p-4 text-left">Título</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr
              key={movie.id}
              className="border-t hover:bg-gray-50 transition-all duration-200"
            >
              <td className="p-4">{movie.title}</td>
              <td className="p-4">
                <Link
                  to={`/dashboard/edit/${movie.id}`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
