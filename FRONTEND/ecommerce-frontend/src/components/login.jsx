import { useState } from "react";
import PropTypes from "prop-types";
import Peliculas from "../assets/img/peliculas.jpeg";

const Login = ({ setIsLoggedIn }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateField = (name, value) => {
    let errorMessage = "";
    
    if (name === "name" && isRegistering) {
      if (value.trim().length < 3) errorMessage = "El nombre debe tener al menos 3 caracteres.";
    }
    
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) errorMessage = "Ingrese un correo válido.";
    }
    
    if (name === "password") {
      if (value.length < 6) errorMessage = "La contraseña debe tener al menos 6 caracteres.";
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (Object.values(errors).some((err) => err) || Object.values(formData).some((val) => val === "")) {
      alert("Por favor, corrige los errores antes de continuar.");
      return;
    }

    if (isRegistering) {
      console.log("Registrando usuario:", formData);
      alert("Cuenta creada exitosamente. Ahora inicia sesión.");
      setIsRegistering(false);
    } else {
      console.log("Iniciando sesión con:", formData.email, formData.password);
      setIsLoggedIn(true);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Peliculas})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-gray-600 text-sm font-semibold">Nombre</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-600 text-sm font-semibold">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none text-black focus:ring focus:border-blue-300"
              value={formData.email}
              onChange={handleChange}
              required
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
              required
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <p className="text-xs text-gray-500 text-right">¿Olvidó su contraseña?</p>

          <button
            type="submit"
            className="w-full mt-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {isRegistering ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-4 text-gray-500 text-center">
          {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"} {" "}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:underline"
          >
            {isRegistering ? "Inicia sesión" : "Regístrate"}
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
