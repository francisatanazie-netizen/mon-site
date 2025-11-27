import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
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
import Work from './components/Work'; // Import du composant Work
import Company from './components/Company';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground'; // Import du fond Three.js
import { ArrowUp } from 'lucide-react';
import { PageView } from './types'; // Assurez-vous que le type PageView est 'home', 'work', 'pricing', etc.

function App() {
    const [currentPage, setCurrentPage] = useState<PageView>('home');
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // DÉFINITION DE LA LOGIQUE DE FOND GLOBAL : Afficher partout SAUF sur 'work'
    const shouldShowGlobalBackground = currentPage !== 'work';

    // Reset scroll on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);

    // Fonction de navigation
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

    // Gère l'événement de scroll pour afficher/masquer le bouton
    useEffect(() => {
        const handleScroll = () => {
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

    return (
        <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative font-sans antialiased">
            
            {/* ✅ CORRECTION : Le GlobalBackground est rendu UNIQUEMENT si la page n'est pas 'work' */}
            {shouldShowGlobalBackground && <GlobalBackground />}
            
            <CustomCursor />
            <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
            
            <main className="relative z-10">
                {currentPage === 'home' && (
                    <>
                        <Hero />
                        <About />
                        <Services />
                        <Portfolio onNavigate={handleNavigate} />
                        <WhyUs />
                        <Testimonials />
                        <Contact id="contact" />
                    </>
                )}
                {currentPage === 'pricing' && <Pricing />}
                {currentPage === 'quote' && <Quote />}
                
                {/* La page Work est rendue ici. Elle inclut son propre fond Canvas. */}
                {currentPage === 'work' && <Work />}
                
                {currentPage === 'company' && <Company />}
            </main>
            
            <Footer />
            
            {/* 1. Bouton Flottant "Contact" / "Let's Go" */}
            {currentPage === 'home' && (
                <a 
                    href="#contact" 
                    className="fixed bottom-6 left-6 z-40 px-6 py-3 bg-[#D1A954] text-black font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:bg-[#E0B96A] transform hover:scale-105 text-sm md:text-base"
                    aria-label="Contactez-nous pour un projet"
                >
                    Let's Go!
                </a>
            )}

            {/* 2. Bouton Flottant "Remonter en haut de page" */}
            <button
                onClick={scrollToTop}
                // Affiché uniquement sur la page d'accueil ET si l'utilisateur a scrollé
                className={`
                    fixed bottom-6 right-6 z-40 p-3 rounded-full 
                    bg-white/10 text-white border border-white/20 
                    shadow-xl transition-opacity duration-300 
                    hover:bg-white/20
                    ${showScrollToTop && currentPage === 'home' ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                aria-label="Remonter en haut de page"
            >
                <ArrowUp className="w-6 h-6" /> 
            </button>
        </div>
    );
}

export default App;
