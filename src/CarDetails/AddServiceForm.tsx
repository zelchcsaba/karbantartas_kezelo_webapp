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

export function AddServiceForm({ carId, carMileage, onSubmit, onClose }: Readonly<Props>) {

  // A kiválasztott szerviz típusa
  const [type, setType] = useState<ServiceType>("oil");

  // A szerviz dátuma (alapértelmezetten ma)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // A szerviz leírása
  const [description, setDescription] = useState("");

  // A szerviz költsége
  const [cost, setCost] = useState(0);

  // Milyen kilométernél történt a szerviz
  const [mileage, setMileage] = useState(carMileage);

  // Hibák kezelése, például ha túl kicsi a megadott kilométer
  const [error, setError] = useState<string | null>(null);

  // A form elküldése
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // A kilométer nem lehet kisebb, mint a jármű jelenlegi km állása
    if (mileage < carMileage) {
      setError(
        `A megadott km (${mileage}) kisebb, mint az autó aktuális km értéke (${carMileage}).`
      );
      return;
    }

    // Az új szerviz bejegyzés összeállítása
    const entry: ServiceEntry = {
      id: crypto.randomUUID(),
      carId,
      type,
      date,
      description,
      cost,
      mileage,
    };

    // A szerviz hozzáadása
    onSubmit(entry);

    // A modal bezárása
    onClose();
  };

  return (
    <>
      {/* Ha hiba van, megjelenik a hiba modal */}
      {error && (
        <ErrorModal
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {/* A háttér overlay */}
      <div class="overlay">
        <div class="modal">
          <h1>Új szerviz bejegyzés</h1>

          {/* A form tartalma */}
          <form class="form-container" onSubmit={handleSubmit}>

            {/* Típus és dátum mezők */}
            <div class="form-row">
              <label>Típus: <select
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

              <label>Dátum: <input
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
              <label>
                <span>Kilométer:</span>
                <input
                  type="number"
                  value={mileage}
                  onInput={(e) =>
                    setMileage(Number((e.target as HTMLInputElement).value))
                  }
                />
              </label>

              <label>
                <span>Költség (Ft):</span>
                <input
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
