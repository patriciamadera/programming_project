import Collage from "../assets/img/banner.png";

const Banner = () => {
  return (
    <section>
        <div
      className="w-full h-[400px] bg-cover bg-center"
      style={{ backgroundImage: `url(${Collage})` }}
    ></div>
      
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold">Bienvenido</h1>
        <p className="text-lg mt-2">Explora las mejores opciones para ti</p>
      </div>
    </section>
  );
}

export default Banner;
