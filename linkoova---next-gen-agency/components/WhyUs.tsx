
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Server, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'ROI-First Architecture',
    text: 'We do not just ship code; we engineer growth. Our LINKOOVA DIAMOND methodology ensures every architectural decision directly correlates to user retention, conversion optimization, and measurable revenue impact.',
    tags: ['Native Scalability', 'Conversion Opt.', 'Measurable ROI']
  },
  {
    icon: Zap,
    title: 'AI-Powered Technical Precision',
    text: 'Our proprietary Agent LINKOOVA engine executes deep-dive technical audits, identifying 100% of debt and security risks before development begins. We guarantee 99.9% SEO traffic retention during all platform migrations.',
    tags: ['Zero SEO Loss', 'Tech Debt Audit', 'Data Security']
  },
  {
    icon: Server,
    title: 'Certified Cloud Excellence',
    text: 'With architects certified in AWS/GCP and Serverless infrastructure, we deliver systems with 99.99% availability. Our automated CI/CD pipelines reduce Time-to-Market by 30%, giving you a competitive speed advantage.',
    tags: ['CI/CD Deployment', 'Serverless', 'Cloud Certified']
  }
];

const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Left Column - Sticky Title */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-32 h-fit mb-16 lg:mb-0"
          >
            <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
                The Linkoova Difference
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight">
              Why industry <br />
              leaders choose <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#777]">Linkoova.</span>
            </h2>
            <div className="h-1 w-24 bg-[#D1A954] mb-8" />
            <p className="text-lg font-light leading-relaxed text-gray-400 max-w-md mb-10">
                In a digital landscape filled with noise, we provide signal. We build the infrastructure that sustains long-term growth for scaleups and enterprises through our proprietary, data-backed methodology.
            </p>
            
            <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-3 text-gray-300 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-5 h-5 text-[#D1A954]" /> ISO 27001 Compliant
                 </div>
                 <div className="flex items-center gap-3 text-gray-300 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-5 h-5 text-[#D1A954]" /> AWS Select Partner
                 </div>
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group bg-[#121213]/80 backdrop-blur-md p-8 md:p-10 border border-white/5 hover:border-[#D1A954]/50 transition-all duration-500 rounded-sm relative overflow-hidden"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D1A954]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-start gap-6 relative z-10">
                    <div className="bg-white/5 p-4 rounded-full flex-shrink-0 border border-white/5 group-hover:bg-[#D1A954] group-hover:text-black transition-colors duration-500">
                        <feature.icon className="w-6 h-6 text-[#D1A954] group-hover:text-black transition-colors duration-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                            {feature.title} 
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D1A954]" />
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light">
                        {feature.text}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {feature.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 text-gray-400 border border-white/5 text-[10px] font-bold uppercase tracking-wide rounded-sm group-hover:border-[#D1A954]/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
