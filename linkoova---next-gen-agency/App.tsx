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
import Work from './components/Work';
import Company from './components/Company';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import { ArrowUp } from 'lucide-react'; // 🚨 NOUVEL IMPORT : Icône pour le bouton 'Scroll to Top'
import { PageView } from './types'; // Assurez-vous que ce type est correctement défini

function App() {
    const [currentPage, setCurrentPage] = useState<PageView>('home');
    // 🚨 NOUVEL ÉTAT : Pour gérer la visibilité du bouton "Remonter en haut"
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Reset scroll on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);

    // Fonction de navigation
    const handleNavigate = (page: PageView, sectionId?: string) => {
        setCurrentPage(page);
        
        if (page === 'home' && sectionId) {
            // Small timeout to allow the view to render before scrolling
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    // 🚨 NOUVEL EFFECT : Gère l'événement de scroll pour afficher/masquer le bouton
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
    
    // 🚨 NOUVELLE FONCTION : Remonte la page en haut
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative font-sans antialiased">
            <GlobalBackground />
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
                        <Contact id="contact" /> {/* Assurez-vous que votre composant Contact a l'ancre ID="contact" */}
                    </>
                )}
                {currentPage === 'pricing' && <Pricing />}
                {currentPage === 'quote' && <Quote />}
                {currentPage === 'work' && <Work />}
                {currentPage === 'company' && <Company />}
            </main>
            
            <Footer />
            
            {/* ========================================= */}
            {/* 🚨 NOUVEAUX ÉLÉMENTS FLOTTANTS */}
            {/* ========================================= */}

            {/* 1. Bouton Flottant "Contact" / "Let's Go" */}
            {/* Affiché uniquement si nous sommes sur la page d'accueil */}
            {currentPage === 'home' && (
                <a 
                    href="#contact" 
                    // Utilisez un style audacieux et thématique pour le CTA
                    className="fixed bottom-6 left-6 z-40 px-6 py-3 bg-[#D1A954] text-black font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:bg-[#E0B96A] transform hover:scale-105 text-sm md:text-base"
                    aria-label="Contactez-nous pour un projet"
                >
                    Let's Go!
                </a>
            )}

            {/* 2. Bouton Flottant "Remonter en haut de page" */}
            <button
                onClick={scrollToTop}
                // Visible uniquement sur la page d'accueil et après un certain défilement
                // Le style est discret (glass/white/10) pour ne pas être un CTA principal
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
