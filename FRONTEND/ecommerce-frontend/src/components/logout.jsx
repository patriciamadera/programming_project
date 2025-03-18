import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem('token');

      // Hacer la petición al backend para invalidar el token
      await axios.post(
        '/api/auth/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Limpiar el token del almacenamiento local
      localStorage.removeItem('token');

      // Redirigir a la página de login
      navigate('/login'); 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Manejar el error (mostrar un mensaje al usuario, etc.)
    }
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default Logout;