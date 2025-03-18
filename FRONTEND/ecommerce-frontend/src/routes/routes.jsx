import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import Login from "../pages/login";
import Home from "../pages/home";
import Register from "../pages/register";
import MovieDetail from "../pages/movieDetail";
import Dashboard from "../pages/Dashboard/dashboard";
import AddMovie from "../pages/Dashboard/addMovie";
import EditMovie from "../pages/Dashboard/editMovie";
import MovieTable from "../pages/Dashboard/movieTable";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const PrivateRoute = ({ element }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? element : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

function AppRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [setIsRegistered] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(storedLogin === "true");
    }, [isLoggedIn]); // Agregamos isLoggedIn como dependencia

    return (
        <Router>
            {isLoggedIn && <Navbar />}

            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register setIsRegistered={setIsRegistered} />} />

                {/* Rutas protegidas */}
                <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                <Route path="/movies/:id" element={<PrivateRoute element={<MovieDetail />} />} />
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/dashboard/add" element={<PrivateRoute element={<AddMovie />} />} />
                <Route path="/dashboard/edit/:id" element={<PrivateRoute element={<EditMovie />} />} />
                <Route path="/dashboard/movies" element={<PrivateRoute element={<MovieTable />} />} />

                {/* Redirección de rutas no existentes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {isLoggedIn && location.pathname !== "/movies/:id" && <Footer />}
        </Router>
    );
}

export default AppRoutes;