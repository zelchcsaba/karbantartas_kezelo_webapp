import { render } from "preact";
import Router from "preact-router";
import "./style.css";
import "./style/theme.css";
import CarList from "./MainPage/CarList";
import StatsPage from "./Chart/StatsPage";
import CarDetails from "./CarDetails/CarDetails";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "preact/hooks";

/**
 * Az alkalmazás gyökérkomponense.
 *
 * Ez a komponens:
 * - inicializálja a globális témakezelést,
 * - első belépéskor értesítési engedélyt kér a böngészőtől,
 * - definiálja az alkalmazás útvonalait (routing),
 * - továbbadja a témával kapcsolatos állapotot és a téma váltását kezelő függvényt.
 *
 * @returns A teljes Preact alkalmazás JSX reprezentációja.
 */
function App() {
  // A téma aktuális állapota és a téma váltását végző függvény (custom hookból)
  const { theme, toggleTheme } = useTheme();

  /**
   * Értesítési engedélykérés kezelése.
   *
   * - Ellenőrzi, hogy a böngésző támogatja-e az értesítéseket.
   * - Csak egyszer (első látogatáskor) kéri az engedélyt.
   * - localStorage segítségével jelzi, ha a felhasználó már találkozott a kéréssel.
   */
  useEffect(() => {
    // Ha a böngésző nem támogatja az értesítéseket, nincs teendő
    if (!("Notification" in window)) return;

    // Ha már korábban történt engedélykérés, nem ismételjük meg
    if (localStorage.getItem("notification-permission-asked")) return;

    // Értesítési engedély kérése
    Notification.requestPermission().then((result) => {
      console.log("Notification permission:", result);
      localStorage.setItem("notification-permission-asked", "1");
    });
  }, []);

  return (
    <Router>
      {/*
        Főoldal – az autók listáját jeleníti meg.
        A téma állapota és a váltó függvény továbbadásra kerül.
      */}
      <CarList
        toggleTheme={toggleTheme}
        theme={theme}
        path="/"
      />

      {/*
        Statisztikai oldal – diagramokat és összesített adatokat jelenít meg.
        A témakezelési propok egységes megjelenést biztosítanak.
      */}
      <StatsPage
        toggleTheme={toggleTheme}
        theme={theme}
        path="/stats"
      />

      {/*
        Autó részletei oldal – a kiválasztott autó adatait mutatja.
        A :id paraméter alapján tölti be a megfelelő autót.
      */}
      <CarDetails
        path="/car/:id"
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </Router>
  );
}

// Az App komponens renderelése a HTML #app gyökérelembe
render(<App />, document.getElementById("app")!);
