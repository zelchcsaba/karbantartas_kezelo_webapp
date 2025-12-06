import { useState } from "preact/hooks";
import { useCars } from "../hooks/useCars";
import { useServices } from "../hooks/useServices";
import "./StatsPage.css";
import YearSelector from "./YearSelector";
import CostChart from "./CostChart";
import StatNavbar from "./StatNavBar";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  path: string;
}

/**
 * A statisztikai oldal fő komponense.
 *
 * Feladata:
 * - betölti az autók és szervizbejegyzések adatait,
 * - összesíti az adott évre vonatkozó szervizköltségeket,
 * - grafikonon jeleníti meg az autók éves költségeit,
 * - biztosít egy évválasztó UI elemet.
 *
 * @param props Téma, téma-váltó és routerhez szükséges adatok.
 */
export default function Statistics({theme, toggleTheme, path}: Readonly<Props>) {
  // Autók és szervizek betöltése a custom hookokból
  const { cars } = useCars();
  const { services } = useServices();

  // Aktuális év és kiválasztott év állapota
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  /**
   * Az adott évhez tartozó teljes szervizköltség kiszámítása minden autóra.
   * - A szűrés év és autó ID alapján történik.
   * - A költségek összeadása reduce segítségével.
   */
  const yearlyData = cars.map((car) => {
    const totalCost = services
      .filter(
        (s) =>
          s.carId === car.id &&
          new Date(s.date).getFullYear() === selectedYear
      )
      .reduce((sum, s) => sum + s.cost, 0);

    return {
      carName: `${car.brand} ${car.model}`,
      cost: totalCost,
    };
  });

  return (
    <div>
      {/* Felső navigációs sáv */}
      <StatNavbar theme={theme} toggleTheme={toggleTheme}/>

      <div class="stats-container">
        <h1>Éves szervizköltségek autók szerint</h1>

        {/* Év kiválasztó komponens */}
        <YearSelector
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {/* Költségek megjelenítése grafikonon */}
        <CostChart
          selectedYear={selectedYear}
          data={yearlyData}
        />
      </div>
    </div>
  );
}
