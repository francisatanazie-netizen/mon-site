
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Check, Shield, ArrowRight, LineChart, Code2, MessageSquare, Globe, Users } from 'lucide-react';

const Company: React.FC = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    interest: '',
    source: '',
    message: '',
    budget: '',
    timeline: '',
    subscribe: false,
    agree: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! The Linkoova team will be in touch shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-6 text-center mb-24">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-md"
        >
            <span className="text-[#D1A954] text-[10px] font-bold uppercase tracking-[0.2em]">Global Intelligence</span>
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight"
        >
          Built by Experts. <br />
          <span className="text-[#D1A954]">Powered by World.</span>
        </motion.h1>
      </div>

      {/* Leadership Section */}
      <div className="container mx-auto px-6 mb-24">
        <h2 className="text-2xl font-serif text-white mb-12 border-b border-white/10 pb-4">Leadership</h2>
        <div className="grid md:grid-cols-2 gap-12">
            {[
                {
                    name: "James Anderson",
                    role: "Founder & CEO",
                    loc: "New York, USA",
                    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
                    bio: "20+ years in digital marketing. Former VP at TechGlobal. Built LINKOOVA to combine cutting-edge AI with human expertise. Specializes in enterprise strategy and product innovation."
                },
                {
                    name: "Sarah Chen",
                    role: "Chief Technology Officer",
                    loc: "San Francisco, USA",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
                    bio: "Full-stack architect with 15 years experience. Leads our AI development and ensures our tools stay ahead of the curve. Former senior engineer at CloudScale."
                }
            ].map((leader, idx) => (
                <div key={idx} className="bg-[#121213] p-0 border border-white/5 flex flex-col sm:flex-row gap-0 overflow-hidden hover:border-[#D1A954]/30 transition-colors group">
                    {/* Photo Placeholder Space */}
                    <div className="w-full sm:w-48 h-64 sm:h-auto relative flex-shrink-0 bg-gray-800">
                        <img 
                            src={leader.image} 
                            alt={leader.name} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:hidden"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 flex flex-col justify-center">
                        <h3 className="text-xl text-white font-serif">{leader.name}</h3>
                        <p className="text-[#D1A954] text-xs font-bold uppercase tracking-wider mb-2">{leader.role}</p>
                        <p className="text-gray-500 text-xs mb-4 flex items-center gap-1"><MapPin className="w-3 h-3"/> {leader.loc}</p>
                        <p className="text-gray-400 text-sm leading-relaxed">{leader.bio}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Teams Grid - Now with Photos */}
      <div className="container mx-auto px-6 mb-24">
         <h2 className="text-2xl font-serif text-white mb-12 border-b border-white/10 pb-4">Global Squads</h2>
         
         <div className="grid gap-16">
             {/* SEO Team */}
             <div>
                 <h3 className="text-[#D1A954] font-bold text-sm uppercase tracking-widest flex items-center gap-2 mb-8"><LineChart className="w-4 h-4"/> SEO & Strategy</h3>
                 <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { 
                            name: "Julien Lefebvre", 
                            role: "Head of SEO Strategy", 
                            loc: "Paris, France", 
                            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
                            bio: "SEO specialist with 12 years experience. Managed 200+ campaigns generating €50M+." 
                        },
                        { 
                            name: "Emily Watson", 
                            role: "Senior SEO Analyst", 
                            loc: "Toronto, Canada", 
                            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2661&auto=format&fit=crop",
                            bio: "Data-driven SEO expert focused on technical audits. Background in data science." 
                        },
                        { 
                            name: "Amadou Diallo", 
                            role: "Content Strategist", 
                            loc: "Dakar, Senegal", 
                            image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2574&auto=format&fit=crop",
                            bio: "Bilingual content specialist. 8 years crafting SEO-optimized content that converts." 
                        }
                    ].map((member, i) => (
                        <div key={i} className="group bg-[#121213] border border-white/5 hover:border-[#D1A954] transition-colors overflow-hidden p-6 rounded-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-[#D1A954] transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"/>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-lg">{member.name}</h4>
                                    <p className="text-[#D1A954] text-[10px] uppercase tracking-wide">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3"><MapPin className="w-3 h-3"/> {member.loc}</p>
                            <p className="text-gray-400 text-sm leading-relaxed text-sm">{member.bio}</p>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Dev Team */}
             <div>
                 <h3 className="text-[#D1A954] font-bold text-sm uppercase tracking-widest flex items-center gap-2 mb-8"><Code2 className="w-4 h-4"/> Development</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { 
                            name: "Marcus Thorne", 
                            role: "Lead Mobile Developer", 
                            loc: "Austin, USA", 
                            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop",
                            bio: "iOS and Android expert with 50+ apps published. Specializes in scalable mobile solutions." 
                        },
                        { 
                            name: "Sophie Martin", 
                            role: "Full-Stack Web Developer", 
                            loc: "Lyon, France", 
                            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
                            bio: "React, Node.js, and WordPress expert. Built platforms handling 1M+ users." 
                        }
                    ].map((member, i) => (
                        <div key={i} className="group bg-[#121213] border border-white/5 hover:border-[#D1A954] transition-colors overflow-hidden p-6 rounded-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-[#D1A954] transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"/>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-lg">{member.name}</h4>
                                    <p className="text-[#D1A954] text-[10px] uppercase tracking-wide">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3"><MapPin className="w-3 h-3"/> {member.loc}</p>
                            <p className="text-gray-400 text-sm leading-relaxed text-sm">{member.bio}</p>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Success Team */}
             <div>
                 <h3 className="text-[#D1A954] font-bold text-sm uppercase tracking-widest flex items-center gap-2 mb-8"><MessageSquare className="w-4 h-4"/> Client Success</h3>
                 <div className="grid md:grid-cols-2 gap-6">
                    {[
                        { 
                            name: "Olivia Sterling", 
                            role: "Head of Client Success", 
                            loc: "Vancouver, Canada", 
                            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
                            bio: "Ensures every LINKOOVA client achieves their goals. 10 years in account management." 
                        },
                        { 
                            name: "David Ross", 
                            role: "Project Manager", 
                            loc: "Remote, USA", 
                            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2574&auto=format&fit=crop",
                            bio: "Keeps projects on time. PMP certified with 8 years managing digital projects." 
                        }
                    ].map((member, i) => (
                        <div key={i} className="group bg-[#121213] border border-white/5 hover:border-[#D1A954] transition-colors overflow-hidden p-6 rounded-sm">
                             <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 group-hover:border-[#D1A954] transition-colors">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"/>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-lg">{member.name}</h4>
                                    <p className="text-[#D1A954] text-[10px] uppercase tracking-wide">{member.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-500 text-xs flex items-center gap-1 mb-3"><MapPin className="w-3 h-3"/> {member.loc}</p>
                            <p className="text-gray-400 text-sm leading-relaxed text-sm">{member.bio}</p>
                        </div>
                    ))}
                 </div>
             </div>
         </div>
      </div>

      {/* Extended Network */}
      <div className="bg-[#121213] py-24 mb-24 border-y border-white/5">
          <div className="container mx-auto px-6 text-center">
              <h3 className="text-2xl font-serif text-white mb-6">Our Extended Network</h3>
              <p className="text-gray-400 max-w-2xl mx-auto mb-12">
                  Beyond our core team, we work with a curated network of specialists across 25+ countries—designers, copywriters, developers, and consultants—ensuring we can handle any project, no matter how unique.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                  {["UX Researchers", "3D Artists", "Cybersecurity Analysts", "Video Producers", "Copywriters (15 languages)", "Cloud Architects"].map((role, i) => (
                      <span key={i} className="px-4 py-2 border border-white/10 rounded-full hover:border-[#D1A954] hover:text-[#D1A954] transition-colors cursor-default">{role}</span>
                  ))}
              </div>
          </div>
      </div>

      {/* Global Offices with New SIMPLE Map Image */}
      <div className="container mx-auto px-6 mb-32">
        <h2 className="text-2xl font-serif text-white mb-12 border-b border-white/10 pb-4">Global Presence</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Simple, High-Quality Map Image with CSS Overlay Points */}
            <div className="relative aspect-video rounded-sm border border-white/10 overflow-hidden shadow-2xl shadow-black bg-[#0B0B0C] group">
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" 
                    alt="Global Network" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                
                {/* CSS Markers - Positioned using percentages */}
                {/* New York */}
                <div className="absolute top-[35%] left-[28%] group">
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full animate-ping absolute"></div>
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full relative border border-black cursor-pointer"></div>
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">NY</span>
                </div>

                {/* Vancouver (West Coast) - Moved from 28% to 15% Left */}
                <div className="absolute top-[28%] left-[15%]">
                     <div className="w-3 h-3 bg-[#D1A954] rounded-full animate-ping absolute animation-delay-700"></div>
                     <div className="w-3 h-3 bg-[#D1A954] rounded-full relative border border-black cursor-pointer"></div>
                     <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">Vancouver</span>
                </div>

                {/* Paris */}
                <div className="absolute top-[29%] left-[49%]">
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full animate-ping absolute animation-delay-500"></div>
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full relative border border-black cursor-pointer"></div>
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">Paris</span>
                </div>

                {/* Dakar */}
                <div className="absolute top-[48%] left-[46%]">
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full animate-ping absolute animation-delay-1000"></div>
                    <div className="w-3 h-3 bg-[#D1A954] rounded-full relative border border-black cursor-pointer"></div>
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-white drop-shadow-md">Dakar</span>
                </div>

                {/* Overlay Text */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] text-gray-400 border border-white/10 rounded-sm">
                    Live Connections
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { region: "Headquarters 🇺🇸", loc: "New York, USA", note: "Main hub for operations, strategy, and client services" },
                    { region: "European Office 🇫🇷", loc: "Paris, France", note: "Serving francophone European and African markets" },
                    { region: "North American Office 🇨🇦", loc: "Vancouver, Canada", note: "Bilingual team serving Canada and West Coast USA" },
                    { region: "African Office 🇸🇳", loc: "Dakar, Senegal", note: "Specialists in francophone African markets and emerging economies" }
                ].map((office, i) => (
                    <div key={i} className="flex gap-4 p-4 hover:bg-white/5 rounded-sm transition-colors border border-transparent hover:border-white/5">
                        <Globe className="w-5 h-5 text-[#D1A954] flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-white font-bold text-sm">{office.region}</h4>
                            <p className="text-gray-400 text-xs">{office.loc}</p>
                            <p className="text-gray-500 text-xs italic mt-1">{office.note}</p>
                        </div>
                    </div>
                ))}
                <p className="text-gray-400 text-sm mt-8 pt-6 border-t border-white/10">
                    "No matter where you are, we have someone who understands your market, speaks your language, and operates in your timezone."
                </p>
            </div>
        </div>
      </div>

      {/* Advanced Contact Form */}
      <div id="contact" className="container mx-auto px-6 max-w-4xl">
        <div className="bg-[#121213] border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D1A954]/5 rounded-full blur-[50px] pointer-events-none"></div>
            
            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl font-serif text-white mb-4">Send Us a Message</h2>
                <p className="text-gray-400 font-light">
                    Fill out the form below and we'll get back to you within 24 hours.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                {/* Personal Info */}
                <div className="space-y-4">
                    <h3 className="text-[#D1A954] text-xs font-bold uppercase tracking-widest mb-4">Your Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="text" name="firstName" placeholder="First Name *" required onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"/>
                        <input type="text" name="lastName" placeholder="Last Name *" required onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"/>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <input type="email" name="email" placeholder="Email Address *" required onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"/>
                        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"/>
                    </div>
                    <input type="text" name="company" placeholder="Company Name" onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"/>
                </div>

                {/* Inquiry Info */}
                <div className="space-y-4">
                    <h3 className="text-[#D1A954] text-xs font-bold uppercase tracking-widest mb-4">Your Inquiry</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <select name="interest" required onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full appearance-none">
                            <option value="">I'm interested in... *</option>
                            <option value="SEO">SEO & Digital Strategy</option>
                            <option value="App">Mobile App Development</option>
                            <option value="Web">Website Design/Dev</option>
                            <option value="Migration">Website Migration</option>
                            <option value="Enterprise">Enterprise Solutions</option>
                            <option value="Other">Other</option>
                        </select>
                        <select name="source" onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full appearance-none">
                            <option value="">How did you hear about us?</option>
                            <option value="Search">Google Search</option>
                            <option value="Social">Social Media</option>
                            <option value="Referral">Referral</option>
                            <option value="Event">Industry Event</option>
                        </select>
                    </div>
                    <textarea name="message" rows={5} placeholder="Tell us about your project, question, or how we can help... *" required onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full transition-colors"></textarea>
                </div>

                {/* Project Details */}
                <div className="space-y-4">
                    <h3 className="text-[#D1A954] text-xs font-bold uppercase tracking-widest mb-4">Project Details (Optional)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <select name="budget" onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full appearance-none">
                            <option value="">Estimated Budget</option>
                            <option value="<5k">Under $5,000</option>
                            <option value="5k-15k">$5,000 - $15,000</option>
                            <option value="15k-50k">$15,000 - $50,000</option>
                            <option value="50k+">$50,000+</option>
                        </select>
                        <select name="timeline" onChange={handleChange} className="bg-black/20 border border-white/10 p-4 text-white focus:border-[#D1A954] focus:outline-none w-full appearance-none">
                            <option value="">Desired Timeline</option>
                            <option value="Urgent">Urgent (within 1 month)</option>
                            <option value="1-3m">1-3 months</option>
                            <option value="3-6m">3-6 months</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                    </div>
                </div>

                {/* Consents */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                     <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="subscribe" onChange={handleChange} className="w-4 h-4 accent-[#D1A954]" />
                         <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">I'd like to schedule a call to discuss</span>
                     </label>
                     <label className="flex items-center gap-3 cursor-pointer group">
                         <input type="checkbox" name="agree" required onChange={handleChange} className="w-4 h-4 accent-[#D1A954]" />
                         <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">I agree to LINKOOVA's Privacy Policy and Terms of Service *</span>
                     </label>
                </div>

                <button type="submit" className="w-full bg-[#D1A954] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors flex items-center justify-center gap-2">
                    Send Message <ArrowRight className="w-4 h-4"/>
                </button>
                
                <div className="flex justify-center gap-8 text-xs text-gray-500 mt-4">
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3"/> Your info is secure</span>
                    <span className="flex items-center gap-1"><Check className="w-3 h-3"/> Response within 6 hours</span>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Company;
