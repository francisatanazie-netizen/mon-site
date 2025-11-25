import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';

// 1. On définit le type de la prop qu'on va recevoir
interface FloatingWidgetProps {
  onContactClick: () => void;
}

// 2. On ajoute la prop dans les paramètres du composant
const FloatingWidget: React.FC<FloatingWidgetProps> = ({ onContactClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-10 bg-[#D1A954] text-black rounded-t-lg rounded-b-sm shadow-[0_0_15px_rgba(209,169,84,0.4)] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center border-b-2 border-black/10 group relative overflow-hidden"
        aria-label="Retour en haut"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <ArrowUp size={20} strokeWidth={3} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* 3. Modification ici : On utilise un bouton ou un <a> intercepté */}
      <button 
        onClick={(e) => {
           e.preventDefault(); // Empêche le comportement par défaut
           onContactClick();   // Déclenche la navigation intelligente de l'App
        }}
        className="group relative flex items-center gap-3 bg-[#D1A954] text-black px-6 py-4 rounded-b-xl rounded-t-sm shadow-[0_0_20px_rgba(209,169,84,0.4)] hover:shadow-[0_0_30px_rgba(209,169,84,0.6)] hover:bg-white transition-all duration-300 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        
        <div className="relative z-10">
          <MessageSquare className="w-5 h-5 fill-black/10" strokeWidth={2.5} />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
          </span>
        </div>
        <span className="relative z-10 font-extrabold text-sm uppercase tracking-wide">Let's Talk</span>
      </button>
    </div>
  );
};

export default FloatingWidget;
