import { route } from "preact-router";
import "./CarDetails.css";
import { useCars } from "../hooks/useCars";
import { useServices } from "../hooks/useServices";
import { calculateNextServices } from "../utils/serviceCalc";
import CarHeader from "./CarHeader";
import NextServices from "./NextServices";
import ServiceList from "./ServiceList";
import Navbar2 from "./Navbar2";

interface Props {
    theme: "dark" | "light";
    toggleTheme: () => void;
    readonly id?: string;
    readonly path?: string;
}

export default function CarDetails({theme, toggleTheme, id, path}: Readonly<Props>) {
    // Autok es szervizek lekerese
    const { cars, updateCarMileage } = useCars();
    const { getByCarId, addService } = useServices();

    // ID ellenorzes
    if (!id) return <p>Nincs autó ID.</p>;

    // Auto megkeresese
    const car = cars.find((c) => c.id === id);

    // Ha nincs auto
    if (!car)
        return (
            <div>
                <button onClick={() => route("/")}>Vissza</button>
                <p>Autó nem található.</p>
            </div>
        );

    // Szervizek es kovetkezo esedekessegek szamitasa
    const services = getByCarId(car.id);
    const next = calculateNextServices(car.mileage, services);

    // Uj szerviz hozzaadasa es km frissites
    const handleAddService = (entry) => {
        addService(entry);
        updateCarMileage(car.id, entry.mileage);
    };

    return (
        <>
            {/* Navigacios sor */}
            <Navbar2
                theme={theme}
                toggleTheme={toggleTheme}
                carId={car.id}
                carMileage={car.mileage}
                onAddService={handleAddService}
            />

            {/* Reszletek fokontenere */}
            <div class="car-details-container">
                {/* Auto fejlec */}
                <CarHeader car={car} />

                {/* Kovetkezo szervizek */}
                <NextServices next={next} carMileage={car.mileage} carId={car.id} />

                {/* Szervizek listaja */}
                <ServiceList services={services} />
            </div>
        </>
    );
}