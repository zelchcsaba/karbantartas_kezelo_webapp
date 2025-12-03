import { useState, useEffect } from "preact/hooks";
import { Car } from "../types/Car";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "cars";

export function useCars() {
  // Autók betöltése localStorage-ből (ha nincs, akkor üres tömb)
  const [cars, setCars] = useState<Car[]>(() =>
    loadFromStorage<Car[]>(STORAGE_KEY, [])
  );

  // Minden módosítás után frissítés localStorage-be
  useEffect(() => {
    saveToStorage(STORAGE_KEY, cars);
  }, [cars]);

  // Új autó hozzáadása
  const addCar = (car: Car) => {
    setCars((prev) => [...prev, car]);
  };

  // Autó törlése ID alapján
  const removeCar = (id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  // Futásteljesítmény frissítése (csak növelni engedi)
  const updateCarMileage = (carId: string, newMileage: number) => {
    setCars(prev =>
      prev.map(car =>
        car.id === carId
          ? { ...car, mileage: Math.max(car.mileage, newMileage) }
          : car
      )
    );
  };

  // Hook által visszaadott műveletek
  return { cars, addCar, removeCar, updateCarMileage };
}
