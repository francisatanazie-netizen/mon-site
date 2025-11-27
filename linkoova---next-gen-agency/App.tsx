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
// import { PageView } from './types'; // Le type PageView n'est plus nécessaire

// 🛑 NOUVEAUX IMPORTS DE REACT ROUTER
import { Routes, Route, useLocation } from 'react-router-dom';

// 🛑 NOUVEAU COMPOSANT : Regroupe le contenu de la Home Page
const HomePageContent: React.FC = () => (
    <>
        <Hero />
        <About />
        <Services />
        {/* Portfolio n'a plus besoin d'onNavigate car il reste sur la Home Page */}
        <Portfolio /> 
        <WhyUs />
        <Testimonials />
        <Contact id="contact" />
    </>
);


function App() {
    // 🛑 REMPLACÉ : on supprime currentPage et setCurrentPage.
    // L'état de la page est maintenant géré par l'URL via useLocation.
    const location = useLocation(); 
    
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // DÉFINITION DE LA LOGIQUE DE FOND GLOBAL : Afficher partout SAUF si le chemin est '/work'
    const shouldShowGlobalBackground = location.pathname !== '/work';

    // Reset scroll sur le changement de PATH (URL)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    // 🛑 REMPLACÉ : La fonction handleNavigate est supprimée. 
    // La navigation se fait via le composant <Link> dans la Navbar.

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

    // Logique pour l'ancre #contact sur la Home Page (maintenue)
    useEffect(() => {
        if (location.hash === '#contact' && location.pathname === '/') {
             setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location.pathname, location.hash]);


    return (
        <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative font-sans antialiased">
            
            {/* Le GlobalBackground est rendu selon le chemin actuel (path) */}
            {shouldShowGlobalBackground && <GlobalBackground />}
            
            <CustomCursor />
            {/* 🛑 Navbar n'a plus besoin de props de navigation 🛑 */}
            <Navbar /> 
            
            <main className="relative z-10">
                {/* 🛑 UTILISATION DES ROUTES REACT ROUTER 🛑 */}
                <Routes>
                    {/* Path / -> Home Page */}
                    <Route path="/" element={<HomePageContent />} />
                    
                    {/* Paths uniques pour les autres pages (SEO Friendly) */}
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/company" element={<Company />} />
                    
                    {/* Route 404 pour gérer les chemins inconnus */}
                    <Route path="*" element={<h1 className="pt-48 text-center text-3xl text-red-500">404 - Page Non Trouvée</h1>} />
                </Routes>
            </main>
            
            <Footer />
            
            {/* 1. Bouton Flottant "Contact" / "Let's Go" (Affiché uniquement sur le chemin /) */}
            {location.pathname === '/' && (<a 
                    // Le lien est maintenant un lien d'ancre HTML standard
                    href="#contact" 
                    className="fixed bottom-6 left-6 z-40 px-6 py-3 bg-[#D1A954] text-black font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:bg-[#E0B96A] transform hover:scale-105 text-sm md:text-base"
                    aria-label="Contactez-nous pour un projet"
                >
                    Let's Go!
                </a>
            )}

            {/* 2. Bouton Flottant "Remonter en haut de page" (Affiché uniquement sur le chemin /) */}
            <button
                onClick={scrollToTop}
                // Visible uniquement sur la page d'accueil ET si l'utilisateur a scrollé
                className={`
                    fixed bottom-6 right-6 z-40 p-3 rounded-full 
                    bg-white/10 text-white border border-white/20 
                    shadow-xl transition-opacity duration-300 
                    hover:bg-white/20
                    ${showScrollToTop && location.pathname === '/' ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                aria-label="Remonter en haut de page"
            >
                <ArrowUp className="w-6 h-6" /> 
            </button>
        </div>
    );
}

export default App;
