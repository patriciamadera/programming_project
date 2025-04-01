import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        title: title,
        description: description,
        release_date: releaseDate,
        rating: rating,
        duration: duration,
        price: price,
        category: category,
        poster: image,
      };

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No se encontró el token de autenticación.");
      }

      const response = await fetch("http://localhost:5000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Movie added:", data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Agregar Nueva Película
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
                Calificación (0-5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
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
                Imagen URL
              </label>
              <input
                id="image"
                name="image"
                type="text"
                onChange={handleImageChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm sm:text-sm bg-gray-700"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar Película
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
