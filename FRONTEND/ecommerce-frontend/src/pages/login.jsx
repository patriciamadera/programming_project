import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Peliculas from "../assets/img/peliculas.jpeg";
import { loginUser } from "../pages/services/authServices";

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value.trim(),
    };
};

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [formData, dispatch] = useReducer(formReducer, {
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [authError, setAuthError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLoggedIn");
        if (storedLogin === "true") {
            navigate("/home", { replace: true });
        }
    }, [navigate]); // Array de dependencias con 'navigate'

    const validateField = (name, value) => {
        let errorMessage = "";
        if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = "Ingrese un correo válido.";
        }
        if (name === "password" && value.length < 6) {
            errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    };

    const handleChange = (e) => {
        dispatch({
            name: e.target.name,
            value: e.target.value,
        });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAuthError(null);
        setSuccessMessage(null);
        setErrors({ email: "", password: "" });

        validateField("email", formData.email);
        validateField("password", formData.password);

        const hasErrors = Object.values(errors).some((err) => err);
        const hasEmptyFields = Object.values(formData).some((val) => !val);

        if (hasErrors || hasEmptyFields) {
            alert("Por favor, corrige los errores antes de continuar.");
            return;
        }

        setIsLoading(true);
        console.log("Datos del formulario:", formData);

        try {
            const response = await loginUser(formData);
            console.log("Respuesta del servidor:", response);
            if (response && response.token) {
                localStorage.setItem("token", response.token);
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                navigate("/home", { replace: true });
            } else {
                setAuthError("Token no recibido del servidor.");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            setAuthError(
                error.response?.data?.error ||
                "Error en la autenticación. Por favor, verifica tus credenciales."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${Peliculas})` }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Iniciar sesión</h2>
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {authError && <p className="text-red-500 mb-4">{authError}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-semibold">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-semibold">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className={`w-full mt-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                    </button>
                </form>
                <p className="mt-4 text-gray-500 text-center">
                    ¿No tienes cuenta?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-500 hover:underline"
                    >
                        Regístrate
                    </button>
                </p>
            </div>
        </div>
    );
};

Login.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;