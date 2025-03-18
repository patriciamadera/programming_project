import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const PrivateRoutes = () => {
  const auth = useContext(AuthContext);
  const token = localStorage.getItem("token"); 

  if (!auth) return <p>Cargando...</p>; 
  const { user, loading } = auth; 

  if (loading) return <p>Cargando...</p>; 

  if (!token) {
    return <Navigate to="/login" replace />; 
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;