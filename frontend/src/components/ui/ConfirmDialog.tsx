import { AlertTriangle, Trash2, X } from "lucide-react";
import Backdrop from "../backdrop";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = "Delete",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Backdrop isOpen={isOpen} onClose={onCancel} labelledBy="confirm-title">
      <div className="confirm-dialog">
        <button
          aria-label="Close confirmation"
          className="icon-button confirm-dialog__close"
          type="button"
          onClick={onCancel}
        >
          <X aria-hidden="true" />
        </button>
        <div className="confirm-dialog__icon">
          <AlertTriangle aria-hidden="true" />
        </div>
        <h2 id="confirm-title">{title}</h2>
        <p>{description}</p>
        <div className="confirm-dialog__actions">
          <button
            className="btn btn--secondary"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="btn btn--danger" type="button" onClick={onConfirm}>
            <Trash2 aria-hidden="true" />
            {confirmLabel}
          </button>
        </div>
      </div>
    </Backdrop>
  );
}
