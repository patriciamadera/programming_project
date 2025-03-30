import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register'; 
import Home from './pages/home';
import MovieDetail from './pages/movieDetail';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Dashboard from './pages/Dashboard/dashboard';
import PrivateRoute from './routes/privateRoutes';
import AddMovie from './pages/Dashboard/addMovie';
import EditMovie from './pages/Dashboard/editMovie';
import { AuthProvider } from './context/authProvider';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} /> 
                    <Route element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/movies/:id" element={<MovieDetail />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="dashboard/add-movie" element={<AddMovie />} />
                        <Route path="dashboard/edit/:id" element={<EditMovie />} />
                    </Route>
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;