import React, { useState, useEffect, useCallback } from 'react';

// =================================================================
// 🚨 CONTOURNEMENT POUR ENVIRONNEMENT MONO-FICHIER (i18n SIMULÉ)
// =================================================================

// 1. Définition des ressources de traduction (doit correspondre à i18n.ts)
// Normalement ceci viendrait d'un fichier externe, mais est inclus ici pour l'auto-compilation.
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

// 3. Détecter et gérer l'état local de la langue
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
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      // Force les autres composants qui utilisent ce mock à se mettre à jour (via React state)
    }
  };

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

export const LanguageSwitcher: React.FC = () => {
  // Utilisation du hook SIMULÉ
  const { i18n } = useTranslationMock(); 
  
  const changeLanguage = (code: string) => {
    // Le code n'a pas besoin de vérifier la dépendance externe, car il appelle la fonction locale
    i18n.changeLanguage(code as 'fr' | 'en');
  };
  
  // La langue actuelle, utilisée pour styliser le bouton actif
  // On utilise substring(0, 2) pour s'assurer que 'fr-FR' ou 'en-US' est bien comparé à 'fr' ou 'en'
  const currentLangCode = i18n.language.substring(0, 2); 

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
