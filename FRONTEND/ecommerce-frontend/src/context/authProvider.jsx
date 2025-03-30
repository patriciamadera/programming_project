import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./authContext";
import { getCurrentUser } from "../pages/services/authServices";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const userRef = useRef(user);

    useEffect(() => {
        const fetchUser = async () => {
            console.log("AuthProvider: fetching user...");
            const token = localStorage.getItem("token");
            console.log("AuthProvider: token from localStorage:", token);
            if (token) {
                const currentUser = await getCurrentUser(token);
                console.log("AuthProvider: currentUser:", currentUser);
                setUser(currentUser);
                userRef.current = currentUser;
                console.log("AuthProvider: user set to:", currentUser);
            } else {
                setUser(null);
                userRef.current = null;
            }
            setLoading(false);
            console.log("AuthProvider: user fetched, user:", userRef.current);
        };

        fetchUser();
    }, []);

    console.log("AuthProvider: render loading:", loading, "user:", userRef.current);

    if (loading) return <p>Cargando...</p>;

    return (
        <AuthContext.Provider value={{ user: userRef.current, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;