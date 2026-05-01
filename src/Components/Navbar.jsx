import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        SpaceX Tracker
      </Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/launches">Launches</NavLink></li>
        <li><NavLink to="/rockets">Rockets</NavLink></li>
        {user && <li><NavLink to="/favorites">Favorites</NavLink></li>}
      </ul>
      <div className="navbar-auth">
        {user ? (
          <>
            <span className="navbar-user">Hi, {user.username}</span>
            <button className="auth-btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn-sm outline">Login</Link>
            <Link to="/register" className="auth-btn-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;