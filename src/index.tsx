import { render } from "preact";
import Router from "preact-router";
import "./style.css";
import "./style/theme.css";
import CarList from "./MainPage/CarList";
import StatsPage from "./Chart/StatsPage";
import CarDetails from "./CarDetails/CarDetails";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "preact/hooks";

function App() {
  // Téma állapota és váltó függvény
  const { theme, toggleTheme } = useTheme();

  // Értesítés engedélykérés első látogatáskor
  useEffect(() => {
    if (!("Notification" in window)) return;

    // Ha már kértük, nem kérjük újra
    if (localStorage.getItem("notification-permission-asked")) return;

    // Jogosultság kérése
    Notification.requestPermission().then((result) => {
      console.log("Notification permission:", result);
      localStorage.setItem("notification-permission-asked", "1");
    });
  }, []);

  return (
    <Router>
      {/* Főoldal (autók listája) */}
      <CarList
        toggleTheme={toggleTheme}
        theme={theme}
        path="/"
      />

      {/* Statisztika oldal */}
      <StatsPage
        toggleTheme={toggleTheme}
        theme={theme}
        path="/stats"
      />

      {/* Autó részletek oldal */}
      <CarDetails
        path="/car/:id"
        toggleTheme={toggleTheme}
        theme={theme}
      />
    </Router>
  );
}

render(<App />, document.getElementById("app")!);
