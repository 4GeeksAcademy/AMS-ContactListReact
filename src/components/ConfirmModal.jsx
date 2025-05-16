import React from "react";

export default function ConfirmModal({ open, onConfirm, onCancel, message }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message || "¿Estás seguro de que deseas eliminar este contacto?"}</p>
        <div className="modal-actions">
          <button className="danger" onClick={onConfirm}>Sí, borrar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: #fff;
          border-radius: 10px;
          padding: 2rem 1.5rem;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
          min-width: 280px;
          max-width: 90vw;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          justify-content: flex-end;
        }
        .danger {
          background: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.5rem 1.2rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}