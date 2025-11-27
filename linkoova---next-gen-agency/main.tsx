import React from 'react';
import ReactDOM from 'react-dom/client';
// Assurez-vous d'importer vos styles globaux
import './index.css'; 
// Assurez-vous d'importer votre composant principal
import App from './App';
// Import OBLIGATOIRE pour le routage
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* L'utilisation de BrowserRouter est cruciale. Elle fournit le contexte
          de routage (location, history) à tous les composants enfants (dont App et Navbar) */}
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  // Optionnel : un message d'erreur si l'élément racine n'est pas trouvé
  console.error("Failed to find the root element with ID 'root'");
}
