import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Import de la configuration du moteur de traduction
import i18n from './i18n.ts'; 

// 2. Import du composant Fournisseur de Contexte React-i18next
import { I18nextProvider } from 'react-i18next'; 

// 🛑 NOUVEL IMPORT : Le fournisseur de routage
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 🛑 ÉTAPE 2 : BrowserRouter doit être le parent pour le routage de l'URL */}
    <BrowserRouter>
      {/* I18nextProvider est maintenant à l'intérieur du routeur */}
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
