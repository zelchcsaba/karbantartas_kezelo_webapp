import { Car } from "../types/Car";
import "./CarHeader.css";

interface Props {
  readonly car: Car; // Az aktuálisan megnyitott autó adatai
}

export default function CarHeader({ car }: Props) {
  return (
    // A teljes felső autóinfó blokk
    <header class="car-header">

      <div class="info">
        {/* Ha van kép feltöltve, megjelenik */}
        {car.image && (
          <img src={car.image} alt="" class="car-details-image" />
        )}

        {/* Szöveges információk az autóról */}
        <div class="text-info">

          <h1>
            {car.brand} {car.model}
          </h1>

          {/* Évjárat és kilométer kiírása */}
          <section class="car-info">
            <p><strong>Évjárat:</strong> {car.year}</p>
            <p><strong>Kilométer:</strong> {car.mileage} km</p>
          </section>

        </div>
      </div>
    </header>
  );
}
