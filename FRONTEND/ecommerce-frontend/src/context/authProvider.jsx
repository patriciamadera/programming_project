import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./authContext";
import { getCurrentUser } from "../pages/services/authServices";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Nuevo estado para evitar parpadeo

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false); // Indicar que la autenticación ya terminó de cargar
    };

    fetchUser();
  }, []);

  if (loading) return <p>Cargando...</p>; // Evita que el contexto sea undefined mientras carga

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
