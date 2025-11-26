import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 1. Import de la configuration du moteur de traduction
import i18n from './i18n.ts'; 

// 2. Import du composant Fournisseur de Contexte React-i18next
import { I18nextProvider } from 'react-i18next'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. ENVELOPPEZ l'application ici pour que useTranslation fonctionne partout */}
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
);
