import React from "react";
import ContactForm from "../components/ContactForm";
import { useStore } from "../store";

export default function Home() {
  const { state, dispatch } = useStore();

  const handleAdd = (contact) => {
    if (
      !contact.full_name ||
      !contact.email ||
      !contact.phone ||
      !contact.address
    ) {
      dispatch({ type: "SET_ERROR", payload: "Todos los campos son obligatorios" });
      return;
    }
    dispatch({ type: "ADD_CONTACT", payload: contact });
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  };

  const handleEdit = (contact) => {
    dispatch({ type: "START_EDIT", payload: contact });
  };

  const handleUpdate = (updatedContact) => {
    if (
      !updatedContact.full_name ||
      !updatedContact.email ||
      !updatedContact.phone ||
      !updatedContact.address
    ) {
      dispatch({ type: "SET_ERROR", payload: "Todos los campos son obligatorios" });
      return;
    }
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
  };

  const handleCancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  return (
    <div className="container">
      <h1>Agenda de Contactos</h1>
      {state.editing ? (
        <div>
          <ContactForm
            initialData={state.editing}
            onSubmit={handleUpdate}
          />
          <button onClick={handleCancelEdit} style={{ marginTop: "0.5rem" }}>
            Cancelar edición
          </button>
        </div>
      ) : (
        <ContactForm
          initialData={{ full_name: "", email: "", phone: "", address: "" }}
          onSubmit={handleAdd}
        />
      )}
      {state.error && <p className="error-message">{state.error}</p>}
      <ul>
        {state.contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.full_name}</strong> - {contact.email} - {contact.phone} - {contact.address}
            <button onClick={() => handleDelete(contact.id)} style={{ marginLeft: "1rem" }}>
              Borrar
            </button>
            <button onClick={() => handleEdit(contact)} style={{ marginLeft: "0.5rem" }}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
