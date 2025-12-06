import { useState, useEffect } from "preact/hooks";
import { ServiceEntry } from "../types/ServiceEntry";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "services";

/**
 * Egyéni hook a szervizbejegyzések kezelésére.
 *
 * Feladatai:
 * - a szervizlisták betöltése localStorage-ből,
 * - automatikus mentés minden módosítás után,
 * - új szervizfeljegyzés hozzáadása,
 * - szerviz törlése,
 * - egy adott autóhoz tartozó szervizbejegyzések lekérdezése.
 *
 * A hook teljes körű szervizadat-kezelést biztosít a komponensek számára.
 *
 * @returns Objektum, amely tartalmazza a szervizeket (`services`)
 *          és a velük végezhető műveleteket.
 */
export function useServices() {
  /**
   * Szervizbejegyzések inicializálása a localStorage-ből.
   *
   * Ha nincs korábban mentett adat, a hook üres tömböt ad vissza.
   */
  const [services, setServices] = useState<ServiceEntry[]>(() =>
    loadFromStorage<ServiceEntry[]>(STORAGE_KEY, [])
  );

  /**
   * A szervizlista mentése minden változáskor.
   *
   * Ez biztosítja, hogy az adatok böngésző bezárása után is megmaradjanak.
   */
  useEffect(() => {
    saveToStorage(STORAGE_KEY, services);
  }, [services]);

  /**
   * Új szervizbejegyzés hozzáadása.
   *
   * @param entry A felvett szerviz adatai.
   */
  const addService = (entry: ServiceEntry) =>
    setServices(prev => [...prev, entry]);

  /**
   * Szerviz törlése azonosító alapján.
   *
   * @param id A törlendő szerviz egyedi azonosítója.
   */
  const deleteService = (id: string) =>
    setServices(prev => prev.filter(s => s.id !== id));

  /**
   * Egy megadott autóhoz tartozó összes szerviz visszaadása.
   *
   * @param carId Az autó azonosítója.
   * @returns A vonatkozó szervizlisták tömbje.
   */
  const getByCarId = (carId: string) =>
    services.filter(s => s.carId === carId);

  // Hook által visszaadott állapot és műveletek
  return { services, addService, deleteService, getByCarId };
}
