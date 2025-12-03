import "./ErrorModal.css";

interface Props {
  message: string;
  onClose: () => void;
}

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
