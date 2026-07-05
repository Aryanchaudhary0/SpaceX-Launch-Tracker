import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";
import useFetch from "../Hooks/useFetch";
import { formatDate } from "../Utils/formatDate";



function Launches() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const PER_PAGE = 12;

  const navigate = useNavigate();
  const { user, token } = useAuth();

  const { data: launches, loading, error } = useFetch(
"/spacex-api/v5/launches"
  );

  useEffect(() => {
    if (token) {
      getFavorites(token).then(res => setFavorites(res.data));
    }
  }, [token]);

  const isFavorited = (launchId) =>
    favorites.some(f => f.launchId === launchId);

  const toggleFavorite = async (e, launch) => {
    e.stopPropagation();
    if (!user) { navigate("/login"); return; }
    if (isFavorited(launch.id)) {
      await removeFavorite(token, launch.id);
      setFavorites(prev => prev.filter(f => f.launchId !== launch.id));
    } else {
      const res = await addFavorite(token, {
        launchId: launch.id,
        launchName: launch.name,
        patchImage: launch.links?.patch?.small || "",
        date: launch.date_utc
      });
      setFavorites(prev => [...prev, res.data]);
    }
  };

  const filtered = useMemo(() => {
    if (!launches) return [];
    return launches
      .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
      .filter(l => {
        if (filter === "success") return l.success === true;
        if (filter === "failed") return l.success === false;
        if (filter === "upcoming") return l.upcoming === true;
        return true;
      })
      .reverse();
  }, [launches, search, filter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSearch = (e) => { setSearch(e.target.value); setPage(1); };
  const handleFilter = (val) => { setFilter(val); setPage(1); };

  if (loading) return <div className="loading">Loading launches...</div>;
  if (error) return <div className="error">Something went wrong!</div>;

  return (
    <div className="launches-page">
      <h1 className="page-title">All Launches</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search mission name..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        <div className="filter-buttons">
          {["all", "success", "failed", "upcoming"].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => handleFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <p className="results-count">{filtered.length} launches found</p>

      <div className="launches-grid">
        {paginated.map(launch => (
          <div
            key={launch.id}
            className="launch-card clickable"
            onClick={() => navigate(`/launches/${launch.id}`)}
          >
            <img
              src={launch.links?.patch?.small || "https://placehold.co/80x80/111/fff?text=SpaceX"}
              alt={launch.name}
              className="patch-sm"
            />
            <div className="launch-info">
              <h3>{launch.name}</h3>
              <p>Date: {formatDate(launch.date_utc)}</p>
              <p>Flight #{launch.flight_number}</p>
              <span className={`badge ${launch.upcoming ? "upcoming" : launch.success ? "success" : "failed"}`}>
                {launch.upcoming ? "Upcoming" : launch.success ? "Success" : "Failed"}
              </span>
              <button
                className={`fav-btn ${isFavorited(launch.id) ? "fav-active" : ""}`}
                onClick={(e) => toggleFavorite(e, launch)}
              >
                {isFavorited(launch.id) ? "★ Saved" : "☆ Save"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1} className="page-btn">
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .map((p, idx, arr) => (
              <span key={p} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {idx > 0 && arr[idx - 1] !== p - 1 && <span className="dots">...</span>}
                <button onClick={() => setPage(p)} className={`page-btn ${page === p ? "active" : ""}`}>
                  {p}
                </button>
              </span>
            ))}
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="page-btn">
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Launches;