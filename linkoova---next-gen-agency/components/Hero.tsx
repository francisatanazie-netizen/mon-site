
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background overlay for readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0B0B0C]/50 via-transparent to-[#0B0B0C] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#D1A954] animate-pulse" />
          <span className="text-[#D1A954] text-xs font-medium uppercase tracking-[0.2em]">The Operating System for Global Growth</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight text-white mb-8 flex flex-col md:block items-center"
        >
          <span className="inline-flex items-center justify-center gap-1 md:gap-4 flex-wrap md:flex-nowrap">
              <span>LINK</span>
              
              {/* Ultra-High-Fidelity Binocular Logo (Industrial/Tech Style) */}
              <div className="flex items-center gap-0.5 mx-2 relative mt-1 md:mt-2 group">
                  
                  {/* Left Barrel */}
                  <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-full bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center border-[6px] md:border-[8px] border-[#1a1a1a] ring-1 ring-gray-700/50">
                      <div className="absolute inset-0 rounded-full border border-gray-600/30 opacity-60 flex items-center justify-center">
                         <div className="w-[90%] h-[90%] border border-dashed border-gray-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                      </div>
                      <div className="absolute inset-[2px] md:inset-[4px] rounded-full border-[1px] border-[#D1A954]/40"></div>
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,1)]"></div>
                      <div className="absolute inset-[8px] md:inset-[12px] rounded-full bg-[#050505] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-gray-800">
                          <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-transparent to-emerald-900/20 opacity-90"></div>
                          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-45 transform translate-y-full group-hover:translate-y-[-200%] transition-transform duration-[2s] ease-in-out"></div>
                          <div className="absolute top-[20%] right-[25%] w-2 h-2 bg-white/80 rounded-full blur-[1px] shadow-[0_0_10px_white]"></div>
                      </div>
                  </div>
                  
                  {/* Heavy Duty Central Hinge & Focus Wheel */}
                  <div className="flex flex-col items-center justify-center h-full z-20 -mx-1 md:-mx-2">
                      <div className="w-6 md:w-10 h-2 md:h-3 bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] border-y border-gray-700 rounded-sm shadow-lg mb-0.5"></div>
                      <div className="w-5 md:w-8 h-10 md:h-16 bg-[#151515] rounded-sm border-x border-gray-600 flex flex-col justify-evenly py-[2px] shadow-2xl relative z-30 group-hover:rotate-180 transition-all duration-700">
                          {[...Array(8)].map((_, i) => (
                              <div key={i} className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
                          ))}
                      </div>
                      <div className="w-6 md:w-10 h-2 md:h-3 bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] border-y border-gray-700 rounded-sm shadow-lg mt-0.5"></div>
                  </div>
                  
                  {/* Right Barrel */}
                  <div className="relative w-16 h-16 md:w-28 md:h-28 rounded-full bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center border-[6px] md:border-[8px] border-[#1a1a1a] ring-1 ring-gray-700/50">
                      <div className="absolute inset-0 rounded-full border border-gray-600/30 opacity-60 flex items-center justify-center">
                         <div className="w-[90%] h-[90%] border border-dashed border-gray-500/30 rounded-full animate-[spin_10s_linear_infinite_reverse]"></div>
                      </div>
                      <div className="absolute inset-[2px] md:inset-[4px] rounded-full border-[1px] border-[#D1A954]/40"></div>
                       <div className="absolute inset-0 rounded-full shadow-[inset_0_10px_20px_rgba(0,0,0,1)]"></div>
                      <div className="absolute inset-[8px] md:inset-[12px] rounded-full bg-[#050505] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)] border border-gray-800">
                          <div className="absolute inset-0 bg-gradient-to-tl from-violet-900/40 via-transparent to-emerald-900/20 opacity-90"></div>
                           <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-transparent via-white/5 to-transparent rotate-45 transform translate-y-full group-hover:translate-y-[-200%] transition-transform duration-[2s] ease-in-out delay-100"></div>
                          <div className="absolute top-[20%] left-[25%] w-2 h-2 bg-white/80 rounded-full blur-[1px] shadow-[0_0_10px_white]"></div>
                      </div>
                  </div>

              </div>

              <span>VA</span>
          </span>
          <span className="block mt-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E1D5] to-[#D1A954] opacity-90">
            Link all over the world.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          We transform local market leaders into international powerhouses using <span className="text-white">proprietary data intelligence</span> and <span className="text-white">high-performance engineering</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12"
        >
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-[#D1A954] text-[#0B0B0C] font-bold text-sm tracking-widest uppercase overflow-hidden shadow-[0_0_20px_rgba(209,169,84,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Evolution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </a>
          
          <a
            href="#services"
            className="text-white text-sm tracking-widest uppercase border-b border-transparent hover:border-[#D1A954] hover:text-[#D1A954] transition-all pb-1"
          >
            Analyze Your Potential
          </a>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-xs text-gray-500 uppercase tracking-wide border-t border-white/5 pt-8 max-w-lg mx-auto"
        >
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Trusted by 500+ Enterprises</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-indigo-500" />
                <span>Active in 15 Countries</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
