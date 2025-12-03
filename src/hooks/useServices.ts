import { useState, useEffect } from "preact/hooks";
import { ServiceEntry } from "../types/ServiceEntry";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "services";

export function useServices() {
  // Szervizek betöltése localStorage-ből (ha nincs, üres lista)
  const [services, setServices] = useState<ServiceEntry[]>(() =>
    loadFromStorage<ServiceEntry[]>(STORAGE_KEY, [])
  );

  // Változás esetén visszamentés localStorage-be
  useEffect(() => {
    saveToStorage(STORAGE_KEY, services);
  }, [services]);

  // Új szerviz hozzáadása
  const addService = (entry: ServiceEntry) =>
    setServices(prev => [...prev, entry]);

  // Szerviz törlése ID alapján
  const deleteService = (id: string) =>
    setServices(prev => prev.filter(s => s.id !== id));

  // Egy adott autóhoz tartozó szervizek lekérdezése
  const getByCarId = (carId: string) =>
    services.filter(s => s.carId === carId);

  // Hook által elérhető műveletek
  return { services, addService, deleteService, getByCarId };
}
