import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  contacts: [
    {
      id: 1,
      full_name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "555-1234",
      address: "Calle Falsa 123"
    },
    {
      id: 2,
      full_name: "María García",
      email: "maria.garcia@email.com",
      phone: "555-5678",
      address: "Avenida Siempre Viva 742"
    }
  ],
  editing: null,
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload, id: Date.now() }],
        error: ""
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload),
        editing: state.editing && state.editing.id === action.payload ? null : state.editing
      };
    case "START_EDIT":
      return { ...state, editing: action.payload, error: "" };
    case "CANCEL_EDIT":
      return { ...state, editing: null, error: "" };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.payload.id ? action.payload : c
        ),
        editing: null,
        error: ""
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}