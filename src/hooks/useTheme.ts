import { useEffect, useState } from "preact/hooks";

/**
 * Egyéni React/Preact hook a világos–sötét téma kezelésére.
 *
 * A hook:
 * - tárolja az aktuálisan használt témát (`light` vagy `dark`),
 * - a téma változásakor a `<html>` elemhez hozzáadja vagy eltávolítja
 *   a `light` CSS osztályt,
 * - egy váltófüggvényt (`toggleTheme`) is biztosít, amely felváltva állítja
 *   be a két elérhető témát.
 *
 * @returns Egy objektum, amely tartalmazza az aktuális témát (`theme`)
 *          és a téma váltására szolgáló függvényt (`toggleTheme`).
 */
export function useTheme() {
  // A téma állapota; alapértelmezetten "dark" mód
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  /**
   * A téma változásának figyelése.
   *
   * Ha a téma "light", akkor a <html> elemhez hozzáadjuk a `.light` osztályt,
   * különben eltávolítjuk.  
   * Ezzel lehetővé tesszük, hogy a CSS a teljes UI-ra érvényes stílusokat alkalmazzon.
   */
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  /**
   * Téma váltó függvény.
   *
   * A jelenlegi állapot alapján átvált a másik témára:
   * - dark → light
   * - light → dark
   */
  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  // A hook által visszaadott értékek
  return { theme, toggleTheme };
}
