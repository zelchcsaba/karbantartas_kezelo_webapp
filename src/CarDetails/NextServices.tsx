import "./NextServices.css";
import NextServiceItem from "./NextServiceItem";
import { ServiceType } from "../types/ServiceEntry";

/**
 * Egy közelgő szervizadatot leíró struktúra.
 *
 * @property label        A szerviz elnevezése (pl. „Olajcsere”).
 * @property type         A szerviz típusa.
 * @property lastDate     A legutóbbi elvégzés dátuma.
 * @property nextMileage  Következő esedékesség kilométer alapján.
 * @property nextDate     Következő esedékesség dátum alapján.
 * @property daysLeft     A következő esedékességig hátralévő napok száma.
 */
interface NextItem {
  label: string;
  type: ServiceType;
  lastDate: string | null;
  nextMileage: number | null;
  nextDate: string | null;
  daysLeft: number | null;
}

/**
 * A NextServices komponens bemeneti paraméterei.
 *
 * @property next        A kiszámolt közelgő szervizadatok tömbje.
 * @property carMileage  Az autó aktuális kilométerállása.
 * @property carId       Az autó egyedi azonosítója.
 */
interface Props {
  next: NextItem[];
  carMileage: number;
  carId: string;
}

/**
 * Ikonok a különböző szerviztípusokhoz.
 */
export const serviceIcons: Record<ServiceType, string> = {
  oil: "🛢️",
  brakes: "🛑",
  inspection: "🔧",
  tires: "🚗",
  other: "⚙️",
};

/**
 * A közelgő esedékes szervizeket megjelenítő komponens.
 *
 * Feladatai:
 * - rácsba rendezett listában megjeleníti az összes olyan szervizt,
 *   amely a számítás alapján hamarosan aktuális lesz,
 * - minden elemet továbbad a NextServiceItem komponensnek.
 *
 * @param next        A közelgő szervizek adatai.
 * @param carMileage  Az autó jelenlegi kilométerállása.
 * @param carId       Az autó ID-je, további műveletekhez.
 */
export default function NextServices({ next, carMileage, carId }: Readonly<Props>) {
  return (
    <section className="next-services">
      <h2>Következő esedékes karbantartások</h2>

      {/* A szerviztételek rácsba rendezve */}
      <ul className="services-grid">
        {next.map((item) => (
          <NextServiceItem
            key={item.type}
            {...item}
            carMileage={carMileage}
            carId={carId}
          />
        ))}
      </ul>
    </section>
  );
}
