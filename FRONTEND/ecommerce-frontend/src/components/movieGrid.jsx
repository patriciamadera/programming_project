import { useState, useEffect } from "react";
import MovieCard from "./movieCard";
import Detail from "../pages/movieDetail";
import apiClient from "../pages/services/apiClient"; 
import defaultImage from "../assets/img/default-movie.jpg"; 

const MovieGrid = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                console.log("MovieGrid: Intentando obtener películas...");
                const response = await apiClient.get("/api/movies"); 

                console.log("MovieGrid: Respuesta de la API:", response);

                setMovies(response.data);
            } catch (err) {
                console.error("MovieGrid: Error al obtener películas:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    console.log("MovieGrid: loading:", loading, "error:", error, "selectedMovie:", selectedMovie);

    if (loading) return <p className="text-center text-lg">Cargando películas...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center">
            {selectedMovie ? (
                <Detail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />
            ) : (
                <>
                    <h1 className="text-4xl font-bold text-center my-8">Películas Destacadas</h1>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 w-full max-w-screen-xl mx-auto animate-fadeIn">
                        {movies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movie={{
                                    ...movie,
                                    poster: movie.poster ? movie.poster : defaultImage,
                                }}
                            />
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieGrid;