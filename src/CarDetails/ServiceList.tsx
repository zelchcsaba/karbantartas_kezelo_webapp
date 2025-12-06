import { ServiceEntry } from "../types/ServiceEntry";
import { SERVICE_DEFINITIONS } from "../utils/serviceDefinitions";
import "./ServiceList.css";

/**
 * A ServiceList komponens által elvárt bemeneti paraméterek.
 *
 * @property services A megjelenítendő szervizbejegyzések listája.
 */
interface Props {
  services: ServiceEntry[];
}

/**
 * Szervizbejegyzéseket listázó komponens.
 *
 * Feladata:
 * - a szerviznapló rendezése dátum szerint (legfrissebb felül),
 * - a szervizadatok táblázatos megjelenítése,
 * - a szerviztípus emberi olvasású címkéjének megjelenítése
 *   a SERVICE_DEFINITIONS alapján.
 *
 * @param services A felsorolásban megjelenítendő szervizbejegyzések.
 * @returns A táblázatos karbantartáslista JSX formában.
 */
export default function ServiceList({ services }: Readonly<Props>) {
  // A karbantartások rendezése időrend szerint (új → régi)
  const sorted = [...services].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section class="service-list">
      <h2>Karbantartások</h2>

      <div class="table">
        {/* Táblázat fejléce */}
        <div class="table-row table-header">
          <div class="cell">Dátum</div>
          <div class="cell">Típus</div>
          <div class="cell">Leírás</div>
          <div class="cell">Km</div>
          <div class="cell">Költség (Ft)</div>
        </div>

        {/* Rendezett lista sorainak megjelenítése */}
        {sorted.map((s) => {
          // A szerviz típus leírásának lekérése
          const def = SERVICE_DEFINITIONS.find((d) => d.type === s.type);

          return (
            <div class="table-row" key={s.id}>
              <div class="cell">{s.date}</div>
              <div class="cell">{def?.label || s.type}</div>
              <div class="cell">{s.description || "-"}</div>
              <div class="cell">{s.mileage} km</div>
              <div class="cell">{s.cost} Ft</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
