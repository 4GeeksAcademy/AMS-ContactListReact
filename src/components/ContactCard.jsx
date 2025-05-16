import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteContact } from '../api/contactsAPI';

export default function ContactCard({ contact, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteContact(contact.id);
    onDelete();
  };

  return (
    <div className="contact-card">
      <img src="https://via.placeholder.com/80" alt="Avatar" />
      <div>
        <h3>{contact.full_name}</h3>
        <p>📍 {contact.address}</p>
        <p>📞 {contact.phone}</p>
        <p>📧 {contact.email}</p>
        <button onClick={() => navigate(`/edit/${contact.id}`)}>Editar</button>
        <button onClick={handleDelete} className="danger">Eliminar</button>
      </div>
    </div>
  );
}
