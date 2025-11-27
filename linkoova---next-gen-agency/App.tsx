import React, { useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import LanguageSwitcher from './components/LanguageSwitcher'; // 👈 NOUVEL IMPORT
import { 
    TranslationContext, 
    useTranslationContext, 
    i18nMockResources, 
    LANG_STORAGE_KEY,
    AppLang,
} from './TranslationContext'; // 👈 IMPORT DU CONTEXTE

// =================================================================
// 🚨 TYPES GLOBALS
// =================================================================
type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';

// =================================================================
// 🚨 HOOK DE TRADUCTION UNIQUE (LA SOURCE DE VÉRITÉ)
// =================================================================

const useTranslationService = () => {
    // 1. Détecte la langue stockée ou par défaut
    const initialLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || navigator.language).substring(0, 2);
    const initialLang = initialLangCode === 'fr' ? 'fr' : 'en';

    const [lang, setLang] = useState<AppLang>(initialLang);

    // 2. Fonction pour changer la langue
    const changeLanguage = useCallback((newLang: AppLang) => {
        if (newLang !== lang) {
            setLang(newLang);
            // Mettre à jour le localStorage pour la persistance
            localStorage.setItem(LANG_STORAGE_KEY, newLang);
        }
    }, [lang]);

    // 3. Fonction de traduction
    const t = useCallback((key: keyof typeof i18nMockResources.en): string => {
        const currentResources = i18nMockResources[lang];
        // La mise à jour des ressources est gérée par la dépendance [lang]
        return currentResources[key] || i18nMockResources.en[key] || key;
    }, [lang]);

    // 4. Mémoriser la valeur du contexte pour éviter les re-renders inutiles
    const contextValue = useMemo(() => ({
        t,
        i18n: {
            language: lang,
            changeLanguage
        }
    }), [t, lang, changeLanguage]);

    return contextValue;
};


// =================================================================
// 🇫🇷 NOUVEAUX COMPOSANTS SECTIONS (Simulés)
// Ils utilisent tous le hook useTranslationContext
// =================================================================

const HeroSection: React.FC = () => {
    const { t } = useTranslationContext(); // Lit le contexte
    // ... (Le reste du code de HeroSection reste le même)
    return (
        <section className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-white bg-black/80">
            <div className="text-center max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#D1A954]">
                    {t('hero_title')}
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300 font-light">
                    {t('hero_subtitle')}
                </p>
                <button className="px-8 py-3 bg-[#D1A954] text-black text-lg font-bold uppercase tracking-widest rounded-full shadow-lg hover:bg-[#E0B96A] transition-all duration-300 transform hover:scale-105">
                    {t('cta_button')}
                </button>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    const { t } = useTranslationContext(); // Lit le contexte
    // ... (Le reste du code de AboutSection reste le même)
    return (
        <section id="why-us" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-[#D1A954]">
                    {t('section_about')}
                </h2>
                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    <div className="md:w-1/2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                        <p className="text-lg mb-4 text-gray-300">
                            {t('about_text_1')}
                        </p>
                    </div>
                    <div className="md:w-1/2 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
                        <p className="text-lg text-gray-300">
                            {t('about_text_2')}
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
    
    // 1. Initialisez le service de traduction unique
    const translationService = useTranslationService();
    const { t } = translationService;
    
    // Fonction de navigation
    const handleNavigation = (page: PageView, sectionId?: string) => {
        setCurrentPage(page);
        if (page === 'home' && sectionId) {
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
                        <HeroSection />
                        <AboutSection />
                        <div id="contact" className="h-40 bg-gray-950 flex items-center justify-center text-gray-600">
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
                    .glass {
                        background-color: rgba(11, 11, 12, 0.9);
                        backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}</style>

                <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
                
                {renderPageContent()}

                <footer className="bg-black/90 text-gray-500 text-center py-6 border-t border-white/10">
                    © {new Date().getFullYear()} LINK VA. {t('global_access')}
                </footer>
            </div>
        </TranslationContext.Provider>
    );
};

export default App;
