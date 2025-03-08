import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLogin === "true");
  }, []); 

  return (
    <Router>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<AddMovie />} />
            <Route path="/dashboard/edit/:id" element={<EditMovie />} />
            <Route path="/dashboard/movies" element={<MovieTable />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {/* Footer solo en ciertas rutas */}
      {isLoggedIn && window.location.pathname !== "/movies/:id" && <Footer />}
    </Router>
  );
}

export default AppRoutes;