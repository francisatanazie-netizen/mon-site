import React from 'react';
import { Quote, Sparkles } from 'lucide-react';

// Updated with more "human" and emotional copy, less corporate jargon
// Retiré le type TestimonialItem pour assurer la compatibilité mono-fichier
const testimonialsData = [
    {
        quote: "Honestly, I was worried about losing our brand's soul in the data. Linkoova didn't just optimize our metrics; they understood our story. It feels less like hiring an agency and more like working with friends who happen to be geniuses.",
        author: "Robert Sterling",
        role: "CMO",
        company: "Vortex SaaS",
        // Old American businessman
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800&h=800" 
    },
    {
        quote: "Launching globally is terrifying. There were moments I thought we'd crash, but the team was there at 2 AM fixing things before I could even panic. That level of care is rare. They saved us.",
        author: "Klaus Wagner",
        role: "Founder",
        company: "Spectra Logistics",
        // Professional male portrait
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=800"
    },
    {
        quote: "I used to drown in spreadsheets. The AI system they built didn't just improve 'efficiency'—it gave me my weekends back. My team is actually happy coming to work now. It's been a complete game changer.",
        author: "Nour Al-Hassan",
        role: "Director of Sales",
        company: "Nova FinTech",
        // Professional female portrait
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800&h=800"
    }
];

const Testimonials: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-[#0a0a0b] text-white">
            {/* Background Atmosphere Effects */}
            {/* Remplacement de brand-gold par #D1A954 pour la compatibilité Tailwind JIT */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D1A954]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1A954]/10 border border-[#D1A954]/20 mb-6 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-[#D1A954]" />
                        <span className="text-[#D1A954] text-[10px] font-bold tracking-[0.2em] uppercase">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl text-white font-serif mb-4">
                        <span className="italic text-[#D1A954]">Human</span> Stories
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto font-light text-sm md:text-base">
                        Behind every successful project, there are people. Here is what they think.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsData.map((item, idx) => (
                        <div 
                            key={idx} 
                            className="group relative bg-[#121213]/80 p-10 rounded-[2rem] border border-white/5 hover:border-[#D1A954]/30 transition-all duration-500 backdrop-blur-sm flex flex-col items-center text-center hover:shadow-[0_10px_40px_-10px_rgba(209,169,84,0.1)] hover:-translate-y-2"
                        >
                            {/* 1. Large Portrait (Top) - Visages bien visibles */}
                            <div className="relative mb-8">
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D1A954]/0 via-[#D1A954]/30 to-[#D1A954]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
                                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#D1A954] transition-colors duration-500 shadow-2xl">
                                    <img 
                                        src={item.image}
                                        alt={`Portrait of ${item.author}`} 
                                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                                        onError={(e) => {
                                            // Fallback vers un avatar UI généré
                                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.author}&background=121213&color=D1A954&size=256`;
                                            e.currentTarget.onerror = null; // Empêche la boucle
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 2. Author Info (Middle) */}
                            <div className="mb-8">
                                <h4 className="text-2xl font-serif text-white mb-1 group-hover:text-[#D1A954] transition-colors duration-300">
                                    {item.author}
                                </h4>
                                <p className="text-[#D1A954] text-xs font-bold tracking-widest uppercase opacity-80">
                                    {item.role}, {item.company}
                                </p>
                            </div>

                            {/* 3. Quote (Bottom) - More human text */}
                            <div className="relative mt-auto">
                                <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-white/5 group-hover:text-[#D1A954]/20 transition-colors duration-500" />
                                <p className="text-gray-300 font-light italic leading-relaxed text-base relative z-10">
                                    "{item.quote}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
