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

// 🛑 IMPORTS CRUCIAUX POUR LE ROUTAGE
import { Routes, Route, useLocation } from 'react-router-dom';

// Composant qui regroupe le contenu de la Home Page (Route path="/")
const HomePageContent = () => (
    <>
        <Hero />
        <About />
        <Services />
        <Portfolio /> 
        <WhyUs />
        <Testimonials />
        <Contact id="contact" />
    </>
);


function App() {
    // Récupère l'URL actuelle
    const location = useLocation(); 
    
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // 🛑 LOGIQUE DE L'EXCEPTION DU FOND
    // Affiche GlobalBackground partout SAUF si le chemin est '/work'
    const shouldShowGlobalBackground = location.pathname !== '/work';

    // Reset scroll sur le changement de PATH (URL)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    // Gère l'événement de scroll pour afficher/masquer le bouton de retour en haut
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

    // Logique pour l'ancre #contact sur la Home Page
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
            
            {/* Le GlobalBackground est rendu si shouldShowGlobalBackground est vrai (partout sauf /work) */}
            {shouldShowGlobalBackground && <GlobalBackground />}
            
            <CustomCursor />
            <Navbar /> 
            
            <main className="relative z-10">
                {/* DÉFINITION DES ROUTES */}
                <Routes>
                    {/* Route par défaut (Home Page) */}
                    <Route path="/" element={<HomePageContent />} />
                    
                    {/* Routes spécifiques */}
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/company" element={<Company />} />
                    
                    {/* Route 404 */}
                    <Route path="*" element={<h1 className="pt-48 text-center text-3xl text-red-500">404 - Page Non Trouvée</h1>} />
                </Routes>
            </main>
            
            <Footer />
            
            {/* Bouton Flottant "Contact" / "Let's Go!" */}
            {location.pathname === '/' && (<a 
                    href="#contact" 
                    className="fixed bottom-6 left-6 z-40 px-6 py-3 bg-[#D1A954] text-black font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:bg-[#E0B96A] transform hover:scale-105 text-sm md:text-base"
                    aria-label="Contactez-nous pour un projet"
                >
                    Let's Go!
                </a>
            )}

            {/* Bouton Flottant "Remonter en haut de page" */}
            <button
                onClick={scrollToTop}
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
