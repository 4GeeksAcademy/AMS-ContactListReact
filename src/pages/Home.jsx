import React, { useState } from "react";
import { useStore } from "../store.jsx";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";

export default function Home() {
  const { state, dispatch } = useStore();
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    dispatch({ type: "DELETE_CONTACT", payload: deleteId });
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleEdit = (contact) => {
    navigate("/add", { state: { editing: contact } });
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
        <button
          onClick={() => navigate("/add")}
          style={{
            background: "#27ae60",
            color: "#fff",
            fontWeight: 500,
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1.2rem",
            cursor: "pointer"
          }}
        >
          Add contact
        </button>
      </div>
      {state.error && <p className="error-message">{state.error}</p>}
      <ul style={{ padding: 0, listStyle: "none", marginTop: "2rem" }}>
        {state.contacts.map((contact) => (
          <li key={contact.id} className="contact-card">
            <div className="contact-info">
              <span className="avatar" title={contact.full_name}>
                <img
                  src="https://randomuser.me/api/portraits/men/1.jpg"
                  alt="Avatar"
                  style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }}
                />
              </span>
              <div className="contact-details">
                <div className="contact-name">{contact.full_name}</div>
                <div className="contact-meta">
                  <span>📧 {contact.email}</span>
                  <span>📞 {contact.phone}</span>
                  <span>📍 {contact.address}</span>
                </div>
              </div>
            </div>
            <div className="contact-actions">
              <span
                onClick={() => handleEdit(contact)}
                title="Editar"
                style={{
                  cursor: "pointer",
                  fontSize: "1.6rem",
                  color: "#888",
                  marginBottom: "0.5rem",
                  transition: "color 0.2s"
                }}
                onMouseOver={e => (e.currentTarget.style.color = "#2d8cff")}
                onMouseOut={e => (e.currentTarget.style.color = "#888")}
              >
                🖉
              </span>
              <span
                onClick={() => handleDelete(contact.id)}
                title="Borrar"
                style={{
                  cursor: "pointer",
                  fontSize: "1.6rem",
                  color: "#888",
                  transition: "color 0.2s"
                }}
                onMouseOver={e => (e.currentTarget.style.color = "#e74c3c")}
                onMouseOut={e => (e.currentTarget.style.color = "#888")}
              >
                🗑
              </span>
            </div>
          </li>
        ))}
      </ul>
      <ConfirmModal
        open={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="¿Estás seguro de que deseas eliminar este contacto? Esta acción no se puede deshacer."
      />
      <style jsx>{`
        .contact-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 1.5px solid #e0e0e0;
          border-radius: 10px;
          padding: 1.1rem 1.3rem;
          margin-bottom: 1.1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.02);
          gap: 1.5rem;
          transition: box-shadow 0.2s;
        }
        .contact-card:hover {
          box-shadow: 0 4px 16px rgba(44,62,80,0.07);
        }
        .contact-info {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          flex: 1;
        }
        .avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #bdbdbd;
          color: #fff;
          font-weight: bold;
          font-size: 1.3rem;
          user-select: none;
          margin-right: 1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .contact-name {
          font-weight: 600;
          color: #2d8cff;
          font-size: 1.13rem;
          margin-bottom: 0.2rem;
        }
        .contact-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.3rem;
          font-size: 1rem;
          color: #555;
        }
        .contact-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-left: 1.5rem;
        }
        .contact-actions button {
          min-width: 80px;
        }
        .contact-actions .danger {
          background: #e74c3c;
          color: #fff;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
