import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../pages/services/apiClient";
import defaultImage from "../assets/img/default-movie.jpg";

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState('');
    const [categoryName, setCategoryName] = useState('No especificado'); // Nuevo estado

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await apiClient.get(`/api/movies/${id}`);
                setMovie(response.data);
                if (response.data.category) {
                    fetchCategoryName(response.data.category); // Obtener el nombre de la categoría
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id]);

    const fetchCategoryName = async (categoryId) => {
        try {
            const response = await apiClient.get(`/api/categories/${categoryId}`);
            setCategoryName(response.data.name);
        } catch (err) {
            console.error("Error fetching category name:", err);
        }
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

    if (loading) return <p className="text-center text-lg text-white mt-10">Cargando película...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    const handleBack = () => navigate(-1);
    const toggleFavorite = () => setIsFavorite(!isFavorite);
    const handlePurchaseClick = () => setShowPurchaseModal(true);
    const confirmPurchase = () => {
        setPurchaseMessage(`¡Compra de "${movie.title}" realizada con éxito!`);
        setShowPurchaseModal(false);
    };

    if (!movie) return null;

    const { poster, title, description, duration, rating, release_date, price } = movie;

    return (
        <div className="bg-black min-h-screen flex justify-center items-center px-4">
            <section className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={handleBack}
                    className="absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    ← Volver
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                    <div>
                        <img
                            src={poster ? poster : defaultImage}
                            alt={title}
                            className="rounded-lg shadow-lg w-full object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-white">{title}</h1>
                        <p className="mt-4 text-gray-300">{description}</p>

                        <div className="mt-2 flex items-center space-x-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 ${index < Math.round(rating) ? "fill-current" : "stroke-current"}`}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill={index < Math.round(rating) ? "currentColor" : "none"}
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <p className="mt-4 text-white">
                            <span className="font-bold text-gray-200">Categoría:</span> {categoryName}
                        </p>
                        <p className="mt-4 text-white">
                            <span className="font-bold text-gray-200">Duración:</span> {duration || "No disponible"} <span className="text-gray-200">minutos</span>
                        </p>
                        <p className="mt-4 text-white">
                            <span className="font-bold text-gray-200">Fecha de Lanzamiento:</span> {formatDate(release_date) || "No especificado"}
                        </p>
                        <p className="mt-4 text-white">
                            <span className="font-bold text-gray-200">Precio:</span> ${price || "No disponible"} <span className="text-gray-200">dólares</span>
                        </p>

                        <div className="mt-6 flex flex-wrap gap-4">
                            <button
                                onClick={handlePurchaseClick}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Comprar
                            </button>
                            <button
                                onClick={toggleFavorite}
                                className={`px-6 py-3 rounded-lg transition ${
                                    isFavorite ? "bg-yellow-500 text-white" : "bg-gray-600 text-gray-200 hover:bg-yellow-500"
                                }`}
                            >
                                {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
                            </button>
                        </div>
                    </div>
                </div>

                {showPurchaseModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-white mb-4">Confirmar Compra</h2>
                            <p className="text-white">¿Desea comprar &quot;{title}&quot; por ${price} dólares?</p>
                            <div className="mt-4 flex justify-end gap-4">
                                <button
                                    onClick={() => setShowPurchaseModal(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmPurchase}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {purchaseMessage && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <p className="text-white">{purchaseMessage}</p>
                            <button
                                onClick={() => setPurchaseMessage('')}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Detail;