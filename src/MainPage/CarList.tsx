import { useState } from "preact/hooks";
import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import Navbar from "./Navbar";
import "./CarList.css";

/**
 * A CarList komponens által elvárt props-ok.
 *
 * @property theme       Az aktuálisan használt téma („dark” vagy „light”).
 * @property toggleTheme A téma váltására szolgáló függvény.
 * @property path        A router számára szükséges útvonal információ.
 */
interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  path: string;
}

/**
 * Autólista megjelenítésére szolgáló főoldali komponens.
 *
 * Feladatai:
 * - a `useCars` hook segítségével betölti és kezeli az autók listáját,
 * - keresési funkciót biztosít a felhasználónak,
 * - szűrt autókat jelenít meg kártyás nézetben,
 * - interakciókat továbbít a gyermek komponenseknek (Navbar, CarCard).
 *
 * @param props A CarList működéséhez szükséges paraméterek.
 * @returns A komponens JSX elemei.
 */
export default function CarList({ theme, toggleTheme, path }: Readonly<Props>) {
  // Autók lekérése és a hozzájuk tartozó műveletek (hozzáadás, törlés)
  const { cars, addCar, removeCar } = useCars();

  // Keresési mező állapota
  const [search, setSearch] = useState("");

  /**
   * Szűrt autók listája.
   *
   * - A keresés a márkanévre és modellre együttesen történik.
   * - Kis- és nagybetűk nem számítanak.
   */
  const filtered = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Felső navigációs sáv, téma váltással és kereséssel */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onSearchChange={setSearch}
        onAddCar={addCar}
      />

      <div className="car-list-container">

        {/* Ha nincs megjeleníthető autó, üzenetet mutatunk */}
        {filtered.length === 0 && (
          <div className="no-cars">
            <p>Nincs megjeleníthető autó.</p>
          </div>
        )}

        {/* Ha vannak találatok, akkor a kártyás lista jelenik meg */}
        {filtered.length > 0 && (
          <div className="car-grid">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onDelete={removeCar} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
