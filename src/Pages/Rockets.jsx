import useFetch from "../Hooks/useFetch";

function Rockets() {
  const { data: rockets, loading, error } = useFetch(
    "https://api.spacexdata.com/v4/rockets"
  );

  if (loading) return <div className="loading">Loading rockets...</div>;
  if (error) return <div className="error">Something went wrong!</div>;

  return (
    <div className="rockets-page">
      <h1 className="page-title">SpaceX Rockets</h1>
      <div className="rockets-grid">
        {rockets.map(rocket => (
          <div key={rocket.id} className="rocket-card">
            <img
              src={rocket.flickr_images?.[0] || "https://placehold.co/400x200/111/fff?text=Rocket"}
              alt={rocket.name}
              className="rocket-img"
            />
            <div className="rocket-body">
              <div className="rocket-header">
                <h2>{rocket.name}</h2>
                <span className={`badge ${rocket.active ? "success" : "failed"}`}>
                  {rocket.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="rocket-desc">{rocket.description}</p>
              <div className="rocket-stats">
                <div className="r-stat">
                  <span className="r-label">First Flight</span>
                  <span className="r-value">{rocket.first_flight}</span>
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
                  <span className="r-label">Cost per Launch</span>
                  <span className="r-value">${rocket.cost_per_launch?.toLocaleString()}</span>
                </div>
                <div className="r-stat">
                  <span className="r-label">Success Rate</span>
                  <span className="r-value">{rocket.success_rate_pct}%</span>
                </div>
                <div className="r-stat">
                  <span className="r-label">Stages</span>
                  <span className="r-value">{rocket.stages}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rockets;