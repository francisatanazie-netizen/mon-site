
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Globe2, Cpu, BarChart3, Lock, Zap } from 'lucide-react';

const Work: React.FC = () => {
  const cases = [
    {
      id: 'fintech-global',
      client: "Nova FinTech",
      title: "FinTech Global Scale",
      subtitle: "Secure SaaS Infrastructure for High-Frequency Trading",
      category: "SaaS Development",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      challenge: "The client needed to scale their trading platform to handle 15k concurrent users while maintaining <50ms latency and banking-grade security compliance across 2 continents.",
      solution: "We engineered a microservices architecture using Next.js for the frontend and Python/Go for the execution engine. We implemented a custom proprietary AI model to detect fraud in real-time.",
      results: [
        { label: "Latency", value: "<45ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Active Users", value: "15k+" }
      ],
      stack: ["Next.js", "Python", "AWS Lambda", "Kubernetes"]
    },
    {
      id: 'nexus-logistics',
      client: "Nexus Logistics",
      title: "Nexus Logistics AI",
      subtitle: "Predictive Supply Chain Intelligence",
      category: "Data Intelligence",
      year: "2023",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
      challenge: "Nexus faced 20% inefficiencies in route planning due to static data models. They needed a dynamic system to predict disruptions.",
      solution: "Linkoova developed a custom Data Intelligence dashboard integrating live weather, traffic, and geopolitical data. Our AI agent now autonomously reroutes shipments.",
      results: [
        { label: "Annual Savings", value: "$120k" },
        { label: "Efficiency", value: "+28%" },
        { label: "Delivery Speed", value: "+15%" }
      ],
      stack: ["React", "TensorFlow", "PostgreSQL", "Google Maps API"]
    },
    {
      id: 'aura-luxury',
      client: "Maison Aura",
      title: "Aura Luxury Retail",
      subtitle: "Immersive E-commerce Experience",
      category: "Brand & E-com",
      year: "2023",
      image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2574&auto=format&fit=crop",
      challenge: "A heritage luxury brand needed to modernize its digital presence without losing its exclusivity. Standard Shopify templates were insufficient.",
      solution: "We built a headless commerce solution using Shopify Plus and a custom React frontend with WebGL animations to simulate the in-store tactile experience.",
      results: [
        { label: "Conversion", value: "+45%" },
        { label: "Avg Order", value: "$850" },
        { label: "Mobile Sales", value: "+60%" }
      ],
      stack: ["Shopify Plus", "React", "Three.js", "WebGL"]
    },
    {
      id: 'urban-mobility',
      client: "CityFlow",
      title: "Urban Mobility App",
      subtitle: "Cross-Platform MaaS Application",
      category: "Mobile App",
      year: "2024",
      image: "https://images.unsplash.com/photo-1478059425650-ca13d6d422f4?q=80&w=2670&auto=format&fit=crop",
      challenge: "CityFlow wanted to integrate scooter and bike ticketing into a single app for a European city pilot program.",
      solution: "We developed a high-performance React Native app with real-time geolocation and QR scanning. The backend handles secure payments across 2 transit providers.",
      results: [
        { label: "Downloads", value: "45k" },
        { label: "Rating", value: "4.8/5" },
        { label: "Active Users", value: "12k" }
      ],
      stack: ["React Native", "Node.js", "Stripe", "Redis"]
    }
  ];

  return (
    <div className="bg-[#0B0B0C] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="grid-pattern"></div>
      
      {/* Header */}
      <div className="container mx-auto px-6 mb-24 text-center relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-md"
        >
            <span className="text-[#D1A954] text-[10px] font-bold uppercase tracking-[0.2em]">Selected Case Studies</span>
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.1]"
        >
          Engineered for <span className="text-[#D1A954]">Impact.</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
        >
           A deep dive into how Linkoova combines strategic data intelligence with high-performance engineering to solve complex global challenges.
        </motion.p>
      </div>

      {/* Case Studies List */}
      <div className="container mx-auto px-6 space-y-32 relative z-10">
        {cases.map((project, index) => (
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
                    <span className="text-[#D1A954] text-xs font-bold uppercase tracking-widest mb-2 block">{project.category} — {project.year}</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">{project.title}</h2>
                    <p className="text-gray-400 text-lg">{project.subtitle}</p>
                </div>
                <div className="mt-6 md:mt-0">
                    <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm">
                        Client: {project.client}
                    </span>
                </div>
            </div>

            {/* Project Image */}
            <div className="relative aspect-video w-full overflow-hidden mb-12 rounded-sm border border-white/5">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0"
                />
            </div>

            {/* Detailed Content */}
            <div className="grid lg:grid-cols-12 gap-12">
                {/* Left Column: Challenge & Solution */}
                <div className="lg:col-span-7 space-y-12">
                    <div>
                        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-px bg-[#D1A954]"></span> The Challenge
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg font-light">
                            {project.challenge}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-px bg-[#D1A954]"></span> Our Solution
                        </h3>
                        <p className="text-gray-400 leading-relaxed text-lg font-light">
                            {project.solution}
                        </p>
                    </div>
                </div>

                {/* Right Column: Stack & Results */}
                <div className="lg:col-span-5 bg-[#121213] border border-white/5 p-8 rounded-sm hover:border-[#D1A954]/20 transition-colors">
                    <div className="mb-8">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Key Results</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {project.results.map((res, i) => (
                                <div key={i}>
                                    <div className="text-2xl md:text-3xl text-[#D1A954] font-serif font-medium">{res.value}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{res.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 text-gray-400 text-xs border border-white/5 rounded-full hover:bg-[#D1A954]/10 hover:text-[#D1A954] hover:border-[#D1A954]/30 transition-all cursor-default">
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

      {/* CTA Section */}
      <div className="container mx-auto px-6 mt-32 text-center relative z-10">
        <div className="bg-gradient-to-b from-[#121213] to-[#0B0B0C] border border-white/10 p-16 rounded-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1A954] to-transparent"></div>
             <div className="relative z-10">
                 <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Have a similar challenge?</h2>
                 <p className="text-gray-400 max-w-xl mx-auto mb-8">
                     Let's discuss how our engineering and strategy teams can deliver comparable results for your organization.
                 </p>
                 <a href="#contact" className="inline-flex items-center gap-3 bg-[#D1A954] text-[#0B0B0C] px-8 py-4 uppercase tracking-widest font-bold text-xs hover:bg-white transition-colors">
                     Start Your Project <ArrowRight className="w-4 h-4" />
                 </a>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
