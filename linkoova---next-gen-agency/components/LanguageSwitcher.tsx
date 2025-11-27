import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslationContext } from '../TranslationContext'; // 👈 IMPORT UNIQUE ET CORRECT

// =================================================================
// 🇫🇷 COMPOSANT LANGUAGE SWITCHER CORRIGÉ (Lit le Contexte)
// =================================================================

const LanguageSwitcher: React.FC = () => {
  // ✅ Utilisation du hook du Contexte global
  const { i18n } = useTranslationContext();
  const { language, changeLanguage } = i18n;

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
  ];

  const handleLanguageChange = (code: string) => {
    // ✅ Appel à la fonction du fournisseur de contexte (App.tsx)
    changeLanguage(code as 'fr' | 'en');
  };
  
  const currentLangCode = language.substring(0, 2); 

  return (
    <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-full border border-white/10 text-xs font-medium uppercase tracking-widest">
      {languages.map(({ code }) => ( 
        <button
          key={code}
          onClick={() => handleLanguageChange(code)}
          className={`
            transition-all duration-200 px-3 py-1 rounded-full 
            ${currentLangCode === code 
              ? 'bg-[#D1A954] text-black shadow-lg' 
              : 'text-gray-400 hover:text-white'
            }
          `}
          aria-label={`Changer la langue en ${code.toUpperCase()}`}
        >
          {code.toUpperCase()} 
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
