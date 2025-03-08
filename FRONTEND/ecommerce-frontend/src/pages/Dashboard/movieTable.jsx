import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovies} from "../services/peliculasService";

const MovieTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then(setMovies);
  }, []);

  return (
    <table className="w-full border-collapse mt-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Título</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id} className="border-t">
            <td className="p-2">{movie.title}</td>
            <td className="p-2">
              <Link to={`/dashboard/edit/${movie.id}`} className="text-blue-500 mr-2">Editar</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieTable;
