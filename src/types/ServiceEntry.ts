export type ServiceType =
  | "oil"          // Olajcsere
  | "brakes"       // Fékbetét csere
  | "inspection"   // Műszaki vizsga
  | "tires"        // Gumicsere
  | "other";       // Egyéb szerviz

export interface ServiceEntry {
  id: string;           // Egyedi azonosító
  carId: string;        // Melyik autóhoz tartozik
  type: ServiceType;    // Szerviz típusa
  date: string;         // Dátum (YYYY-MM-DD)
  description: string;  // Leírás
  cost: number;         // Költség (Ft)
  mileage: number;      // Km állás a szervizkor
}
