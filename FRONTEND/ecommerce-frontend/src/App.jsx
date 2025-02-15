import Login from "../src/components/login";
import Footer from "../src/components/footer";
import { useState } from "react";
import Navbar from "../src/components/navbar";
import Banner from "../src/components/banner";
import MovieGrid from "../src/components/movieGrid";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar login

  return (
    <div className="bg-black text-white min-h-screen">
      {isLoggedIn ? (
        <>
          <Navbar />
          <Banner />
          <div className="flex-1">
            <MovieGrid />
          </div>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
      <Footer />
    </div>
  );
};


export default App;