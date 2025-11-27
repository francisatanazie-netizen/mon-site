import React from 'react';
import { motion } from 'framer-motion';
// Importer toutes les icônes nécessaires pour le rendu détaillé
import { ArrowRight, TrendingUp, Zap, Target, 
         Hexagon, Diamond, ShieldCheck, Globe, Smartphone, CreditCard, Layout, Landmark, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Importer les données depuis le fichier séparé
import { cases } from '../data/casesData'; // ✅ Assurez-vous que le chemin est correct

// 2. Importer le fond interactif (Canvas)
import InteractiveBackground from './InteractiveBackground'; // ✅ Assurez-vous que le chemin est correct

// Composant Helper : Rendu du cadre de navigateur
const BrowserWindow = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`rounded-lg overflow-hidden border border-white/10 bg-[#1A1A1A] shadow-2xl ${className} group-hover:border-[#D1A954]/30 transition-colors duration-500`}>
    <div className="h-8 bg-[#121213] border-b border-white/5 flex items-center px-4 gap-2">
      <div className="flex gap-2 opacity-50">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
      </div>
      <div className="ml-4 flex-1 h-4 bg-white/5 rounded-full max-w-[300px] hidden sm:block"></div>
    </div>
    <div className="relative">
      {children}
    </div>
  </div>
);

// Composant Helper : Rendu du logo client
const ClientLogo = ({ icon: Icon, name, colorClass }: { icon: any, name: string, colorClass: string }) => (
  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
    <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon className={`w-5 h-5 ${colorClass} text-opacity-100`} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Client</span>
      <span className="font-serif text-white text-lg tracking-wide">{name}</span>
    </div>
  </div>
);

const Work: React.FC = () => {
  // Le tableau 'cases' est importé.

  return (
    // Le conteneur principal de la page Work
    <div className="bg-[#0B0B0C] min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* 🛑 FOND SPÉCIFIQUE : N'entre pas en conflit avec GlobalBackground de la page d'accueil */}
      <InteractiveBackground /> 
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-24 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-md"
        >
          <TrendingUp className="w-3 h-3 text-[#D1A954]" />
          <span className="text-[#D1A954] text-[10px] font-bold uppercase tracking-[0.2em]">Performance Case Studies</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]"
        >
          We don't just build.<br />We <span className="text-[#D1A954]">multiply.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
        >
          Triple your traffic. 5x your conversions. Cut costs in half.
          <br />Here's exactly how we do it—and the proof.
        </motion.p>
      </div>

      {/* Intro Section */}
      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-b border-white/10 py-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">From Invisible to Inevitable</h2>
            <p className="text-gray-400 leading-relaxed text-base">
              Most agencies show you what they built. We show you <span className="text-white font-medium">what it did</span>.
              <br /><br />
              Every project below includes real transformations: traffic multiplied, conversions exploded, costs slashed. 
              These aren't aspirations—they're outcomes we engineered with precision strategy and high-performance code.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Case Studies List */}
      <div className="container mx-auto px-6 space-y-32 relative z-10">
        {cases.map((project, index) => (
          // ✅ CORRECTION DE LA SYNTAXE JSX : Le contenu de la boucle est bien présent
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="group"
          >
            {/* Project Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-white/10 pb-8">
              <div>
                <ClientLogo icon={project.logo.icon} name={project.logo.name} colorClass={project.logo.color} />
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">{project.title}</h2>
                <p className="text-gray-400 text-lg">{project.subtitle}</p>
              </div>
              <div className="mt-6 md:mt-0">
                <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm">
                  {project.industry}
                </span>
              </div>
            </div>

            {/* Project Image - Browser Frame Style */}
            <div className="mb-12">
              <BrowserWindow>
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
              </BrowserWindow>
            </div>

            {/* Detailed Content */}
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Situation & Solution */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> The Situation
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light">
                    {project.situation}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> What We Changed
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> Why It Worked
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light italic border-l-2 border-[#D1A954] pl-6">
                    {project.insight}
                  </p>
                </div>
              </div>

              {/* Right Column: Results & Stack */}
              <div className="lg:col-span-5 space-y-6">
                {/* Results Table */}
                <div className="bg-[#121213] border border-white/5 rounded-sm overflow-hidden hover:border-[#D1A954]/20 transition-colors">
                  <div className="bg-gradient-to-r from-[#D1A954]/10 to-transparent p-6 border-b border-white/5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#D1A954]" />
                      The Numbers
                    </h4>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {project.results.map((res, i) => (
                        <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{res.label}</span>
                            <span className="text-xs text-[#D1A954] font-medium">{res.impact}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 font-mono">{res.before}</span>
                            <ArrowRight className="w-3 h-3 text-gray-600" />
                            <span className="text-lg text-white font-semibold font-mono">{res.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-[#121213] border border-white/5 p-6 rounded-sm hover:border-[#D1A954]/20 transition-colors">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D1A954]" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/5 text-gray-400 text-xs border border-white/5 rounded-full hover:bg-[#D1A954]/10 hover:text-[#D1A954] hover:border-[#D1A954]/30 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Methodology Section */}
      <div className="container mx-auto px-6 mt-32 relative z-10">
        {/* Ajoutez ici le contenu de votre section Methodology */}
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-6 mt-32 text-center relative z-10">
        {/* Ajoutez ici le contenu de votre section CTA */}
      </div>
    </div>
  );
};

export default Work;
