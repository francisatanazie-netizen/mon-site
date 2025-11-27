// src/index.js - Code d'initialisation FINAL

import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Assurez-vous d'importer vos styles globaux
import './index.css'; 
// 2. Importez votre composant principal
import App from './App';
// 3. Importez l'outil de routage
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  // Démarre le rendu de l'application React
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* Le <BrowserRouter> est OBLIGATOIRE. Il fournit le contexte de navigation 
          à App, Navbar, et à tous les autres composants qui utilisent useLocation/Link. */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element with ID 'root'");
}
