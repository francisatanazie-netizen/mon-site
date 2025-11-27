import React from 'react';
import ReactDOM from 'react-dom/client';
// L'import de BrowserRouter est supprimé

import './index.css'; 
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* App est rendu directement, sans BrowserRouter */}
      <App />
    </React.StrictMode>,
  );
} else {
  console.error("Failed to find the root element with ID 'root'");
}
