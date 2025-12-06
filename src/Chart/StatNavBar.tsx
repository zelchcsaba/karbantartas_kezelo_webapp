import { route } from "preact-router";
import "./StatNavBar.css";

interface Props {
  readonly theme: "dark" | "light";
  readonly toggleTheme: () => void;
}

/**
 * Egyszerű navigációs sáv a statisztika oldalhoz.
 *
 * Feladata:
 * - navigáció az autók listájára és a statisztikai oldalra,
 * - téma váltása.
 */
export default function StatNavbar({ theme, toggleTheme }: Props) {
  return (
    // Felső navigációs sor
    <nav className="stat-navbar">

      {/* Bal oldali gombok */}
      <div className="stat-navbar-left">
        <button className="stat-home" onClick={() => route("/")}>
          Autók
        </button>

        <button className="stat-chart" onClick={() => route("/stats")}>
          Statisztika
        </button>
      </div>

      {/* Jobb oldali téma váltó gomb */}
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
