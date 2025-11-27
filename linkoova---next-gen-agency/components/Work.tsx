import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Target, Landmark, ShoppingBag, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom'; // Si vous utilisez React Router
import { cases } from '../data/casesData'; 
import InteractiveBackground from './InteractiveBackground'; // ✅ Import du fond Canvas

// (Assurez-vous que les composants BrowserWindow et ClientLogo sont définis ou importés ici)

const Work: React.FC = () => {
    return (
        // ✅ CONTENEUR PRINCIPAL : `relative` est essentiel pour positionner le fond `absolute`
        <div className="bg-[#0B0B0C] min-h-screen pt-32 pb-24 relative overflow-hidden">
            
            {/* ✅ FOND SPECIFIQUE : Le Canvas est ABSOLU par rapport à ce conteneur */}
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

            {/* Case Studies List */}
            <div className="container mx-auto px-6 space-y-32 relative z-10">
                {cases.map((project, index) => (
                    // ... (Code de rendu des projets)
                ))}
            </div>

            {/* ... (Sections Methodology et CTA) ... */}

        </div>
    );
};

export default Work;
