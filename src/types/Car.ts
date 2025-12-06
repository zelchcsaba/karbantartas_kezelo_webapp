/**
 * Egy autó adatait leíró típus.
 *
 * Ez a típus az alkalmazás összes autóval kapcsolatos komponensében
 * egységes adatstruktúrát biztosít.
 *
 * @property id        Egyedi azonosító (UUID).
 * @property brand     Az autó márkája.
 * @property model     Az autó típusa / modellneve.
 * @property year      Gyártási év.
 * @property mileage   Futott kilométer állás.
 * @property image     Opcionális, base64 formátumú kép az autóról.
 */
export interface Car {
  id: string;        
  brand: string;     
  model: string;     
  year: number;      
  mileage: number;   
  image?: string;    
}
