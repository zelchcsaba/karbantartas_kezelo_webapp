import { ServiceType } from "../types/ServiceEntry";

export interface ServiceDefinition {
  type: ServiceType;      // Szerviz típusa
  label: string;          // Megjelenített név
  periodic: boolean;      // Időszakos-e
  intervalKm?: number;    // Km alapú intervallum
  intervalMonths?: number;// Hónap alapú intervallum
}

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
