import React from "react";
import ContactForm from "../components/ContactForm";
import { useStore } from "../store.jsx";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddContact() {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Si venimos a editar, recibimos el contacto por state
  const editing = location.state?.editing || null;

  const handleSubmit = (contact) => {
    if (
      !contact.full_name ||
      !contact.email ||
      !contact.phone ||
      !contact.address
    ) {
      dispatch({ type: "SET_ERROR", payload: "Todos los campos son obligatorios" });
      return;
    }
    if (editing) {
      dispatch({ type: "UPDATE_CONTACT", payload: { ...contact, id: editing.id } });
    } else {
      dispatch({ type: "ADD_CONTACT", payload: contact });
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>{editing ? "Editar contacto" : "Agregar contacto"}</h1>
      {state.error && <p className="error-message">{state.error}</p>}
      <ContactForm
        initialData={
          editing
            ? editing
            : { full_name: "", email: "", phone: "", address: "" }
        }
        onSubmit={handleSubmit}
      />
      <button onClick={handleCancel} style={{ marginTop: "0.5rem" }}>
        Cancelar
      </button>
    </div>
  );
}