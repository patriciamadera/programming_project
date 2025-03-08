import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login';
import Home from './pages/home';
import MovieDetail from './pages/movieDetail';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Dashboard from './pages/Dashboard/dashboard';
import PrivateRoute from './routes/privateRoutes';
import AddMovie from './pages/Dashboard/addMovie';
import EditMovie from './pages/Dashboard/editMovie';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={<PrivateRoute isLoggedIn={isLoggedIn}><Home /></PrivateRoute>} />
        <Route path="/movies/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><MovieDetail /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute isLoggedIn={isLoggedIn}><Dashboard /></PrivateRoute>} />
        <Route path="dashboard/add-movie" element={<PrivateRoute isLoggedIn={isLoggedIn}><AddMovie /></PrivateRoute>} />
        <Route path="dashboard/edit-movie/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><EditMovie /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
