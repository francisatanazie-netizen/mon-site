
import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden text-white plasma-effect">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#111112]/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
             <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                Testimonials
             </span>
             <h2 className="text-3xl text-white font-serif">Trusted by innovators</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Linkoova transformed our fragmented marketing into a cohesive global machine. Their data insights are unmatched.",
              author: "Elena Rodriguez",
              role: "CMO",
              company: "Vortex SaaS"
            },
            {
              quote: "The technical prowess of their web team allowed us to launch our platform in 3 continents simultaneously.",
              author: "David Chen",
              role: "Founder",
              company: "Spectra Logistics"
            },
            {
              quote: "A true partner in automation. They cut our lead qualification time by 70% with their AI implementation.",
              author: "Sarah O'Neil",
              role: "Director of Sales",
              company: "Nova FinTech"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 p-8 border border-white/5 hover:border-[#D1A954]/30 transition-colors backdrop-blur-sm">
              <Quote className="w-8 h-8 text-[#D1A954] mb-6 opacity-50" />
              <p className="text-gray-300 font-light italic mb-6 leading-relaxed">"{item.quote}"</p>
              <div>
                <p className="text-white font-medium">{item.author}</p>
                <p className="text-[#D1A954] text-xs uppercase tracking-wide mt-1">{item.role}, {item.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
