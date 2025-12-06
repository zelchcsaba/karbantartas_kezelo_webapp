/**
 * Adat mentése localStorage-be.
 *
 * A függvény bármilyen típusú adatot képes JSON formátumra alakítani,
 * majd elmenteni a megadott kulcshoz. Sikertelen mentés esetén
 * hibaüzenetet ír a konzolra.
 *
 * @param key A localStorage kulcsa.
 * @param data A mentendő adat bármilyen típusban.
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    const json = JSON.stringify(data);   // Adat átalakítása JSON-ra
    localStorage.setItem(key, json);     // Mentés localStorage-be
  } catch (error) {
    console.error("Hiba az adatok mentésekor:", error);
  }
}

/**
 * Adat betöltése localStorage-ből.
 *
 * Ha a kulcs nem létezik, a megadott `defaultValue` értéket adja vissza.
 * Parse hiba esetén szintén a default értékkel tér vissza.
 *
 * @param key A localStorage kulcsa.
 * @param defaultValue Visszatérési érték, ha nincs adat vagy hiba történik.
 * @returns A betöltött adat vagy a default érték.
 */
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

/**
 * Egy megadott kulcs törlése a localStorage-ből.
 *
 * Hibakezeléssel rendelkezik, így hiba esetén sem dob kivételt,
 * csak naplózza a problémát.
 *
 * @param key A törlendő bejegyzés kulcsa.
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);    // Kulcs törlése
  } catch (error) {
    console.error("Hiba az adat törlésekor:", error);
  }
}
