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
import { ArrowUp } from 'lucide-react';

// Définition du type d'état pour la navigation
type PageView = '/' | '/work' | '/pricing' | '/quote' | '/company';

// NOUVEAU COMPOSANT : Regroupe le contenu de la Home Page
const HomePageContent: React.FC = () => (
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
    // Rétablissement de l'état local pour la navigation
    const [currentPage, setCurrentPage] = useState<PageView>('/'); 
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // Fonction de navigation qui met à jour l'état
    const handleNavigate = (page: PageView) => {
        setCurrentPage(page);
    };

    // Logique pour déterminer si on affiche le fond dynamique
    const shouldShowGlobalBackground = currentPage !== '/work';

    // Reset scroll sur le changement de page
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [currentPage]);
    
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

    // Logique pour l'ancre #contact (maintenue si sur la page d'accueil)
    useEffect(() => {
        // Cette logique est plus compliquée sans React Router, on la simplifie
        // En mode navigation par état, on ne supporte pas le deep linking d'ancre facilement.
        // On se concentre sur la vue principale.
    }, [currentPage]); 

    // Logique de rendu en fonction de la currentPage
    const renderContent = () => {
        switch (currentPage) {
            case '/':
                return <HomePageContent />;
            case '/pricing':
                return <Pricing />;
            case '/quote':
                return <Quote />;
            case '/work':
                return <Work />;
            case '/company':
                return <Company />;
            default:
                return <HomePageContent />;
        }
    };


    return (
        // GARANTIE DE FOND NOIR : La div principale a un fond solide
        <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative font-sans antialiased bg-[#0B0B0C]">
            
            {/* Rendu conditionnel du GlobalBackground */}
            {shouldShowGlobalBackground && <GlobalBackground />}
            
            <CustomCursor />
            {/* Transmission de la fonction de navigation à la Navbar */}
            <Navbar onNavigate={handleNavigate} currentPage={currentPage} /> 
            
            <main className="relative z-10">
                {/* Rendu du contenu en fonction de la page actuelle */}
                {renderContent()}
            </main>
            
            <Footer />
            
            {/* 1. Bouton Flottant "Contact" / "Let's Go" (Affiché uniquement sur la Home Page) */}
            {currentPage === '/' && (<button 
                    // Au clic, navigue vers la page d'accueil puis scroll vers le bas
                    onClick={() => {
                        handleNavigate('/');
                        setTimeout(() => {
                           const element = document.getElementById('contact');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            } 
                        }, 100);
                    }}
                    className="fixed bottom-6 left-6 z-40 px-6 py-3 bg-[#D1A954] text-black font-bold uppercase tracking-wider rounded-full shadow-2xl transition-all duration-300 hover:bg-[#E0B96A] transform hover:scale-105 text-sm md:text-base"
                    aria-label="Contactez-nous pour un projet"
                >
                    Let's Go!
                </button>
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
                    ${showScrollToTop && currentPage === '/' ? 'opacity-100 visible' : 'opacity-0 invisible'}
                `}
                aria-label="Remonter en haut de page"
            >
                <ArrowUp className="w-6 h-6" /> 
            </button>
        </div>
    );
}

export default App;
