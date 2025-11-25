
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
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

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

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-[#D1A954] selection:text-black cursor-none">
      <CustomCursor />
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
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
