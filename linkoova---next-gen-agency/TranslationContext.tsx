import React from 'react';

// =================================================================
// 🚨 DÉFINITION GLOBALE DU CONTEXTE DE TRADUCTION
// =================================================================

export type AppLang = 'fr' | 'en';

export interface TranslationContextType {
    // Type des clés de traduction (simplifié pour le mock)
    t: (key: string) => string; 
    i18n: {
        language: AppLang;
        changeLanguage: (newLang: AppLang) => void;
    };
}

// Créez le contexte (valeur initiale à null)
export const TranslationContext = React.createContext<TranslationContextType | null>(null);

// Hook personnalisé pour utiliser le contexte de traduction
export const useTranslationContext = () => {
    const context = React.useContext(TranslationContext);
    if (!context) {
        // Fallback de sécurité, mais devrait être enveloppé par App.tsx
        console.error("useTranslationContext must be used within a TranslationContext.Provider");
        return { t: (key: string) => key, i18n: { language: 'en' as AppLang, changeLanguage: () => {} } };
    }
    return context;
};

// =================================================================
// 🚨 Ressources de traduction (Mock - doit être le même partout)
// =================================================================

export const i18nMockResources = {
    en: {
        "work": "Work", "insights": "Insights", "pricing": "Pricing", "company": "Company", "contact": "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
        "hero_title": "The Future is Now.", 
        "hero_subtitle": "Intelligent vision for your digital transformation.",
        "cta_button": "Start Your Project",
        "section_about": "Who We Are",
        "about_text_1": "We blend AI-driven insights with human creativity to build exceptional digital experiences.",
        "about_text_2": "Our team of experts guarantees success, from initial concept to final deployment.",
    },
    fr: {
        "work": "Projets", "insights": "Analyses", "pricing": "Tarification", "company": "Entreprise", "contact": "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
        "hero_title": "L'Avenir, C'est Maintenant.", 
        "hero_subtitle": "Une vision intelligente pour votre transformation numérique.",
        "cta_button": "Démarrer Votre Projet",
        "section_about": "Qui Nous Sommes",
        "about_text_1": "Nous mélangeons des analyses basées sur l'IA et la créativité humaine pour bâtir des expériences numériques exceptionnelles.",
        "about_text_2": "Notre équipe d'experts garantit le succès, du concept initial au déploiement final.",
    }
};

export const LANG_STORAGE_KEY = 'i18nextLng';
