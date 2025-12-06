import "../CarDetails/ErrorModal.css";

/**
 * A törlés megerősítő modal bemeneti paraméterei.
 *
 * @property message    A felhasználónak megjelenítendő szöveges kérdés.
 * @property onConfirm  A felhasználó megerősíti a törlést → callback fut.
 * @property onCancel   Kilépés a modalból törlés nélkül.
 */
interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Egyszerű modalkomponens törlés megerősítésére.
 *
 * Feladata:
 * - rákérdez a felhasználónál, biztos-e a törlésben,
 * - két gombot biztosít: „Törlés” és „Mégse”,
 * - nem végez üzleti logikát, csak vizuális módon foglalja keretbe a döntést.
 *
 * @param props A megjelenítendő üzenet és a gombokhoz tartozó callbackek.
 * @returns A modal JSX struktúrája.
 */
export default function DeleteConfirmModal({ message, onConfirm, onCancel }: Readonly<Props>) {
  return (
    // Áttetsző háttér, amely elhomályosítja a mögöttes tartalmat
    <div class="overlay-error">

      {/* A modal tényleges tartalma */}
      <div class="modal-error">

        {/* Cím */}
        <h2 class="error-title">Törlés megerősítése</h2>

        {/* Üzenet a felhasználó felé */}
        <p class="error-message">{message}</p>

        {/* Gombok tároló konténere */}
        <div class="delete-buttons">

          {/* Törlés gomb */}
          <button class="confirm-btn" onClick={onConfirm}>
            Törlés
          </button>

          {/* Mégse gomb */}
          <button class="cancel-btn-delete" onClick={onCancel}>
            Mégse
          </button>
        </div>
      </div>
    </div>
  );
}
