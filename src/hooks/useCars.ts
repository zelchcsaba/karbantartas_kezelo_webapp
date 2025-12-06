import { useState, useEffect } from "preact/hooks";
import { Car } from "../types/Car";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "cars";

/**
 * Egyéni hook az autóadatok kezelésére.
 *
 * Feladatai:
 * - az autók betöltése localStorage-ből,
 * - az autólista automatikus mentése minden módosítás után,
 * - autók hozzáadása,
 * - autók törlése,
 * - futásteljesítmény frissítése (csak nagyobb értékre).
 *
 * A hook minden autóval kapcsolatos állapotot és műveletet biztosít a komponensek számára.
 *
 * @returns Objektum, amely tartalmazza az autók listáját (`cars`) és az azokkal végezhető műveleteket.
 */
export function useCars() {
  /**
   * Autók inicializálása localStorage-ből.
   *
   * A `loadFromStorage` biztonságosan ad vissza egy tömböt:
   * - ha van tárolt adat → azt tölti be,
   * - ha nincs → üres tömböt ad vissza.
   */
  const [cars, setCars] = useState<Car[]>(() =>
    loadFromStorage<Car[]>(STORAGE_KEY, [])
  );

  /**
   * Minden változás után mentjük az állapotot localStorage-be.
   *
   * Ez biztosítja, hogy a felhasználó által bevitt adatok
   * frissítések és újratöltések után is megmaradjanak.
   */
  useEffect(() => {
    saveToStorage(STORAGE_KEY, cars);
  }, [cars]);

  /**
   * Új autó hozzáadása a listához.
   *
   * @param car A hozzáadandó autó objektuma.
   */
  const addCar = (car: Car) => {
    setCars((prev) => [...prev, car]);
  };

  /**
   * Autó törlése azonosító alapján.
   *
   * @param id A törlendő autó egyedi azonosítója.
   */
  const removeCar = (id: string) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  /**
   * Egy autó futásteljesítményének módosítása.
   *
   * Fontos: a futásteljesítmény csak növelhető, csökkenteni nem engedi,
   * így védi az adat integritását.
   *
   * @param carId Az autó azonosítója.
   * @param newMileage Az új futásteljesítmény értéke.
   */
  const updateCarMileage = (carId: string, newMileage: number) => {
    setCars(prev =>
      prev.map(car =>
        car.id === carId
          ? { ...car, mileage: Math.max(car.mileage, newMileage) }
          : car
      )
    );
  };

  // A hook által elérhető állapotok és műveletek
  return { cars, addCar, removeCar, updateCarMileage };
}
