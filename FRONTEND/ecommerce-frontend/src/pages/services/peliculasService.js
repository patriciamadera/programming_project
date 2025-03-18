import apiClient from "./apiClient";

// Obtener todas las películas (MongoDB)
export const getMovies = async () => {
    try {
        const response = await apiClient.get("/api/movies");
        return response.data;
    } catch (error) {
        console.error("Error al obtener las películas:", error);
        return [];
    }
};

// Obtener una película por ID (MongoDB)
export const getMovieById = async (id) => {
    try {
        const response = await apiClient.get(`/api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la película:", error);
        return null;
    }
};

// Crear una película (MongoDB)
export const createMovie = async (movieData) => {
    try {
        const response = await apiClient.post("/api/movies", movieData); 
        return response.data;
    } catch (error) {
        console.error("Error al crear la película:", error);
        throw error;
    }
};

// Actualizar una película (MongoDB)
export const updateMovie = async (id, updatedMovie) => {
    try {
        const response = await apiClient.put(`/api/movies/${id}`, updatedMovie);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        throw error;
    }
};

// Eliminar una película (MongoDB)
export const deleteMovie = async (id) => {
    try {
        const response = await apiClient.delete(`/api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        throw error;
    }
};