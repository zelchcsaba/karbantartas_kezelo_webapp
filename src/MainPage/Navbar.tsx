import { useState } from "preact/hooks";
import { route } from "preact-router";
import "./Navbar.css";
import { AddCarForm } from "./AddCarForm";
import { Car } from "../types/Car";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onSearchChange?: (value: string) => void;
  onAddCar?: (car: Car) => void;
}

export default function Navbar({ theme, toggleTheme, onSearchChange, onAddCar }: Readonly<Props>) {
  // Form megjelenites allapota
  const [showForm, setShowForm] = useState(false);

  return (
    <nav className="navbar">
      {/* Bal oldali gombok */}
      <div className="navbar-left">
        {/* Autok gomb */}
        <button className="home" onClick={() => route("/")}>Autók</button>

        {/* Statisztika gomb */}
        <button className="chart" onClick={() => route("/stats")}>Statisztika</button>

        {/* Uj auto gomb ha van onAddCar */}
        {onAddCar && (
          <button className="new-car" onClick={() => setShowForm(true)}>
            Új autó felvétele
          </button>
        )}
      </div>



      {/* Jobb oldali kereses ha van onSearchChange */}
      <div className="navbar-right">
        {onSearchChange && (
          <input
            type="text"
            className="navbar-search"
            placeholder="Keresés név szerint…"
            onInput={(e) =>
              onSearchChange((e.target as HTMLInputElement).value)
            }
          />
        )}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <span className="theme-icon">🌞</span>
          ) : (
            <span className="theme-icon">🌙</span>
          )}
        </button>
      </div>

      {/* Uj auto form */}
      {showForm && onAddCar && (
        <AddCarForm
          onClose={() => setShowForm(false)}
          onSubmit={(car) => {
            onAddCar(car);
            setShowForm(false);
          }}
        />
      )}
    </nav>
  );
}