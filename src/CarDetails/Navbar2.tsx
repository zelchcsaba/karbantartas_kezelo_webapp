import { route } from "preact-router";
import "./Navbar2.css";
import { useState } from "preact/hooks";
import { AddServiceForm } from "./AddServiceForm";
import { ServiceEntry } from "../types/ServiceEntry";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  readonly carId: string;                         // Az aktuális autó ID-ja
  readonly carMileage: number;                    // Az aktuális autó km-állása
  readonly onAddService: (entry: ServiceEntry) => void; // Új szerviz hozzáadása
}

export default function Navbar2(props: Readonly<Props>) {
  const { theme, toggleTheme, carId, carMileage, onAddService } = props;
  // Modal nyitva van-e vagy sem
  const [showForm, setShowForm] = useState(false);

  return (
    // Felső navigációs sáv (külön CSS osztály: navbar2 → nem ütközik a sima Navbar-ral)
    <nav className="navbar2">

      {/* Bal oldali gombok */}
      <div className="navbar2-left">

        {/* Autók listájára navigálás */}
        <button className="navbar2-home" onClick={() => route("/")}>
          Autók
        </button>

        {/* Statisztikai oldalra navigálás */}
        <button className="navbar2-chart" onClick={() => route("/stats")}>
          Statisztika
        </button>

        {/* Új szerviz modal megnyitása */}
        <button className="navbar2-new" onClick={() => setShowForm(true)}>
          Új service felvétele
        </button>
      </div>
      <div className="navbar2-right">
        <button className="navbar2-theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <span className="navbar2-theme-icon">🌞</span>
          ) : (
            <span className="navbar2-theme-icon">🌙</span>
          )}
        </button>
      </div>

      {/* Ha a felhasználó rákattint, felugrik a szerviz felvételi modal */}
      {showForm && (
        <AddServiceForm
          carId={carId}
          carMileage={carMileage}
          onSubmit={onAddService}     // service mentése
          onClose={() => setShowForm(false)} // modal bezárása
        />
      )}
    </nav>
  );
}
