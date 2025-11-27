import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Menu, X, Globe, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// =================================================================
// 🚨 CONTEXTE DE TRADUCTION - DUPLICATION POUR TYPE CHECKING SEULEMENT
// Ceci DOIT correspondre à la définition exacte dans App.tsx
// =================================================================
// Cette structure est nécessaire pour que les composants puissent communiquer la traduction.

interface TranslationContextType {
    // Le type 'any' est utilisé ici pour simplifier la compilation dans l'environnement à fichier unique.
    t: (key: any) => string; 
    i18n: {
        language: 'fr' | 'en';
        changeLanguage: (newLang: 'fr' | 'en') => void;
    };
}

// NOTE: Le 'TranslationContext' réel doit être créé et exporté depuis App.tsx. 
// Dans cet environnement à fichier unique, nous allons simuler l'accès au contexte 
// en utilisant un hook mock qui lit le localStorage pour la synchronisation.

const LANG_STORAGE_KEY = 'i18nextLng';

// -----------------------------------------------------------------
// Simulation du Hook de Contexte/Traduction pour la Navbar
// -----------------------------------------------------------------
// La Navbar utilise maintenant une version locale et simplifiée du mock 
// qui se synchronise uniquement via localStorage pour éviter les problèmes 
// d'importation circulaire dans notre structure actuelle.
const useTranslationMockInNavbar = () => {
    // Détecte la langue stockée au démarrage
    const initialLangCode = (localStorage.getItem(LANG_STORAGE_KEY) || navigator.language).substring(0, 2);
    const initialLang = initialLangCode === 'fr' ? 'fr' : 'en';

    const [lang, setLang] = useState<'fr' | 'en'>(initialLang); 

    // Ressources de traduction minimales nécessaires pour la Navbar
    const i18nMockResources = {
        en: {
            "work": "Work", "insights": "Insights", "pricing": "Pricing", "company": "Company", "contact": "Contact", "get_a_quote": "Get a Quote", "global_access": "Global Access",
        },
        fr: {
            "work": "Projets", "insights": "Analyses", "pricing": "Tarification", "company": "Entreprise", "contact": "Contact", "get_a_quote": "Demander un Devis", "global_access": "Accès Global",
        }
    };

    const t = useCallback((key: keyof typeof i18nMockResources.en): string => {
        const currentResources = i18nMockResources[lang] || i18nMockResources['en'];
        return currentResources[key] || i18nMockResources.en[key] || key;
    }, [lang]);

    // EFFECT pour SYNC avec LanguageSwitcher via localStorage
    useEffect(() => {
        // Intervalle pour la lecture (polling) afin de se synchroniser avec le LanguageSwitcher
        const interval = setInterval(() => {
            const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
            const newLang = storedLang?.substring(0, 2) === 'fr' ? 'fr' : 'en';
            if (newLang !== lang) {
                setLang(newLang);
            }
        }, 500); // Vérification fréquente

        return () => clearInterval(interval);
    }, [lang]);

    return { 
        t, 
        i18n: { 
            language: lang, 
        } 
    };
};


// *****************************************************************
// 🇫🇷 NAVBAR COMPONENT
// *****************************************************************

// Déclarations des dépendances des autres fichiers pour la compilation
declare const LanguageSwitcher: React.FC<any>; 
type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';
interface NavProps {
    currentPage: PageView;
    onNavigate: (page: PageView, sectionId?: string) => void;
}


