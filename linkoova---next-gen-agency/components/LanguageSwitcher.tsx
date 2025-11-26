import React from 'react';
import { useTranslation } from 'react-i18next';

// Nous utilisons le texte FR/EN pour garantir la compatibilité
// Les imports SVG sont retirés.

// Définition des options de langue
const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation(); 
  
  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };
  
  // La langue actuelle, utilisée pour styliser le bouton actif
  const currentLangCode = i18n.language; 

  return (
    <div className="flex items-center space-x-2">
      {languages.map(({ code }) => ( 
        <button
          key={code}
          onClick={() => changeLanguage(code)}
          className={`
            transition-all duration-200 py-1 px-2 text-xs font-bold uppercase rounded-md border 
            ${currentLangCode === code 
              ? 'border-[#D1A954] text-[#D1A954] bg-[#D1A954]/10' 
              : 'border-white/20 text-gray-400 hover:text-white hover:border-white/40'
            }
          `}
          aria-label={`Changer la langue en ${code.toUpperCase()}`}
        >
          {/* AFFICHAGE DU CODE DE LA LANGUE (FR ou EN) */}
          {code.toUpperCase()} 
        </button>
      ))}
    </div>
  );
};
