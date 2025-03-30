const express = require("express");
const { callOpenAIFunction } = require("../utils/openIAService");

const router = express.Router();

// Obtener información de una película
router.get("/movie-info/:title", async (req, res) => {
    const { title } = req.params;
    const messages = [{ role: "user", content: `Dame una descripción de la película ${title}` }];
    const tools = [
        {
            type: "function",
            function: {
                name: "get_movie_info",
                parameters: {
                    type: "object",
                    properties: {
                        titulo: { type: "string", description: "El titulo de la pelicula." },
                        descripcion: { type: "string", description: "La descripcion de la pelicula." },
                        anio: { type: "number", description: "El año en que se estreno la pelicula." },
                        genero: { type: "string", description: "El género de la pelicula." },
                        director: { type: "string", description: "El nombre del director de la pelicula." },
                        reparto: { type: "array", description: "Lista de actores en la pelicula.", items: { type: "string", description: "Nombre de un actor." } }
                    },
                    required: ["titulo", "descripcion", "anio", "genero", "director", "reparto"],
                },
            },
        },
    ];

    try {
        const response = await callOpenAIFunction(messages, tools);

        if (response.toolCalls) {
            const toolCall = response.toolCalls[0];
            if (toolCall.function && toolCall.function.arguments) {
                const movieInfo = JSON.parse(toolCall.function.arguments);
                res.json({ message: `Título: ${movieInfo.titulo}, Descripción: ${movieInfo.descripcion}, Año: ${movieInfo.anio}, Género: ${movieInfo.genero}, Director: ${movieInfo.director}, Reparto: ${movieInfo.reparto.join(", ")}` });
            } else {
                res.json({ message: "No se pudo obtener la información de la película." });
            }
        } else if (response.message) {
            res.json({ message: response.message });
        } else {
            res.json({ message: "No se pudo obtener la información de la película." });
        }
    } catch (error) {
        console.error("Error en /movie-info/:title:", error);
        res.status(500).json({ message: "Error al obtener la información de la película." });
    }
});

// Buscar películas por género
router.get("/movies-by-genre/:genre/:year?/:rating?", async (req, res) => {
    const { genre, year, rating } = req.params;
    const messages = [{ role: "user", content: `Busca películas de género ${genre}, año ${year}, calificación ${rating}` }];
    const tools = [
        {
            type: "function",
            function: {
                name: "search_movies_by_genre",
                parameters: {
                    type: "object",
                    properties: {
                        genero: { type: "string", description: "El género de la película a buscar, por ejemplo, 'acción', 'comedia', etc." },
                        anio_lanzamiento: { type: "number", description: "Año en que se lanzó la película, opcional para filtrar resultados" },
                        calificacion: { type: "number", description: "Calificación mínima de la película, opcional para filtrar resultados" }
                    },
                    required: ["genero", "anio_lanzamiento", "calificacion"],
                },
            },
        },
    ];

    const response = await callOpenAIFunction(messages, tools);
    res.json(response);
});

// Obtener precio de una película
router.get("/movie-price/:title/:date", async (req, res) => {
    const { title, date } = req.params;
    const messages = [{ role: "user", content: `Consulta el precio de la película ${title} para la fecha ${date}` }];
    const tools = [
        {
            type: "function",
            function: {
                name: "get_movie_price",
                parameters: {
                    type: "object",
                    properties: {
                        titulo: { type: "string", description: "El título de la película" },
                        fecha: { type: "string", description: "La fecha para consultar disponibilidad (en formato AAAA-MM-DD)" }
                    },
                    required: ["titulo", "fecha"],
                },
            },
        },
    ];

    const response = await callOpenAIFunction(messages, tools);
    res.json(response);
});

module.exports = router;