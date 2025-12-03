import { ServiceEntry } from "../types/ServiceEntry";
import { SERVICE_DEFINITIONS } from "../utils/serviceDefinitions";
import "./ServiceList.css";

interface Props {
  services: ServiceEntry[];
}

export default function ServiceList({ services }: Readonly<Props>) {
  // A karbantartások dátum szerinti rendezése (legújabb elöl)
  const sorted = [...services].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section class="service-list">
      <h2>Karbantartások</h2>

      <div class="table">
        {/* Fejléc */}
        <div class="table-row table-header">
          <div class="cell">Dátum</div>
          <div class="cell">Típus</div>
          <div class="cell">Leírás</div>
          <div class="cell">Km</div>
          <div class="cell">Költség (Ft)</div>
        </div>

        {/* Táblázat sorai */}
        {sorted.map((s) => {
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
