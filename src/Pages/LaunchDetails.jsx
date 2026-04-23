import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { formatDate } from "../Utils/formatDate";

function LaunchDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: launch, loading, error } = useFetch(
    `https://api.spacexdata.com/v5/launches/${id}`
  );

  const { data: rocket } = useFetch(
    launch?.rocket ? `https://api.spacexdata.com/v4/rockets/${launch.rocket}` : null
  );

  if (loading) return <div className="loading">Loading launch details...</div>;
  if (error) return <div className="error">Launch not found!</div>;
  if (!launch) return null;

  return (
    <div className="detail-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate("/launches")}>
        &larr; Back to Launches
      </button>

      {/* Header */}
      <div className="detail-header">
        <img
          src={launch.links?.patch?.large || "https://placehold.co/180x180/111/fff?text=SpaceX"}
          alt={launch.name}
          className="detail-patch"
        />
        <div className="detail-title">
          <h1>{launch.name}</h1>
          <p>Flight #{launch.flight_number}</p>
          <p>Date: {formatDate(launch.date_utc)}</p>
          <span className={`badge ${launch.upcoming ? "upcoming" : launch.success ? "success" : "failed"}`}>
            {launch.upcoming ? "Upcoming" : launch.success ? "Success" : "Failed"}
          </span>
        </div>
      </div>

      {/* Details */}
      {launch.details && (
        <div className="detail-section">
          <h2>Mission Details</h2>
          <p className="detail-text">{launch.details}</p>
        </div>
      )}

      {/* Rocket Info */}
      {rocket && (
        <div className="detail-section">
          <h2>Rocket</h2>
          <div className="detail-card">
            <div className="r-stat">
              <span className="r-label">Name</span>
              <span className="r-value">{rocket.name}</span>
            </div>
            <div className="r-stat">
              <span className="r-label">Type</span>
              <span className="r-value">{rocket.type}</span>
            </div>
            <div className="r-stat">
              <span className="r-label">Height</span>
              <span className="r-value">{rocket.height?.meters}m</span>
            </div>
            <div className="r-stat">
              <span className="r-label">Mass</span>
              <span className="r-value">{rocket.mass?.kg?.toLocaleString()}kg</span>
            </div>
            <div className="r-stat">
              <span className="r-label">Success Rate</span>
              <span className="r-value">{rocket.success_rate_pct}%</span>
            </div>
            <div className="r-stat">
              <span className="r-label">Cost per Launch</span>
              <span className="r-value">${rocket.cost_per_launch?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="detail-section">
        <h2>Links</h2>
        <div className="detail-links">
          {launch.links?.webcast && (
            <a href={launch.links.webcast} target="_blank" rel="noreferrer" className="btn">
              Watch on YouTube
            </a>
          )}
          {launch.links?.wikipedia && (
            <a href={launch.links.wikipedia} target="_blank" rel="noreferrer" className="btn btn-outline">
              Wikipedia
            </a>
          )}
          {launch.links?.reddit?.launch && (
            <a href={launch.links.reddit.launch} target="_blank" rel="noreferrer" className="btn btn-outline">
              Reddit Thread
            </a>
          )}
        </div>
      </div>

      {/* Flickr Images */}
      {launch.links?.flickr?.original?.length > 0 && (
        <div className="detail-section">
          <h2>Photos</h2>
          <div className="detail-photos">
            {launch.links.flickr.original.map((img, i) => (
              <img key={i} src={img} alt={`Launch ${i + 1}`} className="detail-photo" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LaunchDetail;