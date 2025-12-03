import { route } from "preact-router";
import "./StatNavBar.css";

interface Props {
  readonly theme: "dark" | "light";
  readonly toggleTheme: () => void;
}

export default function StatNavbar({ theme, toggleTheme }: Props) {
  return (
    // Navigacios sor fokontenere
    <nav className="stat-navbar">
      {/* Bal oldali gombok */}
      <div className="stat-navbar-left">
        {/* Autok gomb */}
        <button className="stat-home" onClick={() => route("/")}>
          Autók
        </button>

        {/* Statisztika gomb */}
        <button className="stat-chart" onClick={() => route("/stats")}>
          Statisztika
        </button>
      </div>

      <div className="stat-right">
        <button className="stat-theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <span className="stat-theme-icon">🌞</span>
          ) : (
            <span className="stat-theme-icon">🌙</span>
          )}
        </button>
      </div>

    </nav>
  );
}