import "./YearSelector.css";

interface Props {
  readonly selectedYear: number;
  readonly onYearChange: (year: number) => void;
}

export default function YearSelector({ selectedYear, onYearChange }: Props) {
  // Aktualis ev
  const currentYear = new Date().getFullYear();

  // Evek listaja 2000-tol aktualis evig
  const years = [];
  for (let y = 2000; y <= currentYear; y++) {
    years.push(y);
  }

  return (
    // Ev valaszto sor
    <div className="year-select-row">
      <label htmlFor="year-select">Válassz évet:</label>

      {/* Ev legordulo menu */}
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => onYearChange(Number((e.target as HTMLSelectElement).value))}
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