import { ServiceEntry } from "../types/ServiceEntry";
import { SERVICE_DEFINITIONS } from "./serviceDefinitions";

/**
 * Következő esedékes szervizek kiszámítása.
 *
 * A függvény:
 * - csak az időszakos (periodic) szervizeket dolgozza fel,
 * - megkeresi az adott típusú utolsó szervizt,
 * - ez alapján kiszámolja:
 *   - következő km alapú esedékességet,
 *   - következő dátum alapú esedékességet,
 *   - hátralévő napok számát.
 *
 * @param carMileage Az autó aktuális futásteljesítménye.
 * @param services Az autóhoz tartozó szerviz bejegyzések.
 * @returns A következő szervizadatok listája.
 */
export function calculateNextServices(
  carMileage: number,
  services: ServiceEntry[]
) {
  return SERVICE_DEFINITIONS
    .filter(def => def.periodic)  // Csak az időszakos szervizek listája
    .map(def => {
      // Utolsó ilyen típusú szerviz megtalálása
      const last = services
        .filter(s => s.type === def.type)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      const lastDate = last?.date ?? null;

      let nextMileage: number | null = null;  // Következő km-es esedékesség
      let nextDate: string | null = null;     // Következő idő alapú dátum
      let daysLeft: number | null = null;     // Hátralévő napok a dátumig

      // Km intervallum számítása (ha van utolsó bejegyzés és km intervallum)
      if (def.intervalKm && last) {
        nextMileage = last.mileage + def.intervalKm;
      }

      // Hónap alapú intervallum számítása (ha definíció tartalmaz időintervallumot)
      if (def.intervalMonths && last) {
        const baseDate = new Date(last.date);

        // Következő dátum hozzáadott hónapokkal
        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + def.intervalMonths);
        nextDate = d.toISOString().split("T")[0];

        // Hátralévő napok számítása
        const now = new Date();
        const diff = d.getTime() - now.getTime();
        daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      }

      // A kiszámolt adatok visszaadása
      return {
        type: def.type,
        label: def.label,
        lastDate,
        nextMileage,
        nextDate,
        daysLeft
      };
    });
}
