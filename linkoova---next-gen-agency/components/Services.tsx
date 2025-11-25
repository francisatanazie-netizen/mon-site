
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Search, Code2, Cpu, Zap, Layers, BrainCircuit, Rocket } from 'lucide-react';
import { ServiceItem } from '../types';

const phases = [
  {
    title: "Phase I: Cognition",
    subtitle: "Data & Strategy",
    description: "Before a single line of code is written, we map the territory.",
    color: "from-blue-500/20 to-indigo-500/20",
    borderColor: "border-blue-500/30",
    iconColor: "text-blue-400",
    phaseIcon: BrainCircuit,
    services: [
        {
            id: '1',
            step: '01',
            title: 'Market Intelligence',
            description: 'Deep-dive analytics to position your brand with surgical precision.',
            icon: BarChart3,
            features: ["Competitor Gap Analysis", "User Persona Modeling", "TAM/SAM/SOM Calculation"]
        },
        {
            id: '6',
            step: '02',
            title: 'AI-Powered Audits',
            description: 'Comprehensive analysis of existing digital infrastructure to find leaks.',
            icon: Zap,
            features: ["Tech Debt Identification", "Conversion Funnel Audit", "Security Vulnerability Scan"]
        }
    ]
  },
  {
    title: "Phase II: Architecture",
    subtitle: "Build & Deploy",
    description: "We engineer robust, scalable systems ready for global traffic.",
    color: "from-[#D1A954]/20 to-yellow-600/20",
    borderColor: "border-[#D1A954]/30",
    iconColor: "text-[#D1A954]",
    phaseIcon: Layers,
    services: [
        {
            id: '3',
            step: '03',
            title: 'Web & SaaS Dev',
            description: 'Enterprise-grade frontend/backend development using Next.js & Python.',
            icon: Code2,
            features: ["Microservices Architecture", "Headless CMS Integration", "High-Availability APIs"]
        },
        {
            id: '4',
            step: '04',
            title: 'Mobile Ecosystems',
            description: 'Native and Cross-platform applications designed for retention.',
            icon: Layers,
            features: ["iOS & Android (React Native)", "Real-time Synchronization", "Offline-First Protocols"]
        }
    ]
  },
  {
    title: "Phase III: Acceleration",
    subtitle: "Growth & Scale",
    description: "Turning infrastructure into a revenue-generating machine.",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-400",
    phaseIcon: Rocket,
    services: [
        {
            id: '2',
            step: '05',
            title: 'Global SEO & Ads',
            description: 'Multi-channel acquisition strategies optimized for B2B conversion.',
            icon: Search,
            features: ["Programmatic SEO", "Multi-lingual Keyword Strategy", "High-ROAS Ad Campaigns"]
        },
        {
            id: '5',
            step: '06',
            title: 'Automation Agents',
            description: 'Custom AI workflows to reduce overhead and qualify leads 24/7.',
            icon: Cpu,
            features: ["CRM Auto-Population", "AI Customer Support Bots", "Email Sequence Automation"]
        }
    ]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#0F0F10] relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            The Linkoova Methodology
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Intelligent Sequencing. <br/>
            <span className="text-gray-500 italic">From concept to dominance.</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">
            We don't just "offer services." We deploy a sequential ecosystem designed to 
            validate, build, and scale your digital presence with mathematical consistency.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {phases.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="space-y-6">
                {/* Phase Header */}
                <div className={`p-6 rounded-sm bg-gradient-to-b ${phase.color} border ${phase.borderColor} backdrop-blur-sm relative overflow-hidden group`}>
                    {/* Large Background Icon Watermark */}
                    <phase.phaseIcon className={`absolute -right-6 -bottom-6 w-32 h-32 opacity-10 ${phase.iconColor} transform group-hover:rotate-12 transition-transform duration-700 pointer-events-none`} />
                    
                    <div className="relative z-10">
                        <h3 className="text-white font-serif text-2xl mb-1 flex items-center gap-2">
                           <phase.phaseIcon className={`w-6 h-6 ${phase.iconColor}`} />
                           {phase.title}
                        </h3>
                        <p className={`text-xs font-bold uppercase tracking-widest ${phase.iconColor} mb-4 ml-8 opacity-80`}>{phase.subtitle}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{phase.description}</p>
                    </div>
                </div>

                {/* Services in Phase */}
                <div className="space-y-6">
                    {phase.services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (phaseIndex * 0.2) + (index * 0.1), duration: 0.5 }}
                            className="group p-8 bg-[#0B0B0C] border border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden rounded-sm"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm ${phase.iconColor} group-hover:bg-white/10 transition-colors`}>
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-black text-gray-700 group-hover:text-gray-500 transition-colors select-none text-[3rem] absolute -top-2 -right-2 opacity-20">
                                    {service.step}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-medium text-white mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                {service.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Detailed Capabilities List */}
                            <ul className="space-y-2 border-t border-white/5 pt-4">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                        <div className={`w-1 h-1 rounded-full bg-current ${phase.iconColor}`}></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={`absolute bottom-0 left-0 w-0 h-[2px] bg-current ${phase.iconColor} group-hover:w-full transition-all duration-700 ease-in-out`} />
                        </motion.div>
                    ))}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
