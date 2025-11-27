import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar'; // Le Navbar corrigé utilisant le Contexte
import LanguageSwitcher from './components/LanguageSwitcher'; // Importé mais utilisé dans Navbar

// =================================================================
// 🚨 IMPORTS DE VOS ANCIENS COMPOSANTS (À RÉTABLIR)
// =================================================================
import Hero from './components/Hero'; 
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Pricing from './components/Pricing';
import Quote from './components/Quote';
import Work from './components/Work';
import Company from './components/Company';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
// -----------------------------------------------------------------

import { 
    TranslationContext, 
    useTranslationContext, 
    i18nMockResources, 
    LANG_STORAGE_KEY,
    AppLang,
} from './TranslationContext'; 
import { PageView } from './types'; // 👈 VOTRE TYPE PAGEVIEW

// =================================================================
// 🚨 HOOK DE TRADUCTION UNIQUE (LA SOURCE DE VÉRITÉ) - Identique à l'étape précédente
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
            localStorage.setItem(LANG_STORAGE_KEY, newLang);
        }
    }, [lang]);

    // 3. Fonction de traduction
    const t = useCallback((key: keyof typeof i18nMockResources.en): string => {
        const currentResources = i18nMockResources[lang];
        return currentResources[key] || i18nMockResources.en[key] || key;
    }, [lang]);

    // 4. Mémoriser la valeur du contexte
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
// 🇫🇷 COMPOSANT PRINCIPAL APP
// =================================================================

function App() {
    const [currentPage, setCurrentPage] = useState<PageView>('home');
    
    // Initialisez le service de traduction
    const translationService = useTranslationService();
    // Le 't' n'est plus strictement nécessaire ici, mais gardons-le
    // const { t } = translationService; 

    // Reset scroll on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);

    const handleNavigate = (page: PageView, sectionId?: string) => {
        setCurrentPage(page);
        
        if (page === 'home' && sectionId) {
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    return (
        // 1. Fournir le Contexte de Traduction
        <TranslationContext.Provider value={translationService}>
            <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative">
                
                {/* 2. Composants globaux/de fond */}
                <GlobalBackground />
                <CustomCursor /> 
                <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
                
                {/* 3. Rendu du Contenu (Basé sur votre code initial) */}
                <main className="relative z-10">
                    {currentPage === 'home' && (
                        <>
                            {/* Assurez-vous que Hero, About, etc. utilisent useTranslationContext() */}
                            <Hero />
                            <About />
                            <Services />
                            <Portfolio onNavigate={handleNavigate} />
                            <WhyUs />
                            <Testimonials />
                            <Contact />
                        </>
                    )}
                    {/* Les autres pages dédiées (doivent aussi utiliser useTranslationContext() si elles ont du texte) */}
                    {currentPage === 'pricing' && <Pricing />}
                    {currentPage === 'quote' && <Quote />}
                    {currentPage === 'work' && <Work />}
                    {currentPage === 'company' && <Company />}
                </main>
                
                <Footer />
            </div>
        </TranslationContext.Provider>
    );
}

export default App;
