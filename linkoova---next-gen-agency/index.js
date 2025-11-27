// src/index.js (Le SEUL fichier qui doit appeler ReactDOM.createRoot)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assurez-vous que ce chemin est correct pour vos styles
import App from './App';
// Import OBLIGATOIRE pour le routage
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  // Utilisez createRoot pour monter votre application
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* <App /> DOIT être à l'intérieur de <BrowserRouter> pour utiliser useLocation */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  // Ce message s'affichera dans la console si l'élément 'root' n'existe pas dans index.html
  console.error("Failed to find the root element with ID 'root'");
}
