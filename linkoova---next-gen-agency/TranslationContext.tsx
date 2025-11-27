import React, { createContext, useContext } from 'react';

// =================================================================
// 🚨 DÉFINITION GLOBALE DU CONTEXTE DE TRADUCTION
// =================================================================

export type AppLang = 'fr' | 'en';

export interface TranslationContextType {
    // Le type de la fonction de traduction
    t: (key: string) => string; 
    i18n: {
        language: AppLang;
        changeLanguage: (newLang: AppLang) => void;
    };
}

// Créez le contexte (valeur initiale à null)
export const TranslationContext = createContext<TranslationContextType | null>(null);

// Hook personnalisé pour utiliser le contexte de traduction
export const useTranslationContext = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        // Fallback de sécurité, crucial pour le HOC
        throw new Error("useTranslationContext must be used within a TranslationContext.Provider");
    }
    return context;
};

// =================================================================
// 🚨 Ressources de traduction (À étendre au besoin)
// =================================================================

export const i18nMockResources = {
    en: {
        "work": "Work", "insights": "Insights", "pricing": "Pricing", "company": "Company", "contact": "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
        "hero_title": "The Future is Now.", 
        "hero_subtitle": "Intelligent vision for your digital transformation.",
        "cta_button": "Start Your Project",
        "section_about": "Who We Are",
        // Ajoutez vos autres clés ici
    },
    fr: {
        "work": "Projets", "insights": "Analyses", "pricing": "Tarification", "company": "Entreprise", "contact": "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
        "hero_title": "L'Avenir, C'est Maintenant.", 
        "hero_subtitle": "Une vision intelligente pour votre transformation numérique.",
        "cta_button": "Démarrer Votre Projet",
        "section_about": "Qui Nous Sommes",
        // Ajoutez vos autres clés ici
    }
};

export const LANG_STORAGE_KEY = 'i18nextLng';
