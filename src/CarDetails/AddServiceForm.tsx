import { useState } from "preact/hooks";
import "../MainPage/AddForm.css";
import { ServiceEntry, ServiceType } from "../types/ServiceEntry";
import ErrorModal from "./ErrorMoodal";

interface Props {
  carId: string;
  carMileage: number;
  onSubmit: (entry: ServiceEntry) => void;
  onClose: () => void;
}

/**
 * Új szervizbejegyzés hozzáadására szolgáló modal form.
 *
 * Feladatai:
 * - Szerviz adatok (típus, dátum, km, leírás, költség) összegyűjtése
 * - Validálás: a megadott km nem lehet kisebb az autó jelenlegi km-állásánál
 * - Hibakezelés modal segítségével
 * - A létrehozott `ServiceEntry` visszaadása a szülő komponensnek (`onSubmit`)
 *
 * @param carId A szervizelendő autó ID-ja
 * @param carMileage Az autó aktuális km-állása
 * @param onSubmit Callback, amely a kész szervizbejegyzést visszaadja
 * @param onClose A modal bezárását végző függvény
 */
export function AddServiceForm({ carId, carMileage, onSubmit, onClose }: Readonly<Props>) {

  // A kiválasztott szerviz típusa
  const [type, setType] = useState<ServiceType>("oil");

  // A szerviz dátuma (alapértelmezetten ma)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // A szerviz leírása
  const [description, setDescription] = useState("");

  // A szerviz költsége
  const [cost, setCost] = useState(0);

  // A szerviz kilométerállása
  const [mileage, setMileage] = useState(carMileage);

  // Hibák kezelése (pl. rossz km-érték esetén)
  const [error, setError] = useState<string | null>(null);

  /**
   * A form beküldése.
   *
   * Validáció:
   * - A megadott km érték nem lehet kisebb az autó jelenlegi km-állásánál.
   * Ha hibás, akkor hibamodalt jelenítünk meg.
   */
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (mileage < carMileage) {
      setError(
        `A megadott km (${mileage}) kisebb, mint az autó aktuális km értéke (${carMileage}).`
      );
      return;
    }

    // Szerviz bejegyzés összeállítása
    const entry: ServiceEntry = {
      id: crypto.randomUUID(),
      carId,
      type,
      date,
      description,
      cost,
      mileage,
    };

    onSubmit(entry); // szerviz átadása a szülőnek
    onClose();       // modal bezárása
  };

  return (
    <>
      {/* Hiba esetén felugró modal */}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* Egybefüggő overlay háttér */}
      <div class="overlay">
        <div class="modal">
          <h1>Új szerviz bejegyzés</h1>

          {/* Űrlap tartalom */}
          <form class="form-container" onSubmit={handleSubmit}>

            {/* Típus és dátum mezők */}
            <div class="form-row">
              <label>Típus:<select
                  value={type}
                  onInput={(e) =>
                    setType((e.target as HTMLSelectElement).value as ServiceType)
                  }
                >
                  <option value="oil">Olajcsere</option>
                  <option value="brakes">Fékbetét csere</option>
                  <option value="inspection">Műszaki vizsga</option>
                  <option value="tires">Gumicsere</option>
                  <option value="other">Egyéb</option>
                </select>
              </label>

              <label>Dátum:<input
                  type="date"
                  value={date}
                  onInput={(e) =>
                    setDate((e.target as HTMLInputElement).value)
                  }
                />
              </label>
            </div>

            {/* Kilométer és költség mezők */}
            <div class="form-row">
              <label>Kilométer:<input
                  type="number"
                  value={mileage}
                  onInput={(e) =>
                    setMileage(Number((e.target as HTMLInputElement).value))
                  }
                />
              </label>

              <label>Költség (Ft):<input
                  type="number"
                  value={cost}
                  onInput={(e) =>
                    setCost(Number((e.target as HTMLInputElement).value))
                  }
                />
              </label>
            </div>

            {/* Leírás mező */}
            <label>Leírás:<textarea
                value={description}
                onInput={(e) =>
                  setDescription((e.target as HTMLTextAreaElement).value)
                }
              />
            </label>

            {/* Gombok */}
            <div class="button-row">
              <button type="submit" class="save-btn">Mentés</button>
              <button type="button" class="cancel-btn" onClick={onClose}>
                Mégse
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}
