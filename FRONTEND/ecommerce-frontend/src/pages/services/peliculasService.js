const apiUrl = 'http://localhost:3000/movies';

// Obtener todas las películas
export const getMovies = async () => {
  try {
    const response = await fetch(apiUrl);
    const peliculas = await response.json();
    return peliculas;
  } catch (error) {
    console.error('Error al obtener las películas:', error);
    return [];
  }
};

// Obtener una película por ID
export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    const pelicula = await response.json();
    return pelicula;
  } catch (error) {
    console.error('Error al obtener la película:', error);
    return null;
  }
};

// Actualizar una película
export const updateMovie = async (id, updatedMovie) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',  // Método para actualizar
      headers: {
        'Content-Type': 'application/json',  // Asegura que el cuerpo de la solicitud esté en formato JSON
      },
      body: JSON.stringify(updatedMovie),  // Convierte los datos a JSON
    });
    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      console.error('Error al actualizar la película:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error al actualizar la película:', error);
    return null;
  }
};
