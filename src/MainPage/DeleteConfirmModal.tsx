import "../CarDetails/ErrorModal.css";

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ message, onConfirm, onCancel }: Readonly<Props>) {
  return (
    // Attetszos hatter
    <div class="overlay-error">
      {/* Modal ablak */}
      <div class="modal-error">
        {/* Cim */}
        <h2 class="error-title">Törlés megerősítése</h2>

        {/* Uzenet */}
        <p class="error-message">{message}</p>

        {/* Gombok kontenere */}
        <div class="delete-buttons">
          {/* Torles gomb */}
          <button class="confirm-btn" onClick={onConfirm}>
            Törlés
          </button>

          {/* Megse gomb */}
          <button class="cancel-btn-delete" onClick={onCancel}>
            Mégse
          </button>
        </div>
      </div>
    </div>
  );
}