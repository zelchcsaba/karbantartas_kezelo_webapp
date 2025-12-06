/**
 * A támogatott szerviztípusok felsorolása.
 *
 * Ezeket a típusokat használják a karbantartási bejegyzések
 * kategorizálására, illetve a következő esedékes szervizek
 * meghatározásához.
 */
export type ServiceType =
  | "oil"          // Olajcsere
  | "brakes"       // Fékbetét csere
  | "inspection"   // Műszaki vizsga
  | "tires"        // Gumicsere
  | "other";       // Egyéb szerviz

/**
 * Egy szervizbejegyzést reprezentáló adatstruktúra.
 *
 * Egy adott autóhoz tartozó karbantartások adatait tárolja:
 * dátumot, típust, leírást, költséget és a bejegyzéskor
 * rögzített kilométerállást.
 */
export interface ServiceEntry {
  /** Egyedi azonosító */
  id: string;

  /** Annak az autónak az ID-ja, amelyhez ez a szerviz tartozik */
  carId: string;

  /** A szerviz típusa (pl. olajcsere, fékcsere, vizsga, stb.) */
  type: ServiceType;

  /** A szerviz dátuma (ISO formátumban: YYYY-MM-DD) */
  date: string;

  /** A szerviz leírása, opcionális magyarázó szöveg */
  description: string;

  /** A szerviz költsége forintban */
  cost: number;

  /** A jármű kilométerállása a szerviz időpontjában */
  mileage: number;
}
