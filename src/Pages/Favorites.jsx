import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getFavorites, removeFavorite } from "../services/favoriteService";
import { formatDate } from "../Utils/formatDate";

function Favorites() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    getFavorites(token)
      .then(res => setFavorites(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  const handleRemove = async (e, launchId) => {
    e.stopPropagation();
    await removeFavorite(token, launchId);
    setFavorites(prev => prev.filter(f => f.launchId !== launchId));
  };

  if (loading) return <div className="loading">Loading favorites...</div>;

  return (
    <div className="launches-page">
      <h1 className="page-title">My Favorites</h1>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <p>No favorites yet!</p>
          <button className="btn" onClick={() => navigate("/launches")}>
            Browse Launches
          </button>
        </div>
      ) : (
        <div className="launches-grid">
          {favorites.map(fav => (
            <div
              key={fav.launchId}
              className="launch-card clickable"
              onClick={() => navigate(`/launches/${fav.launchId}`)}
            >
              <img
                src={fav.patchImage || "https://placehold.co/80x80/111/fff?text=SpaceX"}
                alt={fav.launchName}
                className="patch-sm"
              />
              <div className="launch-info">
                <h3>{fav.launchName}</h3>
                <p>Date: {formatDate(fav.date)}</p>
                <button
                  className="fav-btn fav-active"
                  onClick={(e) => handleRemove(e, fav.launchId)}
                >
                  ★ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;