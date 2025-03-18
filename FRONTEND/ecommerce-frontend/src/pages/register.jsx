import { useState } from "react";
import PropTypes from "prop-types";
import { registerUser } from "./services/authServices";
import { useNavigate } from "react-router-dom";
import Peliculas from "../assets/img/peliculas.jpeg";

const Register = ({ setIsRegistered }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const validateField = (name, value) => {
        let errorMessage = "";
        if (name === "name" && value.trim().length < 3) {
            errorMessage = "El nombre debe tener al menos 3 caracteres.";
        } else if (name === "lastName" && value.trim().length < 3) {
            errorMessage = "El apellido debe tener al menos 3 caracteres.";
        } else if (name === "phoneNumber" && !/^\d{10}$/.test(value)) {
            errorMessage = "Ingrese un número de teléfono válido (10 dígitos).";
        } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = "Ingrese un correo válido.";
        } else if (name === "password" && value.length < 6) {
            errorMessage = "La contraseña debe tener al menos 6 caracteres.";
        }
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
        setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    };

    const handleBlur = (e) => {
        validateField(e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);
        setErrors({
            name: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
        });

        Object.keys(formData).forEach((name) => validateField(name, formData[name]));

        const hasErrors = Object.values(errors).some((err) => err);
        const hasEmptyFields = Object.values(formData).some((val) => !val);

        if (hasErrors || hasEmptyFields) {
            alert("Por favor, corrige los errores antes de continuar.");
            return;
        }

        try {
            const userData = {
                firstName: formData.name,
                lastName: formData.lastName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
            };

            await registerUser(userData);
            setSuccessMessage("Usuario registrado con éxito.");
            setIsRegistered(true);
            navigate("/login");
        } catch (err) {
            console.error("Error al registrar usuario:", err);
            setError(err.response?.data?.error || "Error al registrar usuario.");
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${Peliculas})` }}
        >
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Registrarse</h2>
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-2"> {/* Contenedor flex para nombre y apellidos */}
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm font-semibold">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-600 text-sm font-semibold">Apellidos</label>
                            <input
                                type="text"
                                name="lastName"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-semibold">Teléfono</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                    </div>
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
                        className="w-full mt-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        Registrarse
                    </button>
                </form>
                <p className="mt-4 text-gray-500 text-center">
                    ¿Ya tienes cuenta?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-500 hover:underline"
                    >
                        Inicia sesión
                    </button>
                </p>
            </div>
        </div>
    );
};

Register.propTypes = {
    setIsRegistered: PropTypes.func.isRequired,
};

export default Register;