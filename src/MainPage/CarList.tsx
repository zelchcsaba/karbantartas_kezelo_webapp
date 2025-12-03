import { useState } from "preact/hooks";
import { useCars } from "../hooks/useCars";
import { CarCard } from "./CarCard";
import Navbar from "./Navbar";
import "./CarList.css";

interface Props {
  theme: "dark" | "light";
  toggleTheme: () => void;
  path: string; // router miatt
}

export default function CarList({ theme, toggleTheme, path }: Readonly<Props>) {
  // Autok lekerese es muveletei
  const { cars, addCar, removeCar } = useCars();

  // Kereses allapot
  const [search, setSearch] = useState("");

  // Szurt autok lista
  const filtered = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onSearchChange={setSearch}
        onAddCar={addCar}
      />

      <div className="car-list-container">

        {filtered.length === 0 && (
          <div className="no-cars">
            <p>Nincs megjeleníthető autó.</p>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="car-grid">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onDelete={removeCar} />
            ))}
          </div>
        )}
      </div>
    </>
  );

}