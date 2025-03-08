import { Link } from "react-router-dom";
import MovieTable from "./movieTable";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <Link to="/dashboard/add-movie">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Agregar Película</button>
        </Link>
      </div>
      <MovieTable />
    </div>
  );
};

export default Dashboard;
