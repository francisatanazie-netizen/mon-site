import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
// Importez tous les autres composants d'écran dont vous avez besoin ici
// import HeroSection from './components/HeroSection'; 
// import PricingPage from './components/PricingPage'; 
// import WorkPage from './components/WorkPage'; 
// import CompanyPage from './components/CompanyPage'; 

type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';

// =================================================================
// 🚨 DÉFINITION DU CONTEXTE DE TRADUCTION
// =================================================================
// Définition des types pour le contexte
interface TranslationContextType {
    t: (key: keyof typeof i18nMockResources.en) => string;
    i18n: {
        language: 'fr' | 'en';
        changeLanguage: (newLang: 'fr' | 'en') => void;
    };
}

// Créez le contexte avec des valeurs par défaut nulles
const TranslationContext = createContext<TranslationContextType | null>(null);

// Hook personnalisé pour utiliser le contexte de traduction
const useTranslationContext = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        // Cela ne devrait jamais arriver si App est correctement rendu
        return { t: (key: string) => key, i18n: { language: 'en', changeLanguage: () => {} } };
    }
    return context;
};

// =================================================================
// 🚨 LOGIQUE DE TRADUCTION SIMULÉE (MOCK) - DÉPLACÉE ICI
// =================================================================

const i18nMockResources = {
  en: {
    "work": "Work", "insights": "Insights", "pricing": "Pricing", "company": "Company", "contact": "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
    // NOUVELLES CLÉS DE TRADUCTION POUR LE CONTENU
    "hero_title": "The Future is Now.", 
    "hero_subtitle": "Intelligent vision for your digital transformation.",
    "cta_button": "Start Your Project",
    "section_about": "Who We Are",
    "about_text_1": "We blend AI-driven insights with human creativity to build exceptional digital experiences.",
    "about_text_2": "Our team of experts guarantees success, from initial concept to final deployment.",
  },
  fr: {
    "work": "Projets", "insights": "Analyses", "pricing": "Tarification", "company": "Entreprise", "contact": "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
    // NOUVELLES CLÉS DE TRADUCTION POUR LE CONTENU
    "hero_title": "L'Avenir, C'est Maintenant.", 
    "hero_subtitle": "Une vision intelligente pour votre transformation numérique.",
    "cta_button": "Démarrer Votre Projet",
    "section_about": "Qui Nous Sommes",
    "about_text_1": "Nous mélangeons des analyses basées sur l'IA et la créativité humaine pour bâtir des expériences numériques exceptionnelles.",
    "about_text_2": "Notre équipe d'experts garantit le succès, du concept initial au déploiement final.",
  }
};

const LANG_STORAGE_KEY = 'i18nextLng';

const useTranslationMock = () => {
  // Détecte la langue stockée ou par défaut
  const initialLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || navigator.language).substring(0, 2);
  const initialLang = initialLangCode === 'fr' ? 'fr' : 'en';

  const [lang, setLang] = useState<'fr' | 'en'>(initialLang); 
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
      // NOTE IMPORTANTE: Nous utilisons le localStorage pour que la Navbar puisse se synchroniser.
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
// 🇫🇷 NOUVEAU COMPOSANT : SECTIONS PRINCIPALES (SIMULÉES)
// C'est ici que la traduction sera appliquée.
// =================================================================

const HeroSection: React.FC = () => {
    // Utilisation du hook contextuel pour la traduction
    const { t } = useTranslationContext();

    return (
        <section className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-white bg-black/80">
            <div className="text-center max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#D1A954]">
                    {t('hero_title')} {/* Clé traduite */}
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300 font-light">
                    {t('hero_subtitle')} {/* Clé traduite */}
                </p>
                <button className="px-8 py-3 bg-[#D1A954] text-black text-lg font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-[#E0B96A] transition-all duration-300 transform hover:scale-105">
                    {t('cta_button')} {/* Clé traduite */}
                </button>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    // Utilisation du hook contextuel pour la traduction
    const { t } = useTranslationContext();

    return (
        <section id="why-us" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-[#D1A954]">
                    {t('section_about')} {/* Clé traduite */}
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    <div className="md:w-1/2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                        <p className="text-lg mb-4 text-gray-300">
                            {t('about_text_1')} {/* Clé traduite */}
                        </p>
                    </div>
                    <div className="md:w-1/2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                        <p className="text-lg text-gray-300">
                            {t('about_text_2')} {/* Clé traduite */}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};


// =================================================================
// 🇫🇷 COMPOSANT PRINCIPAL APP
// =================================================================

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<PageView>('home');
    
    // 1. Initialisez le mock de traduction ici (au niveau le plus haut)
    const translationService = useTranslationMock();
    const { t, i18n } = translationService;
    
    // Fonction de navigation
    const handleNavigation = (page: PageView, sectionId?: string) => {
        setCurrentPage(page);
        if (page === 'home' && sectionId) {
            // Logique de scroll pour les ancres sur la page d'accueil
            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        }
    };
    
    // Déterminez quel contenu afficher
    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <main className="bg-[#0B0B0C] min-h-screen">
                        {/* Affichez les sections principales */}
                        <HeroSection />
                        <AboutSection />
                        {/* Vous ajouterez d'autres sections ici... */}
                        <div id="contact" className="h-40 bg-gray-950 flex items-center justify-center text-gray-600">
                           {/* Espace pour le formulaire de contact */}
                           Contactez-nous ici.
                        </div>
                    </main>
                );
            case 'pricing':
                return <div className="pt-24 min-h-screen bg-gray-950 text-white flex justify-center items-center text-3xl">{t('pricing')} Page (Non implémentée)</div>;
            case 'work':
                return <div className="pt-24 min-h-screen bg-gray-950 text-white flex justify-center items-center text-3xl">{t('work')} Page (Non implémentée)</div>;
            case 'company':
                return <div className="pt-24 min-h-screen bg-gray-950 text-white flex justify-center items-center text-3xl">{t('company')} Page (Non implémentée)</div>;
            case 'quote':
                return <div className="pt-24 min-h-screen bg-gray-950 text-white flex justify-center items-center text-3xl">{t('get_a_quote')} Page (Non implémentée)</div>;
            default:
                return null;
        }
    };

    return (
        // 2. Le TranslationContext enveloppe l'ensemble de l'application
        <TranslationContext.Provider value={translationService}>
            <div className="font-sans antialiased text-white">
                <style>{`
                    /* Style CSS de fond pour l'effet glass dans la navbar */
                    .glass {
                        background-color: rgba(11, 11, 12, 0.9);
                        backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    /* Utilisation de la police Inter (assumée par Tailwind) */
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}</style>

                <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
                
                {renderPageContent()}

                {/* Footer simple */}
                <footer className="bg-black/90 text-gray-500 text-center py-6 border-t border-white/10">
                    © {new Date().getFullYear()} LINK VA. {t('global_access')}
                </footer>
            </div>
        </TranslationContext.Provider>
    );
};

export default App;
