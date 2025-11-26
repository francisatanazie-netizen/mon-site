// src/components/LanguageSwitcher.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';

// Définition des options de langue et des chemins d'accès aux drapeaux
const languages = [
  { code: 'fr', label: 'Français', flag: '/assets/flags/fr.svg' },
  { code: 'en', label: 'English', flag: '/assets/flags/en.svg' },
];

export const LanguageSwitcher: React.FC = () => {
  // Récupère l'objet i18n qui contient la fonction changeLanguage et la langue actuelle
  const { i18n } = useTranslation(); 
  
  // Fonction pour changer la langue
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  
  // Détermine la langue active
  const currentLangCode = i18n.language; 

  return (
    <div className="flex items-center space-x-2">
      {languages.map(({ code, flag }) => (
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`
            transition-opacity duration-200 p-1 rounded-full 
            ${currentLangCode === code ? 'opacity-100 ring-2 ring-[#D1A954]' : 'opacity-60 hover:opacity-100'}
          `}
          aria-label={`Changer la langue en ${code.toUpperCase()}`}
        >
          <img 
            src={flag} 
            alt={code.toUpperCase()} 
            className="w-6 h-6 object-cover rounded-full" 
          />
        </button>
      ))}
    </div>
  );
};
