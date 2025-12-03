export function saveToStorage<T>(key: string, data: T): void {
  try {
    const json = JSON.stringify(data);   // Adat átalakítása JSON-ra
    localStorage.setItem(key, json);     // Mentés localStorage-be
  } catch (error) {
    console.error("Hiba az adatok mentésekor:", error);
  }
}

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const json = localStorage.getItem(key);  // Adat lekérése
    if (!json) return defaultValue;          // Ha nincs, default érték
    return JSON.parse(json) as T;            // JSON → objektum
  } catch (error) {
    console.error("Hiba az adatok betöltésekor:", error);
    return defaultValue;                     // Hiba esetén fallback
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);    // Kulcs törlése
  } catch (error) {
    console.error("Hiba az adat törlésekor:", error);
  }
}
