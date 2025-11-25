
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code2, Brain, Globe2, ArrowUpRight, Zap, Layers } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="company" className="py-24 md:py-32 bg-transparent relative">
      <div className="container mx-auto px-6">
        
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Our DNA
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 leading-tight">
              Synchronizing <br />
              <span className="italic text-gray-400">Global Markets.</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                We don't just bridge continents; we wire them together. Operating at the strategic intersection of <strong className="text-white">The Americas, Europe, and Africa</strong>, Linkoova possesses a rare tri-continental DNA.
              </p>
              <p>
                This unique positioning allows us to navigate cultural nuances that automated tools miss, while our proprietary AI engines handle the scale. Where Silicon Valley tech meets global street smarts—that's where you'll find us.
              </p>
              <p className="text-[#D1A954] italic font-medium">
                  "Data provides the map. Culture provides the compass. We provide the engine."
              </p>
            </div>

            {/* ROI Stats Section - Expanded Metrics */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[#D1A954] text-xs font-bold tracking-widest uppercase mb-6">Performance at Scale</p>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-y-8 gap-x-12">
                {[
                  { label: 'Client Value Generated', value: '$2.5M+' },
                  { label: 'Partnership Retention', value: '96%' },
                  { label: 'Workflow Efficiency', value: '+300%' },
                  { label: 'Speed to Market', value: '2x' }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-2 flex items-start">
                        {stat.value}
                    </h3>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-tight font-bold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full"
          >
              <div className="absolute inset-0 bg-[#161617]/60 backdrop-blur-sm overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-30 grayscale mix-blend-overlay"></div>
                   
                   {/* Decorative UI Elements */}
                   <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#D1A954]/10 rounded-full blur-[60px]"></div>
                   <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-900/30 rounded-full blur-[80px]"></div>
                   
                   {/* Dynamic Cards */}
                   <div className="absolute top-12 right-12 p-5 bg-white/5 backdrop-blur-md border border-white/10 w-56 rounded-sm shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] text-white uppercase tracking-wider font-bold">Live Traffic</span>
                          <div className="flex gap-1"><span className="w-1 h-1 bg-emerald-500 rounded-full"></span><span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span></div>
                      </div>
                      <div className="flex items-end gap-2 h-12">
                          {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
                              <div key={i} className="w-full bg-[#D1A954]" style={{ height: `${h}%`, opacity: 0.2 + (i * 0.1) }}></div>
                          ))}
                      </div>
                   </div>

                   <div className="absolute bottom-12 left-12 p-6 bg-[#D1A954] w-64 rounded-sm text-[#0B0B0C] shadow-[0_20px_50px_rgba(0,0,0,0.5)] group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                      <div className="flex justify-between items-start mb-4">
                          <Layers className="w-6 h-6 opacity-80"/>
                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                      </div>
                      <p className="font-serif text-lg leading-none mb-2 font-bold">Market <br/>Dominance</p>
                      <p className="text-xs opacity-80 uppercase tracking-wide font-medium">Strategy Report Executed</p>
                   </div>
              </div>
          </motion.div>
        </div>

        {/* Team & Competence Section */}
        <div className="grid lg:grid-cols-2 gap-12 border-t border-white/10 pt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pr-8"
            >
                <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                   Our Squad
                </span>
                <h3 className="text-3xl font-serif text-white mb-6">Built by experts,<br/>powered by collaboration.</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                   Linkoova isn't just an agency; it's a global collective. Our core team consists of Senior Software Architects, Data Scientists, and Creative Strategists hailing from top-tier tech hubs.
                </p>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-4 items-start">
                        <div className="bg-white/5 p-3 rounded-full border border-white/5"><Users className="w-5 h-5 text-[#D1A954]" /></div>
                        <div>
                            <h4 className="text-white font-medium">The Global Collaborators</h4>
                            <p className="text-sm text-gray-500 mt-1">We maintain an exclusive network of specialized collaborators across 3 continents, allowing us to scale instantly for enterprise demands.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="bg-white/5 p-3 rounded-full border border-white/5"><Globe2 className="w-5 h-5 text-[#D1A954]" /></div>
                        <div>
                            <h4 className="text-white font-medium">Cultural Intelligence</h4>
                            <p className="text-sm text-gray-500 mt-1">Our diverse team ensures your product resonates locally, whether you're targeting Dakar, Paris, Vancouver, or New York.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { icon: Code2, title: "Engineering", text: "Full-stack development (Next.js, Node, Python). High-load architecture." },
                      { icon: Brain, title: "AI Strategy", text: "LLM integration, proprietary data modeling, and automated workflow agents." },
                      { icon: Globe2, title: "Global SEO", text: "Multilingual semantic search dominance. Technical audits." },
                      { icon: Users, title: "UX/UI Design", text: "Haute couture visual identity. Interfaces that convert." }
                    ].map((item, i) => (
                      <div key={i} className="bg-[#121213]/70 p-6 border border-white/5 hover:border-[#D1A954]/30 transition-colors backdrop-blur-sm rounded-sm">
                          <item.icon className="w-8 h-8 text-white mb-4" />
                          <h4 className="text-[#D1A954] font-serif text-lg mb-2">{item.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
