import React, { useState, useEffect, useCallback } from 'react';
import { Globe } from 'lucide-react';

// =================================================================
// 🚨 CONTOURNEMENT POUR ENVIRONNEMENT MONO-FICHIER (i18n SIMULÉ)
// Ce hook permet au composant d'être autonome pour le changement de langue
// et de se synchroniser avec App.tsx via localStorage.
// =================================================================

// 1. Définition des ressources de traduction (doit correspondre à App.tsx)
const i18nMockResources = {
  en: {
    work: "Work", insights: "Insights", pricing: "Pricing", company: "Company", contact: "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
  },
  fr: {
    work: "Projets", insights: "Analyses", pricing: "Tarification", company: "Entreprise", contact: "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
  }
};

// 2. Clé de stockage local pour persister la langue
const LANG_STORAGE_KEY = 'i18nextLng';

// 3. Détecter et gérer l'état local de la langue (Hook de traduction complet)
const useTranslationMock = () => {
  // Détecte la langue du navigateur ou utilise celle stockée, par défaut 'en'
  const initialLang = localStorage.getItem(LANG_STORAGE_KEY) || navigator.language.substring(0, 2) || 'en';
  const [lang, setLang] = useState<'fr' | 'en'>(initialLang === 'fr' ? 'fr' : 'en');
  const [currentResources, setCurrentResources] = useState(i18nMockResources[lang]);

  // Fonction de traduction
  const t = useCallback((key: keyof typeof i18nMockResources.en): string => {
    return currentResources[key] || i18nMockResources.en[key] || key;
  }, [currentResources]);

  // Fonction pour changer la langue
  const changeLanguage = (newLang: 'fr' | 'en') => {
    if (newLang !== lang) {
      setLang(newLang);
      setCurrentResources(i18nMockResources[newLang]);
      // Écrit dans localStorage, ce qui déclenchera la mise à jour dans App.tsx et Navbar.tsx
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    }
  };
    
  // Synchronisation avec les changements externes (polling pour les autres composants)
  useEffect(() => {
    const handleStorageChange = () => {
        const storedLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || 'en').substring(0, 2);
        const newLang = storedLangCode === 'fr' ? 'fr' : 'en';
        if (newLang !== lang) {
            setLang(newLang);
            setCurrentResources(i18nMockResources[newLang]);
        }
    };
    
    // Assure que la langue initiale est bien définie dans localStorage
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    
    // Polling pour la synchronisation
    const interval = setInterval(handleStorageChange, 500); 

    return () => clearInterval(interval);
  }, [lang]);


  return { 
    t, 
    i18n: { 
      language: lang, 
      changeLanguage 
    } 
  };
};

// =================================================================
// 🇫🇷 COMMENCE LE COMPOSANT LANGUAGE SWITCHER
// =================================================================

// Définition des options de langue
const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
];

const LanguageSwitcher: React.FC = () => {
  // Utilisation du hook SIMULÉ
  const { i18n } = useTranslationMock(); 
  
  const handleLanguageChange = (code: string) => {
    // Appel à la fonction de changement de langue du mock
    i18n.changeLanguage(code as 'fr' | 'en');
  };
  
  // La langue actuelle, utilisée pour styliser le bouton actif
  const currentLangCode = i18n.language.substring(0, 2); 

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
          {/* AFFICHAGE DU CODE DE LA LANGUE (FR ou EN) */}
          {code.toUpperCase()} 
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
