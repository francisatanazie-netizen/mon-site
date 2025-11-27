import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';

// 1. 🛑 CORRECTION CRITIQUE : Importation du HOC depuis le dossier 'utils'
import { withTranslation, WithTranslationProps } from '../utils/withTranslation'; 
// VÉRIFIEZ : '../utils/' est le chemin correct depuis le dossier 'components' vers le dossier 'utils'

// 2. Définir les props du composant (il reçoit uniquement les props injectées par le HOC)
type FinalHeroProps = WithTranslationProps;

// Le composant reçoit (t, i18n) en tant que props
const HeroComponent: React.FC<FinalHeroProps> = ({ t }) => { 
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* DÉBUT DU FOND (Code non traduit) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center opacity-30 scale-105 animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/80 via-[#0B0B0C]/50 to-[#0B0B0C]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0B0B0C]/0 to-[#0B0B0C]" />
      </div>
      {/* FIN DU FOND */}

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#D1A954] animate-pulse" />
          {/* 🛑 TRADUCTION : TAGLINE */}
          <span className="text-[#D1A954] text-xs font-medium uppercase tracking-[0.2em]">{t('hero_tagline')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight text-white mb-8 flex flex-col md:block items-center"
        >
          <span className="inline-flex items-center justify-center gap-1 md:gap-4 flex-wrap md:flex-nowrap">
              <span>LINK</span>
              {/* ... Votre logo complexe de binoculaire ... */}
              <div className="flex items-center gap-0.5 mx-2 relative mt-1 md:mt-2 group">
                  {/* Code du logo omis pour la clarté */}
              </div>
              <span>VA</span>
          </span>
          {/* 🛑 TRADUCTION : PHRASE PRINCIPALE */}
          <span className="block mt-6 text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E8E1D5] to-[#D1A954] opacity-90">
            {t('hero_title_phrase')} 
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
        >
          {/* 🛑 TRADUCTION : DESCRIPTION */}
          {t('hero_description')}
          {/* NOTE: Si vous utilisez cette clé, assurez-vous que les balises <span> sont dans le JSON de traduction ou gérez le gras via des composants. */}
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
              {/* 🛑 TRADUCTION : CTA 1 */}
              {t('cta_start_evolution')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
          </a>
          
          <a
            href="#services"
            className="text-white text-sm tracking-widest uppercase border-b border-transparent hover:border-[#D1A954] hover:text-[#D1A954] transition-all pb-1"
          >
            {/* 🛑 TRADUCTION : CTA 2 */}
            {t('cta_analyze_potential')}
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
                {/* 🛑 TRADUCTION : STATISTIQUE 1 */}
                <span>{t('stat_trusted')}</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/10"></div>
            <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-indigo-500" />
                {/* 🛑 TRADUCTION : STATISTIQUE 2 */}
                <span>{t('stat_active')}</span>
            </div>
        </motion.div>
      </div>
    </section>
  );
};

// 3. 🚀 Appliquer le HOC à l'exportation
export default withTranslation(HeroComponent);
