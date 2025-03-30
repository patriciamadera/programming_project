import { Navigate, Outlet } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/authContext";

const PrivateRoutes = () => {
    const { user, loading } = useContext(AuthContext);

    const isAuthenticated = useMemo(() => {
        return !loading && !!user;
    }, [user, loading]);

    console.log("PrivateRoutes: loading:", loading, "isAuthenticated:", isAuthenticated); // Log de depuración

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoutes;