import { useState } from "preact/hooks";
import { route } from "preact-router";
import { Car } from "../types/Car";
import "./CarCard.css";
import DeleteConfirmModal from "./DeleteConfirmModal";

/**
 * A CarCard által elvárt bemeneti paraméterek.
 *
 * @property car       Az autó adatait tartalmazó objektum.
 * @property onDelete  Callback, amely az autó törlését kezeli (a szülő komponens végzi a tényleges törlést).
 */
interface Props {
  car: Car;
  onDelete: (id: string) => void;
}

/**
 * Egyetlen autót megjelenítő kártyakomponens.
 *
 * Feladatai:
 * - az autó alapadatainak (márka, modell, évjárat, kilométer) megjelenítése,
 * - kattintásra a részletek oldalra navigál,
 * - törlés gombbal megerősítést kér, majd értesíti a szülőt a törlésről,
 * - opcionálisan az autó képet is mutatja, ha rendelkezésre áll.
 *
 * A komponens teljes területe kattintható, kivéve a törlés gombot—
 * annak eseménye külön van kezelve, hogy ne nyissa meg a részleteket.
 *
 * @param props A CarCard működéséhez szükséges adatok.
 * @returns A kártya JSX struktúrája.
 */
export function CarCard({ car, onDelete }: Readonly<Props>) {
  // Törlés megerősítő modal láthatóságának állapota
  const [showConfirm, setShowConfirm] = useState(false);

  /**
   * Navigálás az adott autó részleteinek oldalára.
   */
  const openDetails = () => {
    route(`/car/${car.id}`);
  };

  /**
   * Törlés megerősítő ablak megnyitása.
   *
   * A `stopPropagation()` biztosítja, hogy a
   * kártya kattintási eseménye ne aktiválódjon,
   * és ne navigáljon a részletek oldalra.
   */
  const openDeleteConfirm = (e: Event) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  /**
   * A törlés véglegesítése.
   *
   * - meghívja az `onDelete` callbacket a szülő komponensben,
   * - bezárja a megerősítő modalt.
   */
  const confirmDelete = () => {
    onDelete(car.id);
    setShowConfirm(false);
  };

  return (
    <>
      {/* Törlés megerősítő modal megjelenítése, ha aktív */}
      {showConfirm && (
        <DeleteConfirmModal
          message={`Biztosan törölni szeretnéd a(z) ${car.brand} ${car.model} autót?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Kattintható kártyaterület – részletek oldalra navigál */}
      <div className="card-click-area" onClick={openDetails}>
        <div className="car-card">

          {/* Autó képe (ha van) */}
          {car.image && (
            <div className="car-card-image">
              <img src={car.image} alt={`${car.brand} ${car.model}`} />
            </div>
          )}

          {/* Autó adatai */}
          <article className="car-card-description">
            <h3>{car.brand} {car.model}</h3>
            <p>Évjárat: {car.year}</p>
            <p>Kilométer: {car.mileage} km</p>
          </article>

          {/* Törlés gomb — csak a gombot kattintva nyílik meg a megerősítés */}
          <button
            className="fa fa-trash delete-btn"
            onClick={openDeleteConfirm}
          ></button>
        </div>
      </div>
    </>
  );
}
