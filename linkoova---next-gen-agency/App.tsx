import React, { useState, useEffect, useCallback, useMemo } from 'react';

// =================================================================
// 🚨 IMPORTS DES COMPOSANTS (RÉTABLIS)
// =================================================================
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // 👈 Maintenant enveloppé par le HOC
import About from './components/About'; // 👈 Maintenant enveloppé par le HOC
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
    i18nMockResources, 
    LANG_STORAGE_KEY,
    AppLang,
} from './TranslationContext'; 
import { PageView } from './types'; // 👈 VOTRE TYPE PAGEVIEW

// =================================================================
// 🚨 HOOK DE TRADUCTION UNIQUE (LA SOURCE DE VÉRITÉ) - Identique
// =================================================================

const useTranslationService = () => {
    // Détecte la langue stockée ou par défaut
    const initialLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || navigator.language).substring(0, 2);
    const initialLang = initialLangCode === 'fr' ? 'fr' : 'en';

    const [lang, setLang] = useState<AppLang>(initialLang);

    // Fonction pour changer la langue
    const changeLanguage = useCallback((newLang: AppLang) => {
        if (newLang !== lang) {
            setLang(newLang);
            localStorage.setItem(LANG_STORAGE_KEY, newLang);
        }
    }, [lang]);

    // Fonction de traduction
    const t = useCallback((key: keyof typeof i18nMockResources.en): string => {
        const currentResources = i18nMockResources[lang];
        return currentResources[key] || i18nMockResources.en[key] || key;
    }, [lang]);

    // Mémoriser la valeur du contexte
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
    
    // Initialisez le service de traduction unique (étape 1)
    const translationService = useTranslationService();

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
        // 2. Le TranslationContext enveloppe l'ensemble de l'application
        <TranslationContext.Provider value={translationService}>
            <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative">
                
                <GlobalBackground />
                <CustomCursor /> 
                
                {/* Navbar n'a pas besoin du HOC s'il utilise le hook directement pour changer la langue */}
                <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
                
                <main className="relative z-10">
                    {currentPage === 'home' && (
                        <>
                            {/* Les composants sont rendus normalement, le HOC fait la magie */}
                            <Hero /> 
                            <About />
                            <Services />
                            <Portfolio onNavigate={handleNavigate} />
                            <WhyUs />
                            <Testimonials />
                            <Contact />
                        </>
                    )}
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
