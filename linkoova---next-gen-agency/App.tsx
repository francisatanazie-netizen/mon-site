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
// Définition du type PageView basée sur le JSX
type PageView = 'home' | 'pricing' | 'quote' | 'work' | 'company';

// ----------------------------------------------------------------------
// MAPPING ET LOGIQUE DE ROUTAGE
// ----------------------------------------------------------------------

const pageToPathMap: Record<PageView, string> = {
  'home': '/',
  'pricing': '/pricing',
  'quote': '/quote',
  'work': '/work',
  'company': '/company',
};

// Fonction utilitaire pour inverser le mapping (Path -> PageView)
const pathToPageMap: Record<string, PageView> = Object.entries(pageToPathMap).reduce((acc, [key, value]) => {
  acc[value] = key as PageView;
  return acc;
}, {} as Record<string, PageView>);


// Fonction pour obtenir l'état PageView à partir de l'URL du navigateur
const getPageFromPath = (path: string): PageView => {
    // Normaliser le chemin (enlever le slash de fin si présent, sauf pour '/')
    const normalizedPath = path.endsWith('/') && path.length > 1
        ? path.slice(0, -1)
        : path;
        
    // Retourne la PageView correspondante, sinon retourne 'home' par défaut
    return pathToPageMap[normalizedPath] || 'home';
};

function App() {
  // Initialise l'état à partir du chemin de l'URL (si non trouvé, utilise 'home')
  const [currentPage, setCurrentPage] = useState<PageView>(getPageFromPath(window.location.pathname));

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const handleNavigate = (page: PageView, sectionId?: string) => {
    const targetPath = pageToPathMap[page];

    // 1. Mise à jour de l'URL du navigateur (pushState)
    if (targetPath && targetPath !== window.location.pathname) {
      // Utilisez null comme premier argument (state object) pour plus de propreté
      window.history.pushState(null, '', targetPath); 
    }
    
    // 2. Mise à jour de l'état React pour le rendu
    setCurrentPage(page);
    
    // Logique de défilement (Scroll) pour la page 'home'
    if (page === 'home' && sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // useEffect : Gère les boutons Précédent/Suivant du navigateur
  useEffect(() => {
    const handlePopState = () => {
      // Met à jour l'état de la page lorsque l'URL change via l'historique du navigateur
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []); 

  return (
    <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative">
      <GlobalBackground />
      <CustomCursor />
      {/* Passez la prop onNavigate pour que la Navbar puisse changer la page */}
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
  );
}

export default App;
