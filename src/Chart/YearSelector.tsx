import "./YearSelector.css";

/**
 * Év kiválasztására szolgáló komponens.
 *
 * @property selectedYear   A jelenleg kiválasztott év.
 * @property onYearChange   Callback, amely akkor fut le, ha a felhasználó új évet választ.
 */
interface Props {
  readonly selectedYear: number;
  readonly onYearChange: (year: number) => void;
}

export default function YearSelector({ selectedYear, onYearChange }: Props) {
  // Az aktuális naptári év meghatározása
  const currentYear = new Date().getFullYear();

  // Évek listája 2000-től az aktuális évig
  const years = [];
  for (let y = 2000; y <= currentYear; y++) {
    years.push(y);
  }

  return (
    // Évválasztó megjelenítése
    <div className="year-select-row">
      <label htmlFor="year-select">Válassz évet:</label>

      {/* Év legördülő lista */}
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) =>
          onYearChange(Number((e.target as HTMLSelectElement).value))
        }
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
