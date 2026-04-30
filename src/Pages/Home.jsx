
import useFetch from "../Hooks/useFetch";
import { formatDate } from "../Utils/formatDate";
import { Link } from "react-router-dom";

function Home() {

const { data: launches, loading, error } = useFetch(
  "https://api.spacexdata.com/v5/launches"
); 

const latest = launches
  ? launches
      .filter(l => !l.upcoming)
      .sort(
        (a, b) => new Date(b.date_utc) - new Date(a.date_utc)
      )[0]
  : null;

  const upcoming = launches?.filter(l => l.upcoming);
  const past = launches?.filter(l => !l.upcoming);
  const successRate = past
    ? Math.round((past.filter(l => l.success).length / past.length) * 100)
    : 0;

  console.log("latest launch:", latest?.name, latest?.date_utc);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Something went wrong!</div>;

  return (
    <div className="home">
      <div className="hero">
        <h1>SpaceX Launch Tracker</h1>
        <p>Track every SpaceX launch - past, present, and future.</p>
        <div className="hero-buttons">
          <Link to="/launches" className="btn">View All Launches</Link>
          <Link to="/rockets" className="btn btn-outline">View Rockets</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{launches?.length}</h2>
          <p>Total Launches</p>
        </div>
        <div className="stat-card">
          <h2>{upcoming?.length}</h2>
          <p>Upcoming Launches</p>
        </div>
        <div className="stat-card">
          <h2>{successRate}%</h2>
          <p>Success Rate</p>
        </div>
        <div className="stat-card">
          <h2>{past?.length}</h2>
          <p>Past Launches</p>
        </div>
      </div> 

      {latest && (
        <div className="latest-launch">
          <h2>Latest Launch</h2>
          <div className="launch-card featured">
            <img
              src={latest.links?.patch?.small || "https://placehold.co/100x100/111/fff?text=SpaceX"}
              alt={latest.name}
              className="patch"
            />
           <div className="launch-info">

  <h3>{latest.name}</h3>
  <p>Date: {formatDate(latest.date_utc)}</p>
  <p>Flight #{latest.flight_number}</p>

  <p className={latest.success ? "success" : "failed"}>
    {latest.success ? "Success" : "Failed"}
  </p>

  {latest.details && (
    <p className="details">{latest.details}</p>
  )}
</div>



          </div>
        </div>
      )}
    </div>
  );
}

export default Home;