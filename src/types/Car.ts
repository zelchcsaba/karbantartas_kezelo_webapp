export interface Car {
  id: string;        // Egyedi azonosító
  brand: string;     // Márka 
  model: string;     // Típus
  year: number;      // Gyártási év
  mileage: number;   // Futott kilométer
  image?: string;    // Opcionális kép 
}
