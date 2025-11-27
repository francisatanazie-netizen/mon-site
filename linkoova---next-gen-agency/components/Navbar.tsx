import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// 🛑 SUPPRESSION : import LanguageSwitcher from './LanguageSwitcher'; 
// 🛑 SUPPRESSION : import { useTranslationContext } from '../TranslationContext'; 

// =================================================================
// 🚨 TYPES GLOBALS (Doivent correspondre à App.tsx)
// =================================================================
type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';
interface NavProps {
    currentPage: PageView;
    onNavigate: (page: PageView, sectionId?: string) => void;
}


// *****************************************************************
// 🇫🇷 NAVBAR COMPONENT (Version stable sans traduction)
// *****************************************************************

// Définitions des textes en dur (EN)
const TEXTS = {
    work: "Work",
    insights: "Insights",
    pricing: "Pricing",
    company: "Company",
    contact: "Contact",
    get_a_quote: "Get a Quote",
    global_access: "Global Access",
};

const Navbar: React.FC<NavProps> = ({ currentPage, onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // 🛑 SUPPRESSION : const { t } = useTranslationContext();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50 || currentPage !== 'home');
        };
        
        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);

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
                    {/* Symbole Binoculaire (code omis pour la clarté) */}
                     <div className="flex items-center mx-1 relative">
                        <div className="w-7 h-7 rounded-full border-[2.5px] border-gray-600 bg-[#0a0a0a] relative flex items-center justify-center shadow-inner">
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-transparent to-emerald-900/40 opacity-80 rounded-full"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-black border border-[#D1A954]/30 shadow-[0_0_5px_rgba(255,255,255,0.1)]"></div>
                            <div className="absolute top-1 right-1.5 w-1 h-1 bg-white/70 rounded-full blur-[0.5px]"></div>
                        </div>
                        <div className="flex flex-col items-center justify-center -mx-0.5 z-10">
                             <div className="w-3 h-[2px] bg-gray-500 rounded-sm mb-[1px]"></div>
                             <div className="w-2 h-4 bg-gray-700 rounded-[1px] border border-gray-800 flex flex-col justify-evenly">
                                 <div className="w-full h-[1px] bg-black/50"></div>
                                 <div className="w-full h-[1px] bg-black/50"></div>
                                 <div className="w-full h-[1px] bg-black/50"></div>
                             </div>
                             <div className="w-3 h-[2px] bg-gray-500 rounded-sm mt-[1px]"></div>
                        </div>
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
                        {TEXTS.work} {/* Texte en dur */}
                    </button>

                    <button
                        onClick={() => handleNavClick('why-us')}
                        className="text-xs lg:text-sm font-medium text-gray-400 hover:text-[#D1A954] transition-colors tracking-widest uppercase"
                    >
                        {TEXTS.insights} {/* Texte en dur */}
                    </button>
                    
                    {/* Pricing Link */}
                    <button
                        onClick={() => handlePageNav('pricing')}
                        className={`text-xs lg:text-sm font-medium transition-colors tracking-widest uppercase flex items-center gap-2 ${
                            currentPage === 'pricing' ? 'text-[#D1A954]' : 'text-gray-400 hover:text-[#D1A954]'
                        }`}
                    >
                        {TEXTS.pricing} {/* Texte en dur */}
                        {currentPage !== 'pricing' && <span className="w-1 h-1 rounded-full bg-[#D1A954]" />}
                    </button>

                    <button
                        onClick={() => handlePageNav('company')}
                        className={`text-xs lg:text-sm font-medium transition-colors tracking-widest uppercase ${
                            currentPage === 'company' ? 'text-[#D1A954]' : 'text-gray-400 hover:text-[#D1A954]'
                        }`}
                    >
                        {TEXTS.company} {/* Texte en dur */}
                    </button>

                    {/* Contact Link */}
                    <button
                        onClick={() => handleNavClick('contact')} // Retourne à l'accueil et scroll à l'ancre #contact
                        className="text-xs lg:text-sm font-medium text-gray-400 hover:text-[#D1A954] transition-colors tracking-widest uppercase"
                    >
                        {TEXTS.contact} {/* Texte en dur */}
                    </button>
                </div>

                {/* CTA & Mobile Toggle */}
                <div className="flex items-center gap-6">
                    
                    {/* 🛑 SUPPRESSION : LanguageSwitcher ici 
                    <div className="hidden xl:flex items-center">
                        <LanguageSwitcher />
                    </div> */}

                    {/* Global Access - Subtle Tech Style */}
                    <button className="hidden xl:flex items-center gap-2 text-[10px] font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-widest border border-white/10 rounded-full px-3 py-1.5 bg-white/5 hover:bg-white/10 hover:border-white/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        {TEXTS.global_access} {/* Texte en dur */}
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
                        {TEXTS.get_a_quote} {/* Texte en dur */}
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
                            <button onClick={() => handlePageNav('work')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{TEXTS.work}</button>
                            <button onClick={() => handleNavClick('why-us')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{TEXTS.insights}</button>
                            
                            <button
                                onClick={() => handlePageNav('pricing')}
                                className="text-xl font-serif text-white hover:text-[#D1A954] text-left flex items-center gap-2"
                            >
                                {TEXTS.pricing} & Plans <Sparkles className="w-4 h-4" />
                            </button>

                            <button onClick={() => handlePageNav('company')} className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left">{TEXTS.company}</button>

                            <button
                                onClick={() => handleNavClick('contact')}
                                className="text-2xl font-serif text-gray-300 hover:text-[#D1A954] text-left"
                            >
                                {TEXTS.contact}
                            </button>
                            
                            <div className="h-px bg-white/10 w-full my-2"></div>

                            <button
                                onClick={() => handlePageNav('quote')}
                                className="text-xl font-serif text-[#D1A954] text-left flex items-center gap-2"
                            >
                                {TEXTS.get_a_quote} <MessageSquare className="w-4 h-4" />
                            </button>
                            
                            <div className="pt-6 border-t border-white/10">
                                
                                {/* 🛑 SUPPRESSION : LanguageSwitcher ici 
                                <div className="mb-4 flex items-center gap-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
                                    <Globe className="w-4 h-4"/> 
                                    <LanguageSwitcher /> 
                                </div>
                                */}

                                <button className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {TEXTS.global_access}
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
