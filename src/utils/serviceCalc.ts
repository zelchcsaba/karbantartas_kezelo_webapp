import { ServiceEntry } from "../types/ServiceEntry";
import { SERVICE_DEFINITIONS } from "./serviceDefinitions";

export function calculateNextServices(
  carMileage: number,
  services: ServiceEntry[]
) {
  return SERVICE_DEFINITIONS
    .filter(def => def.periodic)                 // Csak időszakos szervizek
    .map(def => {
      // Utolsó ilyen típusú szerviz megkeresése
      const last = services
        .filter(s => s.type === def.type)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

      const lastDate = last?.date ?? null;

      let nextMileage: number | null = null;     // Következő km alapú esedékesség
      let nextDate: string | null = null;        // Következő idő alapú esedékesség
      let daysLeft: number | null = null;        // Hátralévő napok

      // Km intervallum számítása
      if (def.intervalKm && last) {
        nextMileage = last.mileage + def.intervalKm;
      }

      // Hónap alapú intervallum számítása
      if (def.intervalMonths && last) {
        const baseDate = new Date(last.date);

        const d = new Date(baseDate);
        d.setMonth(d.getMonth() + def.intervalMonths); // Következő dátum
        nextDate = d.toISOString().split("T")[0];

        const now = new Date();
        const diff = d.getTime() - now.getTime();      // Különbség ms-ban
        daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      }

      // Eredmény visszaadása
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
