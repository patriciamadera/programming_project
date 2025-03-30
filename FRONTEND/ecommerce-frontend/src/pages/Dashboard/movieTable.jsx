import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getMovies,
    deleteMovie,
} from "../services/peliculasService";

const MovieTable = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMovies().then((moviesData) => {
            setMovies(moviesData);
        });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar esta película?")) {
            await deleteMovie(id);
            setMovies(movies.filter((movie) => movie._id !== id));
        }
    };

    const getCategoryName = (movie) => {
        return movie.category ? movie.category.name : "N/A"; 
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full border-collapse mt-4 text-sm text-gray-700">
                <thead className="bg-gray-100 text-gray-800">
                    <tr>
                        <th className="p-4 text-left">Título</th>
                        <th className="p-4 text-left">Clasificación</th>
                        <th className="p-4 text-left">Fecha de Lanzamiento</th>
                        <th className="p-4 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr
                            key={movie._id}
                            className="border-t hover:bg-gray-50 transition-all duration-200"
                        >
                            <td className="p-4">{movie.title}</td>
                            <td className="p-4">{getCategoryName(movie)}</td>
                            <td className="p-4">{formatDate(movie.release_date)}</td>
                            <td className="p-4">
                                <Link
                                    to={`/dashboard/edit/${movie._id}`}
                                    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 mr-2"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => handleDelete(movie._id)}
                                    className="inline-block px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieTable;