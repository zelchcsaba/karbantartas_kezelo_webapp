import { useState } from "preact/hooks";
import { Car } from "../types/Car";
import "./AddForm.css";

interface Props {
  onClose: () => void;
  onSubmit: (car: Car) => void;
}

export function AddCarForm({ onClose, onSubmit }: Readonly<Props>) {
  // Márka, típus, év, km állapotok
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number>(2020);
  const [mileage, setMileage] = useState<number>();

  // Kép base64 formátumban
  const [image, setImage] = useState<string | undefined>();

  // Fájl - base64 konvertálás
  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Kép feltöltés
  const handleImageUpload = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const base64 = await convertToBase64(file);
    setImage(base64); // preview mentése
  };

  // Form beküldése
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    // Új autó objektum összeállítása
    const newCar: Car = {
      id: crypto.randomUUID(),
      brand,
      model,
      year,
      mileage,
      image,
    };

    onSubmit(newCar); // adat küldése a parentnek
  };

  return (
    <div className="overlay">
      <div className="modal">
        <h1>Új autó hozzáadása</h1>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Márka:<input
                type="text"
                value={brand}
                onInput={(e) => setBrand((e.target as HTMLInputElement).value)}
                required
              />
            </label>

            <label>
              Típus:<input
                type="text"
                value={model}
                onInput={(e) => setModel((e.target as HTMLInputElement).value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Évjárat:<input
                type="number"
                value={year}
                onInput={(e) =>
                  setYear(Number((e.target as HTMLInputElement).value))
                }
                required
              />
            </label>

            <label>
              Kilométer:<input
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
            Kép (opcionális):<input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>

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
