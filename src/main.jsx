import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { StoreProvider, useStore } from './store.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
