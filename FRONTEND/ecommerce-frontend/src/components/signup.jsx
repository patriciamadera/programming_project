import { useState } from "react";
import PropTypes from 'prop-types';

const Register = ({ setIsRegistered }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario registrado:", formData);
    setIsRegistered(true); // Simula el registro y cambia de pantalla
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">Registrarse</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="mt-4 text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => setIsRegistered(true)}
            className="text-blue-400 hover:underline"
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
