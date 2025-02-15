const Navbar = () => {
  return (
    <>
    <input type="checkbox" id="menu-toggle" className="peer hidden" />
    <label
      htmlFor="menu-toggle"
      className="absolute top-4 left-4 z-20 p-2 bg-gray-800 rounded-lg cursor-pointer"
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
    className="fixed top-0 left-0 w-64 h-screen bg-gray-900 text-white p-4 space-y-6 transform -translate-x-full peer-checked:translate-x-0 transition-transform"
    >
      <div>
        <h1 className="text-2xl font-bold mb-6"></h1>
        <nav>
          <ul className="space-y-6">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
                >Inicio</a
              >
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-6 p-3 rounded-lg hover:bg-gray-700 transition"
                >Peliculas</a
              >
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
                >Series</a
              >
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition"
                >Favoritos</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <main className="flex-1">
      <nav className="bg-gray-900 w-full p-4 flex justify-end items-center">
        <div className="relative group">
          <button className="flex items-center space-x-2">
            <img
              src="../src/img/no-user.jpg"
              className="w-10 h-10 rounded-full border border-gray-500"
            />
          </button>


          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible">
            <ul className="p-2">
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Cuenta</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Configuración</a></li>
                <li><a href="#" className="block px-4 py-2 hover:bg-gray-700 rounded">Cerrar sesión</a></li>
            </ul>
        </div>  
        </div>
      </nav>
  </main>
  </>
  );
};

export default Navbar;
