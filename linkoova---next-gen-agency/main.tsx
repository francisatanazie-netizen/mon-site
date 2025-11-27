// Fichier : src/main.js (ou index.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
// OBLIGATOIRE
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* 🛑 LA CORRECTION EST ICI : BrowserRouter enveloppe App */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element with ID 'root'");
}
