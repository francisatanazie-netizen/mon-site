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

// Nouveaux composants de page (doivent être créés ou importés)
import Pricing from './components/Pricing';
import Quote from './components/Quote';
import Work from './components/Work';
import Company from './components/Company';

// Composants utilitaires (doivent être créés ou importés)
import CustomCursor from './components/CustomCursor';
// NOUVEAU: Importation manquante du fond global
import GlobalBackground from './components/GlobalBackground'; 
// NOUVEAU: Importation du widget flottant
import FloatingWidget from './components/FloatingWidget';

// Types importés depuis './types'
import { PageView } from './types';


function App() {
  // État pour gérer la page actuellement affichée (défaut: 'home')
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Hook pour réinitialiser le défilement au sommet à chaque changement de page
  useEffect(() => {
    // S'assurer que le scroll est au top lors du changement de vue
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  /**
   * Fonction de navigation centrale pour l'ensemble de l'application.
   * @param page - La PageView cible ('home', 'pricing', 'company', etc.)
   * @param sectionId - ID de la section à atteindre sur la page 'home' (ex: 'services')
   */
  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    
    // Si nous naviguons vers la page d'accueil et qu'une section spécifique est demandée
    if (page === 'home' && sectionId) {
      // Un petit délai est nécessaire pour permettre au DOM de se mettre à jour
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          // Défilement fluide vers la section
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error(`Section with ID '${sectionId}' not found on the home page.`);
        }
      }, 100);
    }
  };

  return (
    // AJUSTEMENT: Ajout de 'relative' ici pour que les éléments flottants (comme le widget)
    // ne soient pas affectés par la barre de défilement principale si 'main' est scrollable.
    <div className="min-h-screen text-white selection:bg-[#D1A954] selection:text-black cursor-none relative">
      
      {/* Composants de fond et curseur personnalisés */}
      <GlobalBackground />
      <CustomCursor />
      
      {/* La Navbar gère les liens de page */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* AJUSTEMENT: main doit être relatif au GlobalBackground */}
      <main className="relative z-10"> 
        
        {/* Rendu conditionnel des Vues de Page */}
        
        {/* Page d'Accueil : La plus complexe, elle affiche tous les composants de section */}
        {currentPage === 'home' && (
          <>
            {/* Hero doit recevoir onNavigate pour que ses CTA fonctionnent */}
            <Hero onNavigate={handleNavigate} /> 
            
            {/* Les autres sections de la page d'accueil */}
            <About />
            {/* Attribution d'un ID pour le défilement ciblé depuis le Hero */}
            <section id="services"><Services /></section> 
            
            {/* Portfolio doit recevoir onNavigate pour que ses liens "Voir Projet" fonctionnent */}
            <Portfolio onNavigate={handleNavigate} />
            
            <WhyUs />
            <Testimonials />
            {/* ATTENTION: La section Contact DOIT avoir l'ID 'contact' pour que le widget fonctionne */}
            <section id="contact"><Contact /></section>
          </>
        )}
        
        {/* Pages Secondaires : Elles affichent un composant de page unique */}
        {currentPage === 'pricing' && <Pricing />}
        {currentPage === 'quote' && <Quote />}
        {currentPage === 'work' && <Work />}
        {currentPage === 'company' && <Company />}
        

      </main>
      
      <Footer />
      
      {/* NOUVEAU: Ajout du widget flottant juste avant la fermeture du corps principal */}
      <FloatingWidget />
      
    </div>
  );
}

export default App;
