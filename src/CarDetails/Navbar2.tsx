import { route } from "preact-router";
import "./Navbar2.css";
import { useState } from "preact/hooks";
import { AddServiceForm } from "./AddServiceForm";
import { ServiceEntry } from "../types/ServiceEntry";

/**
 * A Navbar2 komponens bemeneti paraméterei.
 *
 * @property theme            Az aktuális téma (light vagy dark).
 * @property toggleTheme      A téma váltására szolgáló függvény.
 * @property carId            Az adott részletező oldalon megjelenített autó egyedi azonosítója.
 * @property carMileage       Az autó aktuális futásteljesítménye.
 * @property onAddService     Callback függvény: új szerviz bejegyzés hozzáadása.
 */
interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  readonly carId: string;
  readonly carMileage: number;
  readonly onAddService: (entry: ServiceEntry) => void;
}

/**
 * A CarDetails oldal felső navigációs sávja.
 *
 * Funkciói:
 * - navigáció vissza a főoldalra és a statisztika oldalra,
 * - új szerviz bejegyzés felvételének indítása,
 * - téma váltása,
 * - modális ablak kezelése (AddServiceForm).
 *
 * Ez a Navbar a részletező oldalra specializált változat,
 * külön CSS-sel és struktúrával, hogy ne ütközzön az alap Navbar komponenssel.
 *
 * @param props A komponens működéséhez szükséges adatok és callbackek.
 * @returns JSX struktúra a navigáció megjelenítéséhez.
 */
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
