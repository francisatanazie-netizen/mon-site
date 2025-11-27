// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// L'importation de 'index.css' a été supprimée.

import App from './App';
// Importez le routeur
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  // Démarrez React en enveloppant <App /> dans <BrowserRouter>
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Échec: Impossible de trouver l'élément racine avec l'ID 'root'");
}
