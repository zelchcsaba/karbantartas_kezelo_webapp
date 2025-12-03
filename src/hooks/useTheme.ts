import { useEffect, useState } from "preact/hooks";

export function useTheme() {
  // Aktuális téma állapota (alapértelmezetten dark)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Téma módosításakor a <html> elemre tesszük rá/levesszük a .light class-t
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
  }, [theme]);

  // Téma váltó függvény
  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  // A hook által biztosított értékek
  return { theme, toggleTheme };
}
