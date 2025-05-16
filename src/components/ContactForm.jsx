import React, { useState, useEffect } from "react";

export default function ContactForm({ initialData, onSubmit }) {
  const [form, setForm] = useState(initialData);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="full_name"
        placeholder="Nombre"
        value={form.full_name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Dirección"
        value={form.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
