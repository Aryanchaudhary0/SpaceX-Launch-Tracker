import { Link, NavLink } from "react-router-dom";

import { useTheme } from "../Context/ThemeContext";

function Navbar() {
    const { theme, toggleTheme } = useTheme();
;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        SpaceX Tracker
      </Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/launches">Launches</NavLink></li>
        <li><NavLink to="/rockets">Rockets</NavLink></li>
      </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>

    </nav>
  );
}

export default Navbar;