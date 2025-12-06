import { ServiceType } from "../types/ServiceEntry";

/**
 * Egy szerviztípus metaadatait leíró interfész.
 *
 * Ezek az adatok határozzák meg:
 * - a szerviz megjelenített nevét,
 * - hogy időszakos karbantartásnak számít-e,
 * - és ha igen, milyen km vagy hónap intervallumban válik esedékessé.
 */
export interface ServiceDefinition {
  type: ServiceType;       // Szerviz típusa
  label: string;           // Megjelenített név
  periodic: boolean;       // Időszakos karbantartás-e
  intervalKm?: number;     // Km alapú ismétlődési távolság
  intervalMonths?: number; // Havi alapú ismétlődési ciklus
}

/**
 * Az alkalmazásban használt szerviztípusok listája.
 *
 * Ezek alapján számítja a rendszer:
 * - a következő esedékességi kilométert,
 * - a következő várható időpontot,
 * - valamint a figyelmeztetéseket („Hamarosan”, „Lejárt”).
 */
export const SERVICE_DEFINITIONS: ServiceDefinition[] = [
  {
    type: "oil",
    label: "Olajcsere",
    periodic: true,
    intervalKm: 10000,
    intervalMonths: 12,
  },
  {
    type: "brakes",
    label: "Fékbetét csere",
    periodic: true,
    intervalKm: 30000,
  },
  {
    type: "inspection",
    label: "Éves műszaki vizsga",
    periodic: true,
    intervalMonths: 12,
  },
  {
    type: "tires",
    label: "Gumicsere",
    periodic: true,
    intervalKm: 45000,
    intervalMonths: 60,
  },
  {
    type: "other",
    label: "Egyéb karbantartás",
    periodic: false,
  },
];
