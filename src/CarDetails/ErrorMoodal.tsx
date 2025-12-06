import "./ErrorModal.css";

/**
 * Az ErrorModal komponens számára szükséges bemeneti paraméterek.
 *
 * @property message  A felhasználónak megjelenítendő hibaüzenet.
 * @property onClose  A modal bezárását végző callback.
 */
interface Props {
  message: string;
  onClose: () => void;
}

/**
 * Egyszerű hibaüzenetet megjelenítő modal ablak.
 *
 * Feladatai:
 * - átlátszó háttér overlay megjelenítése,
 * - egy kiemelt hibaüzenet modal ablakkal,
 * - a felhasználó tájékoztatása a problémáról,
 * - bezáró gomb biztosítása a modal eltüntetéséhez.
 *
 * @param props A komponens működéséhez szükséges adatok.
 * @returns A hibaüzenetet tartalmazó modal JSX elemei.
 */
export default function ErrorModal({ message, onClose }: Readonly<Props>) {
  return (
    // A háttér overlay, ami kitakarja a teljes képernyőt
    <div class="overlay-error">

      {/* A felugró hibaablak */}
      <div class="modal-error">
        <h2 class="error-title">Hiba</h2>

        <p class="error-message">{message}</p>

        {/* Bezáró gomb */}
        <button class="error-btn" onClick={onClose}>
          Értettem
        </button>
      </div>

    </div>
  );
}
