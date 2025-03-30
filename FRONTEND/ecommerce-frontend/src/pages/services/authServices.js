import apiClient from "./apiClient";

// 🔹 Función para obtener el usuario actual
export const getCurrentUser = async () => {
  try {
      const token = localStorage.getItem("token");
      console.log("Token obtenido de localStorage:", token); // Log del token

      if (!token) {
          console.log("No se encontró token en localStorage.");
          return null;
      }

      console.log("Enviando solicitud a /api/auth/me..."); // Log de la solicitud
      const response = await apiClient.get("api/auth/me", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      console.log("Respuesta del backend:", response.data); // Log de la respuesta
      return response.data;
  } catch (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
  }
};

// 🔹 Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post("api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

// 🔹 Función para iniciar sesión
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("api/auth/login", userData);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error; // Lanza el error para que el componente lo maneje
  }
};

// 🔹 Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await apiClient.post("api/auth/logout");
    localStorage.removeItem("token"); // Elimina el token al cerrar sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};