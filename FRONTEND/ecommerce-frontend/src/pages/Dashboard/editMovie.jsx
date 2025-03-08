import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, updateMovie } from "../services/peliculasService";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    getMovieById(id).then((movie) => setTitle(movie.title));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateMovie(id, { title });
    navigate("/dashboard");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Editar Película</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 ml-2">Actualizar</button>
      </form>
    </div>
  );
};

export default EditMovie;
