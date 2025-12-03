import { useEffect } from "preact/hooks";
import { serviceIcons } from "./NextServices";
import { ServiceType } from "../types/ServiceEntry";

interface Props {
  label: string;
  type: ServiceType;
  lastDate: string | null;
  nextMileage: number | null;
  nextDate: string | null;
  daysLeft: number | null;
  carMileage: number;
  carId: string;   
}


export default function NextServiceItem({
  label,
  type,
  lastDate,
  nextMileage,
  nextDate,
  daysLeft,
  carMileage,
  carId
}: Readonly<Props>) {

  const noData = lastDate === null;
  const key = `notified-${carId}-${type}`;

  let badgeText = "Nincs adat";
  let badgeClass = "none";
  let expired = false;

  if (!noData) {
    // KM alapú
    if (nextMileage !== null) {
      const kmLeft = nextMileage - carMileage;

      if (kmLeft <= 0) {
        badgeText = "Lejárt";
        badgeClass = "expired";
        expired = true;
      } else if (kmLeft < 3000) {
        badgeText = "Hamarosan";
        badgeClass = "warn";
      } else if (daysLeft !== null) {
        if (daysLeft < 0) {
          badgeText = "Lejárt";
          badgeClass = "expired";
          expired = true;
        } else if (daysLeft < 30) {
          badgeText = "Hamarosan";
          badgeClass = "warn";
        } else {
          badgeText = "Rendben";
          badgeClass = "ok";
        }
      } else {
        badgeText = "Rendben";
        badgeClass = "ok";
      }
    }
    // Idő alapú
    else if (daysLeft !== null) {
      if (daysLeft < 0) {
        badgeText = "Lejárt";
        badgeClass = "expired";
        expired = true;
      } else if (daysLeft < 30) {
        badgeText = "Hamarosan";
        badgeClass = "warn";
      } else {
        badgeText = "Rendben";
        badgeClass = "ok";
      }
    }
  }

useEffect(() => {
  const key = `notified-${carId}-${type}`;

  // Ha már nem expired → engedjük meg, hogy később újra küldhesse
  if (!expired) {
    localStorage.removeItem(key);
    return;
  }

  // Nincs notification támogatás
  if (!("Notification" in window)) return;

  // Ha nincs engedély
  if (Notification.permission !== "granted") return;

  // Ha már küldtük
  if (localStorage.getItem(key)) return;

  // Mentjük, hogy ne küldjük ismét
  localStorage.setItem(key, "1");

  // Push notification
  new Notification("Lejárt karbantartás!", {
    body: `${label} karbantartás esedékes.`,
    icon: "/icon.png"
  });
}, [expired, carId, type, label]);


  return (
    <li className="service-item">
      <span className="icon">{serviceIcons[type]}</span>

      <div className="text">
        <strong>{label}</strong>

        {!noData && (
          <div className="details">
            <p>Utolsó: {lastDate}</p>

            {nextMileage !== null && (
              <p>Következő csere: {nextMileage} km</p>
            )}

            {nextDate !== null && (
              <p>Következő várható: {nextDate}</p>
            )}

            {daysLeft !== null && (
              <p>Hátralévő napok: {daysLeft}</p>
            )}
          </div>
        )}
      </div>

      <span className={`status-badge ${badgeClass}`}>
        {badgeText}
      </span>
    </li>
  );
}
