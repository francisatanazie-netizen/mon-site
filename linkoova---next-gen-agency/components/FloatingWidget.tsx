import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowUp } from 'lucide-react';

/**
 * Widget flottant combinant un bouton de remontée en haut de page (Scroll to Top)
 * et un bouton "Let's Talk" pour naviguer vers la section de contact.
 * Le widget apparaît après un petit défilement vers le bas (200px).
 */
const FloatingWidget: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le widget après un scroll de 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    // Le conteneur assure la position fixe, l'alignement à droite et l'animation d'apparition/disparition
    <div 
      className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-1 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
    >
      
      {/* Bouton Flèche (Remonter en haut de page) */}
      <button
        onClick={scrollToTop}
        // Design tropicalisé: Fond principal [#D1A954], texte noir. Ombre dorée.
        className="w-12 h-10 bg-[#D1A954] text-black rounded-t-lg rounded-b-sm shadow-[0_0_15px_rgba(234,179,8,0.4)] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center border-b-2 border-black/10 group relative overflow-hidden"
        aria-label="Retour en haut"
      >
        {/* Effet de transition de couleur au survol */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        {/* Icône de la flèche avec effet de soulèvement au survol */}
        <ArrowUp size={20} strokeWidth={3} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Bouton Let's Talk - Ancré vers la section #contact */}
      <a 
        href="#contact" 
        // Design tropicalisé: Fond principal [#D1A954], texte noir. Ombre dorée.
        className="group relative flex items-center gap-3 bg-[#D1A954] text-black px-6 py-4 rounded-b-xl rounded-t-sm shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:bg-white transition-all duration-300 overflow-hidden"
        aria-label="Contactez-nous"
      >
        {/* Effet de transition de couleur au survol */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        
        <div className="relative z-10">
          {/* Icône de message avec couleur de remplissage pour un meilleur contraste */}
          <MessageSquare className="w-5 h-5 fill-black/10" strokeWidth={2.5} />
          {/* Point clignotant (ping) pour indiquer l'appel à l'action */}
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black"></span>
          </span>
        </div>
        <span className="relative z-10 font-extrabold text-sm uppercase tracking-wide">Let's Talk</span>
      </a>
    </div>
  );
};

export default FloatingWidget;
