import { useState } from "preact/hooks";
import { route } from "preact-router";
import { Car } from "../types/Car";
import "./CarCard.css";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface Props {
  car: Car;
  onDelete: (id: string) => void;
}

export function CarCard({car, onDelete }: Readonly<Props>) {
  // Torles megerosito modal allapot
  const [showConfirm, setShowConfirm] = useState(false);

  // Reszletek oldal megnyitasa
  const openDetails = () => {
    route(`/car/${car.id}`);
  };

  // Torles megerosites megnyitasa
  const openDeleteConfirm = (e: Event) => {
    e.stopPropagation(); 
    setShowConfirm(true);
  };

  // Torles veglegesitese
  const confirmDelete = () => {
    onDelete(car.id);
    setShowConfirm(false);
  };

  return (
    <>
      {/* Torles megerosito modal */}
      {showConfirm && (
        <DeleteConfirmModal
          message={`Biztosan törölni szeretnéd a(z) ${car.brand} ${car.model} autót?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* Kattinthato kartya terulet */}
      <div className="card-click-area" onClick={openDetails}>
        <div className="car-card">
          {/* Auto kepe */}
          {car.image && (
            <div className="car-card-image">
              <img src={car.image} alt={`${car.brand} ${car.model}`} />
            </div>
          )}

          {/* Auto leirasa */}
          <article className="car-card-description">
            <h3>{car.brand} {car.model}</h3>
            <p>Évjárat: {car.year}</p>
            <p>Kilométer: {car.mileage} km</p>
          </article>

          {/* Torles gomb */}
          <button
            className="fa fa-trash delete-btn"
            onClick={openDeleteConfirm}
          ></button>
        </div>
      </div>
    </>
  );
}