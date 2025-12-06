import { useState } from "preact/hooks";
import { route } from "preact-router";
import "./Navbar.css";
import { AddCarForm } from "./AddCarForm";
import { Car } from "../types/Car";

/**
 * A Navbar komponens bemeneti paraméterei.
 *
 * @property theme            Az aktuális téma (dark vagy light).
 * @property toggleTheme      A téma váltására szolgáló függvény.
 * @property onSearchChange   Opcionális callback: keresési input változásakor fut le.
 * @property onAddCar         Opcionális callback: új autó felvételekor hívódik meg.
 */
interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onSearchChange?: (value: string) => void;
  onAddCar?: (car: Car) => void;
}

/**
 * Navigációs sáv komponens.
 *
 * Feladatai:
 * - navigáció a főoldalra és statisztika oldalra,
 * - új autó felvételének indítása (ha az `onAddCar` callback meg van adva),
 * - keresési input biztosítása (ha az `onSearchChange` callback meg van adva),
 * - téma váltás kezelése.
 *
 * A komponens rugalmas: bizonyos funkciók csak akkor jelennek meg,
 * ha a szülő komponens átadja a megfelelő callbackeket.
 *
 * @param props A Navbar működéséhez szükséges paraméterek.
 * @returns A komponens JSX struktúrája.
 */
export default function Navbar({ theme, toggleTheme, onSearchChange, onAddCar }: Readonly<Props>) {
  // Az "Új autó" felvételi űrlap megjelenésének állapota
  const [showForm, setShowForm] = useState(false);

  return (
    <nav className="navbar">
      {/* BAL OLDALI GOMBOK */}
      <div className="navbar-left">

        {/* Főoldal / Autók gomb */}
        <button className="home" onClick={() => route("/")}>
          Autók
        </button>

        {/* Statisztika oldal gomb */}
        <button className="chart" onClick={() => route("/stats")}>
          Statisztika
        </button>

        {/* Új autó felvétele – csak akkor jelenik meg, ha a callback elérhető */}
        {onAddCar && (
          <button className="new-car" onClick={() => setShowForm(true)}>
            Új autó felvétele
          </button>
        )}
      </div>

      {/* JOBB OLDALI ELEM: keresés + téma váltás */}
      <div className="navbar-right">

        {/* Keresési mező – csak akkor jelenik meg, ha a szülő kezeli a keresést */}
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

        {/* Téma váltó gomb (ikon a témának megfelelően) */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? (
            <span className="theme-icon">🌞</span>
          ) : (
            <span className="theme-icon">🌙</span>
          )}
        </button>
      </div>

      {/* Új autó felvételi űrlap – modal jelleggel jelenik meg */}
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
