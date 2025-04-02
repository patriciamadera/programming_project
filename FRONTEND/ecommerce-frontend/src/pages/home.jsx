import Banner from "../components/banner";
import ChatOpenAI from "../components/chatOpenIA";
import MovieGrid from "../components/movieGrid";

const Home = () => {
  return (
    <div className="bg-black text-white pb-10">
      <Banner />
      <MovieGrid />
      <div className="mt-8 px-4">
        <ChatOpenAI/>
      </div>
    </div>
  );
};

export default Home;

  