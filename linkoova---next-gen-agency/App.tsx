import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import { ArrowUp } from 'lucide-react'; 
// Importez vos composants de section existants (vérifiez les chemins si nécessaire)
import Hero from './components/Hero'; 
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// =================================================================
// 1. DÉFINITION DE BASE ET LOGIQUE DE TRADUCTION MOCKÉE
// =================================================================

type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';
type Language = 'fr' | 'en';

const i18nMockResources = {
    en: {
        "work": "Work", "insights": "Insights", "pricing": "Pricing", "company": "Company", "contact": "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
        "hero_title": "The Future is Now.", "hero_subtitle": "Intelligent vision for your digital transformation.", "cta_button": "Start Your Project", "section_about": "Who We Are", "about_text_1": "We blend AI-driven insights with human creativity to build exceptional digital experiences.", "about_text_2": "Our team of experts guarantees success, from initial concept to final deployment.",
        "hero_tagline": "Next-Gen Agency",
        "hero_title_phrase": "Link all over the world.",
        "hero_description": "We transform local market leaders into international powerhouses using proprietary data intelligence and high-performance engineering.",
        "cta_start_evolution": "Start Your Evolution",
        "cta_analyze_potential": "Analyze Your Potential",
        "stat_trusted": "Trusted by 50+ High-Growth Companies",
        "stat_active": "Active in 3 Continents",
    },
    fr: {
        "work": "Projets", "insights": "Analyses", "pricing": "Tarification", "company": "Entreprise", "contact": "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
        "hero_title": "L'Avenir, C'est Maintenant.", "hero_subtitle": "Une vision intelligente pour votre transformation numérique.", "cta_button": "Démarrer Votre Projet", "section_about": "Qui Nous Sommes", "about_text_1": "Nous mélangeons des analyses basées sur l'IA et la créativité humaine pour bâtir des expériences numériques exceptionnelles.", "about_text_2": "Notre équipe d'experts garantit le succès, du concept initial au déploiement final.",
        "hero_tagline": "Agence Nouvelle Génération",
        "hero_title_phrase": "Lier le monde entier.",
        "hero_description": "Nous transformons les leaders du marché local en puissances internationales grâce à l'intelligence des données propriétaires et à l'ingénierie haute performance.",
        "cta_start_evolution": "Commencez Votre Évolution",
        "cta_analyze_potential": "Analysez Votre Potentiel",
        "stat_trusted": "Approuvé par plus de 50 entreprises à forte croissance",
        "stat_active": "Actif sur 3 Continents",
    }
};

type ResourceKeys = keyof typeof i18nMockResources.en;
interface TranslationContextType {
    t: (key: ResourceKeys) => string;
    i18n: {
        language: Language;
        changeLanguage: (newLang: Language) => void;
    };
}

const TranslationContext = createContext<TranslationContextType | null>(null);
export const useTranslationContext = () => {
    const context = useContext(TranslationContext);
    if (!context) {
        // Fallback sécurisé en cas d'erreur de Provider
        return { t: (key: ResourceKeys) => key as string, i18n: { language: 'en' as Language, changeLanguage: () => {} } };
    }
    return context;
};

const LANG_STORAGE_KEY = 'i18nextLng';

const useTranslationMock = () => {
    // Logique de useTranslationMock
    const initialLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || navigator.language).substring(0, 2);
    const initialLang = initialLangCode === 'fr' ? 'fr' : 'en';

    const [lang, setLang] = useState<Language>(initialLang); 
    const [currentResources, setCurrentResources] = useState(i18nMockResources[lang]);

    const t = useCallback((key: ResourceKeys): string => {
        return currentResources[key] || i18nMockResources.en[key] || key;
    }, [currentResources]);

    const changeLanguage = (newLang: Language) => {
        if (newLang !== lang) {
          setLang(newLang);
          setCurrentResources(i18nMockResources[newLang]);
          localStorage.setItem(LANG_STORAGE_KEY, newLang);
        }
    };
    
    useEffect(() => {
        const handleStorageChange = () => {
            const storedLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || 'en').substring(0, 2);
            const newLang = storedLangCode === 'fr' ? 'fr' : 'en';
            if (newLang !== lang) {
                setLang(newLang);
                setCurrentResources(i18nMockResources[newLang]);
            }
        };
        
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
// 2. COMPOSANT PRINCIPAL APP
// =================================================================

const App: React.FC = () => {
    // 1. Initialisez le mock de traduction ici
    const translationService = useTranslationMock();
    const { t } = translationService;
    
    // 2. Logique de navigation
    const [currentPage, setCurrentPage] = useState<PageView>('home');
    
    // 3. Logique des boutons flottants
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    
    const handleNavigation = (page: PageView, sectionId?: string) => {
        setCurrentPage(page);
        if (page === 'home' && sectionId) {
            // Logique de scroll pour les ancres sur la page d'accueil
            setTimeout(() => {
                document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            }, 10);
        }
    };
    
    // Gère l'événement de scroll pour afficher/masquer le bouton
    useEffect(() => {
        const handleScroll = () => {
            // Affiche le bouton si l'utilisateur a défilé plus de 300px
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Remonte la page en haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Déterminez quel contenu afficher
    const renderPageContent = () => {
        switch (currentPage) {
            case 'home':
                return (
                    <main className="bg-[#0B0B0C] min-h-screen">
                        {/* Affichez toutes vos sections importées */}
                        <Hero />
                        <About />
                        <Services />
                        <Portfolio />
                        <WhyUs />
                        <Testimonials />
                        <Contact />
                        <Footer /> {/* Le footer peut aussi être ici si vous voulez */}
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
        // Le TranslationContext enveloppe l'ensemble de l'application
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

                {/* Footer simple (peut être déplacé dans HomePageContent si vous voulez) */}
                <footer className="bg-black/90 text-gray-500 text-center py-6 border-t border-white/10">
                    © {new Date().getFullYear()} LINK VA. {t('global_access')}
                </footer>
                
                {/* ========================================= */}
                {/* 🚨 ÉLÉMENTS FLOTTANTS INTÉGRÉS */}
                {/* ========================================= */}

                {/* 1. Bouton Flottant "Let's Chat" / "Contact" */}
                <a
                    href="#contact"
                    className="fixed bottom-20 md:bottom-10 left-4 z-50 px-5 py-2.5 bg-[#D1A954] text-[#0B0B0C] text-sm font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(209,169,84,0.5)] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(209,169,84,0.7)]"
                >
                    {t('contact')}
                </a>

                {/* 2. Bouton "Scroll to Top" (Flèche pour remonter en haut) */}
                {showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-4 right-4 z-50 p-3 bg-[#D1A954] text-[#0B0B0C] rounded-full shadow-lg transition-opacity duration-300 hover:bg-white focus:outline-none"
                        aria-label="Remonter en haut"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </button>
                )}
                
            </div>
        </TranslationContext.Provider>
    );
};

export default App;
