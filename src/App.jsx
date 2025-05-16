import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import { StoreProvider } from './store.jsx';

export default function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
}
