import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        console.log("Petición HTTP:", config);
        return config;
    },
    (error) => {
        console.error("Error en la petición HTTP:", error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log("Respuesta HTTP:", response);
        console.log("Datos de la respuesta:", response.data);
        return response;
    },
    (error) => {
        console.error("Error en la respuesta HTTP:", error);
        return Promise.reject(error);
    }
);

export default apiClient;