const Navbar: React.FC<NavProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Utilisation du hook SIMULÉ DANS LA NAVBAR pour la traduction et la synchro
  const { t } = useTranslationMockInNavbar(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigate('home', sectionId);
    setIsMobileMenuOpen(false);
  };
  
  const handlePageNav = (page: 'company' | 'pricing' | 'work' | 'quote') => {
      onNavigate(page);
      setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || currentPage !== 'home' ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo - Concept */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-0.5 group">
            <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white">LINK</span>
            {/* ... Symbole Binoculaire ... */}
            <div className="flex items-center mx-1 relative">
                {/* Left Barrel */}
                <div className="w-7 h-7 rounded-full border-[2.5px] border-gray-600 bg-[#0a0a0a] relative flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-transparent to-emerald-900/40 opacity-80 rounded-full"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#D1A954]/30 shadow-[0_0_5px_rgba(255,255,255,0.1)]"></div>
                    <div className="absolute top-1 right-1.5 w-1 h-1 bg-white/70 rounded-full blur-[0.5px]"></div>
                </div>
                {/* Mechanical Bridge */}
                <div className="flex flex-col items-center justify-center -mx-0.5 z-10">
                     <div className="w-3 h-[2px] bg-gray-500 rounded-sm mb-[1px]"></div>
                     {/* Focus Wheel */}
                     <div className="w-2 h-4 bg-gray-700 rounded-[1px] border border-gray-800 flex flex-col justify-evenly">
                         <div className="w-full h-[1px] bg-black/50"></div>
                         <div className="w-full h-[1px] bg-black/50"></div>
                         <div className="w-full h-[1px] bg-black/50"></div>
                     </div>
                     <div className="w-3 h-[2px] bg-gray-500 rounded-sm mt-[1px]"></div>
                </div>
                {/* Right Barrel */}
                <div className="w-7 h-7 rounded-full border-[2.5px] border-gray-600 bg-[#0a0a0a] relative flex items-center justify-center shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/60 via-transparent to-emerald-900/40 opacity-80 rounded-full"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#D1A954]/30 shadow-[0_0_5px_rgba(255,255,255,0.1)]"></div>
                    <div className="absolute top-1 left-1.5 w-1 h-1 bg-white/70 rounded-full blur-[0.5px]"></div>
                </div>
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white">VA</span>
        </button>

        {/* Desktop Links (Main Navigation) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          
          <button
             onClick={() => handlePageNav('work')}
             className={`text-xs lg:text-sm font-medium transition-colors tracking-widest uppercase ${
              currentPage === 'work' ? 'text-[#D1A954]' : 'text-gray-400 hover:text-[#D1A954]'
            }`}
          >
            {t('work')}
          </button>

          <button
            onClick={() => handleNavClick('why-us')}
            className="text-xs lg:text-sm font-medium text-gray-400 hover:text-[#D1A954] transition-colors tracking-widest uppercase"
          >
            {t('insights')}
          </button>
          
          {/* Pricing Link */}
          <button
            onClick={() => handlePageNav('pricing')}
            className={`text-xs lg:text-sm font-medium transition-colors tracking-widest uppercase flex items-center gap-2 ${
              currentPage === 'pricing' ? 'text-[#D1A954]' : 'text-gray-400 hover:text-[#D1A954]'
            }`}
          >
            {t('pricing')}
            {currentPage !== 'pricing' && <span className="w-1 h-1 rounded-full bg-[#D1A954]" />}
          </button>

          <button
            onClick={() => handlePageNav('company')}
            className={`text-xs lg:text-sm font-medium transition-colors tracking-widest uppercase ${
              currentPage === 'company' ? 'text-[#D1A954]' : 'text-gray-400 hover:text-[#D1A954]'
            }`}
          >
            {t('company')}
          </button>

          {/* Contact Link */}
          <button
            onClick={() => {
                onNavigate('company');
                setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }}
            className="text-xs lg:text-sm font-medium text-gray-400 hover:text-[#D1A954] transition-colors tracking-widest uppercase"
          >
            {t('contact')}
          </button>
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-6">
          
          {/* ******************************
              SÉLECTEUR DE LANGUE (Desktop - Affichage XL)
              ****************************** */}
          <div className="hidden xl:flex items-center">
             <LanguageSwitcher />
          </div>

          {/* Global Access - Subtle Tech Style (Original) */}
          <button className="hidden xl:flex items-center gap-2 text-[10px] font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest border border-white/10 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 hover:border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {t('global_access')}
          </button>

          {/* Get a Quote Button */}
          <button 
            onClick={() => handlePageNav('quote')}
            className={`hidden md:flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                currentPage === 'quote' 
                ? 'bg-[#D1A954] text-black shadow-[0_0_15px_rgba(209,169,84,0.4)]' 
                : 'border border-[#D1A954] text-[#D1A954] hover:bg-[#D1A954] hover:text-black'
            }`}
          >
            {t('get_a_quote')}
          </button>
          
          <button
            className="md:hidden text-white hover:text-[#D1A954] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0B0C] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <button onClick={() => handlePageNav('work')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{t('work')}</button>
              <button onClick={() => handleNavClick('why-us')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{t('insights')}</button>
              
              <button
                 onClick={() => handlePageNav('pricing')}
                 className="text-xl font-serif text-white hover:text-[#D1A954] text-left flex items-center gap-2"
              >
                  {t('pricing')} & Plans <Sparkles className="w-4 h-4" />
              </button>

              <button onClick={() => handlePageNav('company')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{t('company')}</button>

               <button
                  onClick={() => {
                      onNavigate('company');
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                  }}
                  className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left"
                >
                  {t('contact')}
                </button>
                
              <div className="h-px bg-white/10 w-full my-2"></div>

              <button
                 onClick={() => handlePageNav('quote')}
                 className="text-xl font-serif text-[#D1A954] text-left flex items-center gap-2"
              >
                  {t('get_a_quote')} <MessageSquare className="w-4 h-4" />
              </button>
              
              <div className="pt-6 border-t border-white/10">
                 
                 {/* ******************************
                     SÉLECTEUR DANS LE MENU MOBILE
                     ****************************** */}
                 <div className="mb-4 flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                     <Globe className="w-4 h-4"/> 
                     <LanguageSwitcher /> 
                 </div>

                 <button className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    {t('global_access')}
                 </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
