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

/**
 * Egyetlen közelgő szerviz megjelenítéséért felelős elem.
 *
 * Feladatai:
 * - kiszámolja, hogy a szerviz állapota *rendben*, *hamarosan* vagy *lejárt*,
 * - badge színezése és felirata ennek megfelelően,
 * - desktop push értesítés küldése (ha lejárt és még nem értesítettük a usert).
 *
 * @param props A szerviz állapotához szükséges adatok.
 */
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

  let badgeText = "Nincs adat";
  let badgeClass = "none";
  let expired = false;

  // Karbantartás státuszának meghatározása:
  // - Először megnézzük, hogy van-e előző szervizadat (noData = false).
  // - Ha van km-alapú határ (nextMileage):
  //     • kmLeft ≤ 0 → már lejárt,
  //     • kmLeft < 3000 → hamarosan esedékes,
  //     • különben időalapú adat alapján döntünk (Rendben / Hamarosan / Lejárt).
  // - Ha csak időalapú határ van (daysLeft):
  //     • daysLeft < 0 → lejárt,
  //     • daysLeft < 30 → hamarosan esedékes,
  //     • különben rendben.
  // Ennek eredménye a badge szövege és színe.
  if (!noData) {
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
    }
  }

  /**
   * Push értesítés küldése lejárt szerviz esetén.
   *
   * - csak akkor fut, ha a szerviz *lejárt*,
   * - ha a böngésző támogatja az értesítéseket,
   * - ha engedélyezve van,
   * - és ha korábban még nem értesítettük a felhasználót erről a konkrét szervizről.
   */
  useEffect(() => {
    const key = `notified-${carId}-${type}`;

    if (!expired) {
      localStorage.removeItem(key);
      return;
    }

    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;
    if (localStorage.getItem(key)) return;

    localStorage.setItem(key, "1");

    new Notification("Lejárt karbantartás!", {
      body: `${label} karbantartás esedékes.`
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
