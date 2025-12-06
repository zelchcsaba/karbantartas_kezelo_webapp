import { Car } from "../types/Car";
import "./CarHeader.css";

/**
 * A CarHeader komponens számára szükséges props-ok.
 *
 * @property car Az aktuálisan megnyitott autó teljes adatobjektuma.
 */
interface Props {
  readonly car: Car;
}

/**
 * A CarHeader komponens egy autó részletes oldalának felső információs blokkját jeleníti meg.
 *
 * Feladata:
 * - az autó képének (ha elérhető) megjelenítése,
 * - a név, évjárat és kilométer adatok kiírása,
 * - a vizuális fejlécrész biztosítása a CarDetails oldal számára.
 *
 * @param param0 A komponens által megkapott autóadatok.
 * @returns A fejléc JSX struktúrája.
 */
export default function CarHeader({ car }: Props) {
  return (
    // Felső információs blokk az autó adataival
    <header class="car-header">

      <div class="info">
        {/* Ha van feltöltött kép, megjelenítjük */}
        {car.image && (
          <img src={car.image} alt="" class="car-details-image" />
        )}

        {/* Az autó szöveges adatai */}
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
