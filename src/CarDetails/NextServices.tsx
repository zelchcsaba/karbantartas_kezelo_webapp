import "./NextServices.css";
import NextServiceItem from "./NextServiceItem";
import { ServiceType } from "../types/ServiceEntry";

interface NextItem {
  label: string;
  type: ServiceType;
  lastDate: string | null;
  nextMileage: number | null;
  nextDate: string | null;
  daysLeft: number | null;
}

interface Props {
  next: NextItem[];
  carMileage: number;
  carId: string; 
}

export const serviceIcons: Record<ServiceType, string> = {
  oil: "🛢️",
  brakes: "🛑",
  inspection: "🔧",
  tires: "🚗",
  other: "⚙️",
};

export default function NextServices({ next, carMileage ,carId}: Readonly<Props>) {
  return (
    <section className="next-services">
      <h2>Következő esedékes karbantartások</h2>

      {/* Rácsba rendezett listanézet */}
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
