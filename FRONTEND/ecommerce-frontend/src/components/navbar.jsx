import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logout from "../components/logout"; 

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      return;
    }
    const handleClickOutside = (event) => {
      if (!event.target.closest("#profile-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [location.pathname]);

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <>
      <label
        htmlFor="menu-toggle"
        className="absolute top-4 left-4 z-20 p-2 bg-black rounded-lg cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </label>

      <aside
        className={`fixed top-0 left-0 z-10 w-64 h-screen bg-gray-800 text-white p-4 space-y-6 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav>
          <ul className="space-y-6">
            {[
              { name: "" },
              { name: "Inicio", path: "/home" },
              { name: "Dashboard", path: "/dashboard" },
              { name: "Películas", path: "/movies" },
              { name: "Series", path: "/series" },
              { name: "Favoritos", path: "/favorites" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="block p-3 rounded-lg hover:bg-gray-700 transition"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <nav className="bg-gray-900 w-full p-4 flex justify-end items-center">
        <div className="relative" id="profile-menu">
          <button
            className="flex items-center space-x-2 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="../src/assets/img/icono.png"
              className="w-10 h-10 rounded-full border border-gray-500"
              alt="Perfil"
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-red-500 rounded-lg shadow-lg z-50">
              <ul className="p-2">
                {[
                  { name: "Cuenta", path: "/account" },
                  { name: "Configuración", path: "/settings" },
                ].map((option) => (
                  <li key={option.name}>
                    <Link
                      to={option.path}
                      className="block px-4 py-2 hover:bg-gray-700 rounded transition"
                    >
                      {option.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Logout /> 
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;