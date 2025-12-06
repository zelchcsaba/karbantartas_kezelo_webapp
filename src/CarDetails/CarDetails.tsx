import { route } from "preact-router";
import "./CarDetails.css";
import { useCars } from "../hooks/useCars";
import { useServices } from "../hooks/useServices";
import { calculateNextServices } from "../utils/serviceCalc";
import CarHeader from "./CarHeader";
import NextServices from "./NextServices";
import ServiceList from "./ServiceList";
import Navbar2 from "./Navbar2";

/**
 * A CarDetails komponenshez tartozó props.
 *
 * @property theme        Az alkalmazás jelenlegi témája.
 * @property toggleTheme  Téma váltására szolgáló függvény.
 * @property id           Az autó azonosítója az útvonalból.
 * @property path         A router által használt útvonal információ.
 */
interface Props {
    theme: "dark" | "light";
    toggleTheme: () => void;
    readonly id?: string;
    readonly path?: string;
}

/**
 * Egy konkrét autó részletes adatlapját megjelenítő komponens.
 *
 * Feladatai:
 * - autóadatok beolvasása ID alapján,
 * - autó szerviztörténetének lekérése,
 * - következő esedékes szervizek kiszámítása,
 * - új szerviz felvétele és futásteljesítmény frissítése,
 * - részletező UI-elemek megjelenítése (fejléc, szervizlista, következő szervizek).
 *
 * @param props A működéshez szükséges téma és az útvonali ID.
 * @returns Részletes autóadatokat megjelenítő JSX.
 */
export default function CarDetails({ theme, toggleTheme, id, path }: Readonly<Props>) {

    // Autók és km-frissítés hookból
    const { cars, updateCarMileage } = useCars();

    // Szervizek kezelése
    const { getByCarId, addService } = useServices();

    // Ha nincs átadva ID → nem lehet részletezni
    if (!id) return <p>Nincs autó ID.</p>;

    // Autó keresése ID alapján
    const car = cars.find((c) => c.id === id);

    // Ha nincs ilyen autó
    if (!car)
        return (
            <div>
                <button onClick={() => route("/")}>Vissza</button>
                <p>Autó nem található.</p>
            </div>
        );

    // Szervizlista és következő esedékességek
    const services = getByCarId(car.id);
    const next = calculateNextServices(car.mileage, services);

    /**
     * Új szerviz hozzáadása:
     * - elmentjük a szervizt,
     * - frissítjük az autó futásteljesítményét (ha nagyobb az eddiginél).
     */
    const handleAddService = (entry) => {
        addService(entry);
        updateCarMileage(car.id, entry.mileage);
    };

    return (
        <>
            {/* Felső navigációs sáv */}
            <Navbar2
                theme={theme}
                toggleTheme={toggleTheme}
                carId={car.id}
                carMileage={car.mileage}
                onAddService={handleAddService}
            />

            {/* Főkonténer */}
            <div class="car-details-container">

                {/* Autó fejléce (kép + alapadatok) */}
                <CarHeader car={car} />

                {/* Következő esedékes szervizek */}
                <NextServices next={next} carMileage={car.mileage} carId={car.id} />

                {/* Szerviztörténet listázása */}
                <ServiceList services={services} />
            </div>
        </>
    );
}
