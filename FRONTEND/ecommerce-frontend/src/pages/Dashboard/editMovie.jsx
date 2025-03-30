import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieById,
  updateMovie,
  getCategories,
} from "../services/peliculasService";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movie = await getMovieById(id);
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseDate(movie.release_date);
        setRating(movie.rating);
        setDuration(movie.duration);
        setPrice(movie.price);
        setCategory(movie.category._id); // Establecer el ID de la categoría
        // setImage(movie.poster); // Si deseas mostrar la imagen actual (requiere manejo especial)

        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching movie or categories:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("release_date", releaseDate);
      formData.append("rating", rating);
      formData.append("duration", duration);
      formData.append("price", price);
      formData.append("category", category);
      if (image) {
        formData.append("poster", image);
      }

      await updateMovie(id, formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Editar Película
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="releaseDate"
                className="block text-sm font-medium text-gray-300"
              >
                Fecha de Lanzamiento
              </label>
              <input
                id="releaseDate"
                name="releaseDate"
                type="date"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-300"
              >
                Calificación (0-10)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="10"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                placeholder="Calificación"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-300"
              >
                Duración (minutos)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                placeholder="Duración"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-300"
              >
                Precio
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300"
              >
                Categoría
              </label>
              <select
                id="category"
                name="category"
                autoComplete="category"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-300"
              >
                Imagen
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Actualizar Película
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
