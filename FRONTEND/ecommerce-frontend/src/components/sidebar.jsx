

const Sidebar = () => {
  return (
    <aside className="w-1/5 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Categorías</h2>
      <ul className="space-y-3">
        <li className="hover:text-gray-400 cursor-pointer">Acción</li>
        <li className="hover:text-gray-400 cursor-pointer">Comedia</li>
        <li className="hover:text-gray-400 cursor-pointer">Terror</li>
        <li className="hover:text-gray-400 cursor-pointer">Drama</li>
        <li className="hover:text-gray-400 cursor-pointer">Sci-Fi</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
