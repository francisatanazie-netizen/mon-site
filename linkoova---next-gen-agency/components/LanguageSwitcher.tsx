import React from 'react';
import { useTranslation } from 'react-i18next';

// 1. IMPORT DES FICHIERS SVG AVEC ?react
// C'est nécessaire dans la plupart des configs Vite/React pour que le SVG soit un composant
import FlagFR from '../assets/fr.svg?react'; 
import FlagEN from '../assets/en.svg?react'; 

// Définition des options de langue
const languages = [
  { code: 'fr', label: 'Français', flag: FlagFR },
  { code: 'en', label: 'English', flag: FlagEN },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation(); 
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  
  const currentLangCode = i18n.language; 

  return (
    <div className="flex items-center space-x-2">
      {languages.map(({ code, flag: FlagComponent }) => ( // Renommer 'flag' en 'FlagComponent' pour le JSX
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`
            transition-opacity duration-200 p-1 rounded-full 
            ${currentLangCode === code ? 'opacity-100 ring-2 ring-[#D1A954]' : 'opacity-60 hover:opacity-100'}
          `}
          aria-label={`Changer la langue en ${code.toUpperCase()}`}
        >
          {/* UTILISATION DU COMPOSANT SVG */}
          <FlagComponent className="w-6 h-6 object-cover rounded-full" /> 
        </button>
      ))}
    </div>
  );
};
