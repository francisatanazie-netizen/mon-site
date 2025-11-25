
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem, NavProps } from '../types';

const projects: (ProjectItem & { stack: string[] })[] = [
  {
    id: '1',
    title: 'FinTech Global Scale',
    category: 'SaaS Development',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    year: '2024',
    stack: ['Python', 'AWS', 'React']
  },
  {
    id: '2',
    title: 'Nexus Logistics AI',
    category: 'Data Intelligence',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop',
    year: '2023',
    stack: ['TensorFlow', 'PostgreSQL']
  },
  {
    id: '3',
    title: 'Aura Luxury Retail',
    category: 'Brand & E-com',
    imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2574&auto=format&fit=crop',
    year: '2023',
    stack: ['Shopify Plus', 'WebGL']
  },
  {
    id: '4',
    title: 'Urban Mobility App',
    category: 'Mobile & Automation',
    imageUrl: 'https://images.unsplash.com/photo-1478059425650-ca13d6d422f4?q=80&w=2670&auto=format&fit=crop',
    year: '2024',
    stack: ['React Native', 'Node.js']
  }
];

interface PortfolioProps {
    onNavigate: NavProps['onNavigate'];
}

const Portfolio: React.FC<PortfolioProps> = ({ onNavigate }) => {
  return (
    <section id="portfolio" className="py-24 bg-[#0B0B0C]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2">Selected Work</h2>
            <p className="text-gray-500">Defining the digital landscape.</p>
          </div>
          <button 
            onClick={() => onNavigate('work')}
            className="hidden md:flex items-center gap-2 text-[#D1A954] text-xs uppercase tracking-widest hover:text-white transition-colors mt-8 md:mt-0"
          >
            View All Cases <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Innovative Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group cursor-pointer relative overflow-hidden rounded-sm ${
                  index === 0 ? 'md:col-span-8 md:row-span-2 min-h-[500px]' : 
                  index === 1 ? 'md:col-span-4 md:row-span-1 min-h-[250px]' :
                  index === 2 ? 'md:col-span-4 md:row-span-1 min-h-[250px]' :
                  'md:col-span-12 md:row-span-1 min-h-[400px]'
              }`}
              onClick={() => onNavigate('work')}
            >
              <div className="absolute inset-0 bg-[#0B0B0C]/30 group-hover:bg-transparent transition-colors z-10" />
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.2s] ease-out grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="flex justify-between items-start">
                      <div className="bg-white/10 backdrop-blur-md px-3 py-1 text-[10px] text-white uppercase tracking-widest">
                          {project.year}
                      </div>
                      <ArrowUpRight className="text-[#D1A954] w-6 h-6 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                  </div>
                  
                  <div>
                      <div className="flex gap-2 mb-3">
                          {project.stack.map((tech, i) => (
                              <span key={i} className="px-2 py-1 bg-[#D1A954]/90 text-black text-[10px] font-bold uppercase tracking-wider rounded-sm">
                                  {tech}
                              </span>
                          ))}
                      </div>
                      <h3 className="text-3xl text-white font-serif mb-1">{project.title}</h3>
                      <p className="text-gray-300 text-sm font-light">{project.category}</p>
                  </div>
              </div>

              {/* Static Title (Visible when not hovering on desktop if opacity logic was different, but here we reveal full overlay) */}
              <div className="absolute bottom-8 left-8 z-20 md:hidden">
                  <h3 className="text-2xl text-white font-serif mb-1">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
             <button 
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2 text-[#D1A954] text-xs uppercase tracking-widest hover:text-white transition-colors"
             >
                View All Cases <ArrowUpRight className="w-4 h-4" />
             </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
