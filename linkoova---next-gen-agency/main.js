// src/index.js (L'unique point d'entrée valide pour votre HTML)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Assurez-vous que ce chemin est correct pour vos styles globaux
import App from './App';
// 1. Importez BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  // 2. Enveloppez votre application dans BrowserRouter
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element with ID 'root'");
}
