import { useLocation } from "react-router-dom";
import Collage from "../assets/img/banner.png";

const Banner = () => {
  const location = useLocation();

  // Ocultar el banner si la ruta no es /home
  if (location.pathname !== "/home") {
    return null;
  }

  return (
    <section className="relative w-full h-[400px]">
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Collage})` }}
      ></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4 bg-black/50">
        <h1 className="text-3xl md:text-5xl font-bold">Bienvenido</h1>
        <p className="text-lg mt-2">Explora las mejores opciones para ti</p>
      </div>
    </section>
  );
};

export default Banner;
