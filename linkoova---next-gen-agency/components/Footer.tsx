import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12">
          
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-serif text-white font-semibold mb-2">LINKOOVA</h3>
            <p className="text-gray-500 text-sm max-w-xs italic">Link all over the world.</p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-4">Sitemap</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#about" className="hover:text-[#D1A954]">About</a></li>
                <li><a href="#services" className="hover:text-[#D1A954]">Services</a></li>
                <li><a href="#portfolio" className="hover:text-[#D1A954]">Work</a></li>
                <li><a href="#contact" className="hover:text-[#D1A954]">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-xs uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D1A954]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#D1A954]">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-gray-600 text-xs mb-4 md:mb-0">&copy; {new Date().getFullYear()} Linkoova Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;