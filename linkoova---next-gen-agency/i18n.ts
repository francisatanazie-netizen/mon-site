import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 1. Définissez toutes vos traductions ici. Chaque clé doit exister dans toutes les langues.
const resources = {
  en: {
    translation: {
      // Clés de Navigation
      "work": "Work",
      "insights": "Insights",
      "pricing": "Pricing",
      "company": "Company",
      "contact": "Contact",
      "get_a_quote": "Get a Quote",
      "global_access": "Global Access",
      
      // Clé du Floating Widget (Bouton "Let's Talk")
      "contact_button_label": "Let's Talk",
      
      // Clés de Contenu (Exemple - vous devrez ajouter le vôtre)
      "welcome_message": "Welcome to the next generation agency.",
      "page_title": "Home"
    }
  },
  fr: {
    translation: {
      // Clés de Navigation
      "work": "Projets",
      "insights": "Analyses",
      "pricing": "Tarification",
      "company": "Entreprise",
      "contact": "Contact",
      "get_a_quote": "Demander un Devis",
      "global_access": "Accès Global",
      
      // Clé du Floating Widget (Bouton "Let's Talk")
      "contact_button_label": "Discutons",
      
      // Clés de Contenu (Exemple - vous devrez ajouter le vôtre)
      "welcome_message": "Bienvenue dans l'agence nouvelle génération.",
      "page_title": "Accueil"
    }
  }
};

i18n
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Lie i18next à React
  .init({
    resources,
    // Langue par défaut si la traduction est manquante
    fallbackLng: "en", 
    // Langues prises en charge
    supportedLngs: ['en', 'fr'],
    // Namespace par défaut (où se trouve 'translation')
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false // React s'occupe déjà de l'échappement (XSS)
    },
    detection: {
      // Ordre de détection de la langue: d'abord localStorage, puis les paramètres du navigateur
      order: ['localStorage', 'navigator'], 
      // Stocker la langue choisie par l'utilisateur
      caches: ['localStorage'], 
    }
  });

export default i18n;
