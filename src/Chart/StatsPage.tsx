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

export default function Statistics({theme, toggleTheme, path}: Readonly<Props>) {
  // Autok es szervizek lekerese
  const { cars } = useCars();
  const { services } = useServices();

  // Aktualis ev es kivalasztott ev allapota
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Eves koltsegek szamitasa autokra
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
      {/* Navigacios sor */}
      <StatNavbar theme={theme} toggleTheme={toggleTheme}/>

      {/* Statisztika fokontenere */}
      <div class="stats-container">
        <h1>Éves szervizköltségek autók szerint</h1>

        {/* Ev valaszto */}
        <YearSelector
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />

        {/* Koltseg grafikon */}
        <CostChart
          selectedYear={selectedYear}
          data={yearlyData}
        />
      </div>
    </div>
  );
}