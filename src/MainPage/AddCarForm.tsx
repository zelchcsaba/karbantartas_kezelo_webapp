import { useState } from "preact/hooks";
import { Car } from "../types/Car";
import "./AddForm.css";

/**
 * Az AddCarForm komponensnek átadott props-ok.
 *
 * @property onClose   Az űrlap bezárását végző callback (általában modal bezárása).
 * @property onSubmit  Callback, amely az új autó objektumot adja vissza a szülő komponensnek.
 */
interface Props {
  onClose: () => void;
  onSubmit: (car: Car) => void;
}

/**
 * Új autó felvételére szolgáló űrlap (modal ablak).
 *
 * Feladatai:
 * - autó alapadatainak (márka, típus, évjárat, kilométer) begyűjtése,
 * - opcionális kép feltöltés kezelése (base64 formátumban),
 * - a beküldött adatból autó objektum összeállítása,
 * - a szülő komponens értesítése az új autó hozzáadásáról.
 *
 * A komponens egy átfedő modalként jelenik meg, amelyet az „Új autó” gomb aktivál.
 *
 * @param props Az űrlap működéséhez szükséges callbackek.
 * @returns A komponens JSX struktúrája.
 */
export function AddCarForm({ onClose, onSubmit }: Readonly<Props>) {
  // Márka, típus, évjárat és kilométer mezők állapota
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(2020);
  const [mileage, setMileage] = useState<number>();

  // Kép (base64 formátumban eltárolva)
  const [image, setImage] = useState<string | undefined>();

  /**
   * Fájl → base64 kódolás konverziós segédfüggvény.
   * 
   * A FileReader segítségével beolvassa a képfájlt
   * és dataURL (base64) formátumban adja vissza.
   *
   * @param file A feltöltött képfájl.
   * @returns A base64-re konvertált kép Promise-ként.
   */
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /**
   * Kép feltöltésének kezelése.
   *
   * - Kiveszi a fájlt az inputból,
   * - base64-re konvertálja,
   * - előnézet megjelenítéséhez elmenti a komponens állapotába.
   */
  const handleImageUpload = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setImage(base64);
  };

  /**
   * Az űrlap beküldésének kezelése.
   *
   * - Megakadályozza az oldal újratöltését,
   * - összeállít egy új `Car` objektumot,
   * - visszaadja azt a szülő komponensnek az `onSubmit` callbacken keresztül.
   *
   * @param e Az űrlap submit eseménye.
   */
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Új autó objektum előállítása
    const newCar: Car = {
      id: crypto.randomUUID(),
      brand,
      model,
      year,
      mileage,
      image,
    };

    onSubmit(newCar); // adat küldése a szülő komponensnek
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h1>Új autó hozzáadása</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Márka:
              <input
                type="text"
                value={brand}
                onInput={(e) => setBrand((e.target as HTMLInputElement).value)}
                required
              />
            </label>

            <label>
              Típus:
              <input
                type="text"
                value={model}
                onInput={(e) => setModel((e.target as HTMLInputElement).value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Évjárat:
              <input
                type="number"
                value={year}
                onInput={(e) =>
                  setYear(Number((e.target as HTMLInputElement).value))
                }
                required
              />
            </label>

            <label>
              Kilométer:
              <input
                type="number"
                value={mileage}
                onInput={(e) =>
                  setMileage(Number((e.target as HTMLInputElement).value))
                }
                required
              />
            </label>
          </div>

          <label>
            Kép (opcionális):
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

          {/* Ha van kép, megjelenik előnézetként */}
          {image && <img src={image} alt="Preview" className="preview-img" />}

          <div className="button-row">
            <button type="submit" className="save-btn">Mentés</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Mégse</button>
          </div>
        </form>
      </div>
    </div>
  );
}
