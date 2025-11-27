import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, Target, Hexagon, Diamond, ShieldCheck, Globe, Smartphone, CreditCard, Layout, Landmark, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Browser Frame Component to give the "Template Website" look
const BrowserWindow = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`rounded-lg overflow-hidden border border-white/10 bg-[#1A1A1A] shadow-2xl ${className} group-hover:border-[#D1A954]/30 transition-colors duration-500`}>
    <div className="h-8 bg-[#121213] border-b border-white/5 flex items-center px-4 gap-2">
      <div className="flex gap-2 opacity-50">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]"></div>
      </div>
      <div className="ml-4 flex-1 h-4 bg-white/5 rounded-full max-w-[300px] hidden sm:block"></div>
    </div>
    <div className="relative">
      {children}
    </div>
  </div>
);

// Client Logo Component
const ClientLogo = ({ icon: Icon, name, colorClass }: { icon: any, name: string, colorClass: string }) => (
  <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
    <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon className={`w-5 h-5 ${colorClass} text-opacity-100`} />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Client</span>
      <span className="font-serif text-white text-lg tracking-wide">{name}</span>
    </div>
  </div>
);

const Work: React.FC = () => {
  const cases = [
    {
      id: 'banking-luxembourg',
      logo: { icon: Landmark, name: "LuxInvest Private", color: "text-amber-200" },
      industry: "FinTech - Luxembourg",
      title: "Private Banking Digital Fortress",
      subtitle: "Secure Wealth Portal for Ultra-High-Net-Worth Clients",
      category: "Secure Web Platform",
      year: "2024",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      
      situation: "A 150-year-old private bank in Luxembourg City managing €4B AUM. They relied on PDF reports sent via email. Next-gen heirs demanded real-time digital access, but strict CSSF security compliance made off-the-shelf solutions impossible.",
      
      solution: "We engineered a bank-grade secure client portal. Implemented 2FA biometric authentication and end-to-end encryption for document vaults. Created real-time portfolio visualization dashboards integrating directly with their Temenos core banking system.",
      
      results: [
        { label: "Onboarding Time", before: "3 Weeks", after: "2 Days", impact: "90% Faster" },
        { label: "Digital Adoption", before: "12%", after: "89%", impact: "Massive Shift" },
        { label: "Paper Costs", before: "€120k/yr", after: "€5k/yr", impact: "-96% Cost" },
        { label: "NPS Score", before: "45", after: "82", impact: "High Trust" }
      ],
      
      insight: "In Luxembourg, privacy is the product. We didn't just build a dashboard; we built a digital vault that feels as secure and exclusive as their physical vault in Le Grund.",
      
      stack: ["Next.js", "TypeScript", "Temenos API", "OAuth 2.0", "AWS KMS"]
    },
    
    {
      id: 'ecommerce-usa',
      logo: { icon: ShoppingBag, name: "Vanguard NYC", color: "text-rose-400" },
      industry: "Fashion Retail - USA",
      title: "NYC Streetwear Drop Platform",
      subtitle: "Handling 50k Concurrent Users for Limited Releases",
      category: "Headless E-commerce",
      year: "2024",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2670&auto=format&fit=crop",
      
      situation: "A cult streetwear brand in New York. Their limited 'drops' crashed their standard Shopify theme every Friday at 11 AM. 40% of customers saw 'Sold Out' errors when stock existed. Mobile checkout was clunky, leading to 70% cart abandonment.",
      
      solution: "Migrated to a Headless architecture (Shopify Hydrogen). Implemented aggressive edge caching for product pages to handle flash traffic. Built a custom 'waiting room' queue system for fair access. Redesigned mobile checkout flow to be 'One-Thumb' friendly.",
      
      results: [
        { label: "Checkout Speed", before: "45s", after: "12s", impact: "3x Faster" },
        { label: "Conversion Rate", before: "1.8%", after: "5.4%", impact: "Tripled" },
        { label: "Uptime (Drops)", before: "92%", after: "100%", impact: "Zero Crash" },
        { label: "Revenue/Drop", before: "$150k", after: "$420k", impact: "Captured" }
      ],
      
      insight: "Hype kills servers. Standard e-commerce platforms aren't built for 50,000 people refreshing the page at the exact same second. We built infrastructure that eats traffic for breakfast.",
      
      stack: ["Shopify Hydrogen", "Remix", "Redis", "Cloudflare Workers", "React"]
    },
    
    {
      id: 'saas-usa',
      logo: { icon: ShieldCheck, name: "CompliHR USA", color: "text-indigo-400" },
      industry: "B2B SaaS - United States",
      title: "Enterprise HR Compliance",
      subtitle: "Dominating the US Market via Programmatic SEO",
      category: "Growth Engineering",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
      
      situation: "A San Francisco-based HR platform for enterprise. Incredible product, but invisible in a crowded market. CAC (Customer Acquisition Cost) was $450/lead via paid ads. Organic traffic was flatlining because they were trying to rank for generic terms like 'HR Software'.",
      
      solution: "We shifted strategy from generic features to 'State-Specific Compliance'. Generated 3,000+ programmatic landing pages targeting specific labor laws in all 50 states (e.g., 'California Meal Break Compliance Tool'). Built a technical SEO moat that competitors couldn't copy without thousands of engineering hours.",
      
      results: [
        { label: "Organic Traffic", before: "1.2K/mo", after: "85K/mo", impact: "Explosion" },
        { label: "Qualified Leads", before: "45/mo", after: "620/mo", impact: "13x Leads" },
        { label: "Cost Per Lead", before: "$450", after: "$28", impact: "-93% Cost" },
        { label: "ARR Impact", before: "$0", after: "$1.2M", impact: "New Rev" }
      ],
      
      insight: "In the US, you don't win by being general. You win by being specific. We didn't optimize for 'HR', we optimized for 'NY Labor Law Section 195'. Niche wins scale.",
      
      stack: ["Next.js", "Programmatic SEO", "Postgres", "Python", "OpenAI API"]
    },
    
    {
      id: 'logistics-global',
      logo: { icon: Globe, name: "TraceLogic", color: "text-orange-400" },
      industry: "Supply Chain - Global",
      title: "AI Logistics Intelligence",
      subtitle: "Predictive Tracking Across 3 Continents",
      category: "Web App Development",
      year: "2023",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
      
      situation: "A freight forwarder managing US-Europe-Africa shipments via Excel. Team spent 30% of time answering 'Where's my container?'. No existing API coverage for many African ports meant black holes in data.",
      
      solution: "Built a unified dashboard integrating major shipping lines (Maersk, MSC). For ports without APIs, we built a custom parser system that digests local SMS/Email updates into the dashboard. Added AI that predicts delays with 73% accuracy based on weather and route history.",
      
      results: [
        { label: "Support Tickets", before: "280/mo", after: "98/mo", impact: "-65%" },
        { label: "Staff Efficiency", before: "Low", after: "High", impact: "120h Saved" },
        { label: "Delay Prediction", before: "0%", after: "73%", impact: "AI Edge" },
        { label: "Client NPS", before: "32", after: "64", impact: "Doubled" }
      ],
      
      insight: "Global logistics software fails because it assumes clean data exists everywhere. It doesn't. We built a hybrid system that bridges high-tech APIs with low-tech reality.",
      
      stack: ["AWS Lambda", "TensorFlow", "React", "Node.js", "Twilio"]
    }
  ];

  return (
    <div className="bg-[#0B0B0C] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Grid Pattern Background - Defined in index.html */}
      <div className="grid-pattern"></div>
      
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

      {/* Intro Section */}
      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-b border-white/10 py-12"
          >
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-6">From Invisible to Inevitable</h2>
            <p className="text-gray-400 leading-relaxed text-base">
              Most agencies show you what they built. We show you <span className="text-white font-medium">what it did</span>.
              <br /><br />
              Every project below includes real transformations: traffic multiplied, conversions exploded, costs slashed. 
              These aren't aspirations—they're outcomes we engineered with precision strategy and high-performance code.
            </p>
          </motion.div>
        </div>
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
                <ClientLogo icon={project.logo.icon} name={project.logo.name} colorClass={project.logo.color} />
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-2">{project.title}</h2>
                <p className="text-gray-400 text-lg">{project.subtitle}</p>
              </div>
              <div className="mt-6 md:mt-0">
                <span className="px-4 py-2 border border-white/10 rounded-full text-xs text-white uppercase tracking-wider bg-black/40 backdrop-blur-sm">
                  {project.industry}
                </span>
              </div>
            </div>

            {/* Project Image - Browser Frame Style */}
            <div className="mb-12">
              <BrowserWindow>
                <div className="relative aspect-video w-full overflow-hidden">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </div>
              </BrowserWindow>
            </div>

            {/* Detailed Content */}
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Situation & Solution */}
              <div className="lg:col-span-7 space-y-12">
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> The Situation
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light">
                    {project.situation}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> What We Changed
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#D1A954]"></span> Why It Worked
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-base font-light italic border-l-2 border-[#D1A954] pl-6">
                    {project.insight}
                  </p>
                </div>
              </div>

              {/* Right Column: Results & Stack */}
              <div className="lg:col-span-5 space-y-6">
                {/* Results Table */}
                <div className="bg-[#121213] border border-white/5 rounded-sm overflow-hidden hover:border-[#D1A954]/20 transition-colors">
                  <div className="bg-gradient-to-r from-[#D1A954]/10 to-transparent p-6 border-b border-white/5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#D1A954]" />
                      The Numbers
                    </h4>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {project.results.map((res, i) => (
                        <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">{res.label}</span>
                            <span className="text-xs text-[#D1A954] font-medium">{res.impact}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 font-mono">{res.before}</span>
                            <ArrowRight className="w-3 h-3 text-gray-600" />
                            <span className="text-lg text-white font-semibold font-mono">{res.after}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-[#121213] border border-white/5 p-6 rounded-sm hover:border-[#D1A954]/20 transition-colors">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D1A954]" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-white/5 text-gray-400 text-xs border border-white/5 rounded-full hover:bg-[#D1A954]/10 hover:text-[#D1A954] hover:border-[#D1A954]/30 transition-all cursor-default"
                      >
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

      {/* Methodology Section */}
      <div className="container mx-auto px-6 mt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">How We Triple Performance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Behind every multiplied metric is a battle-tested methodology. Here's how we consistently deliver results others promise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#121213] border border-white/5 p-8 rounded-sm hover:border-[#D1A954]/20 transition-colors group">
              <div className="text-3xl font-serif text-[#D1A954] mb-4">01</div>
              <h3 className="text-xl font-serif text-white mb-3">Brutal Honesty Audit</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We identify what's broken, what's bleeding money, what's a waste of time. Most agencies tell you everything is fixable. We tell you what to kill.
              </p>
            </div>

            <div className="bg-[#121213] border border-white/5 p-8 rounded-sm hover:border-[#D1A954]/20 transition-colors group">
              <div className="text-3xl font-serif text-[#D1A954] mb-4">02</div>
              <h3 className="text-xl font-serif text-white mb-3">Data-Driven Decisions</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every recommendation backed by analytics, user behavior, market research. Our proprietary AI finds opportunities competitors miss. Then humans validate.
              </p>
            </div>

            <div className="bg-[#121213] border border-white/5 p-8 rounded-sm hover:border-[#D1A954]/20 transition-colors group">
              <div className="text-3xl font-serif text-[#D1A954] mb-4">03</div>
              <h3 className="text-xl font-serif text-white mb-3">Performance Engineering</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Speed matters. Mobile matters. We optimize for real-world conditions: slow networks, cheap devices, impatient users. If it doesn't load fast, it doesn't work.
              </p>
            </div>

            <div className="bg-[#121213] border border-white/5 p-8 rounded-sm hover:border-[#D1A954]/20 transition-colors group">
              <div className="text-3xl font-serif text-[#D1A954] mb-4">04</div>
              <h3 className="text-xl font-serif text-white mb-3">Global Intelligence</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our team spans Dakar, Paris, Toronto, Fort St. John. We don't localize—we build native. We know markets from the inside because we live there.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Final CTA Section */}
      <div className="container mx-auto px-6 mt-32 text-center relative z-10">
        <div className="bg-gradient-to-b from-[#121213] to-[#0B0B0C] border border-white/10 rounded-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1A954] to-transparent"></div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 p-12 border-b border-white/5 hidden md:grid">
            <div>
              <div className="text-4xl md:text-5xl font-serif text-[#D1A954] mb-2">340%</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Traffic Increase</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-[#D1A954] mb-2">5-13x</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Revenue Multiplier</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif text-[#D1A954] mb-2">73%</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">AI Accuracy</div>
            </div>
          </div>

          {/* CTA Content */}
          <div className="p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Ready to multiply your metrics?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              These results aren't luck. They're engineered. Let's run the numbers on your project and show you what's possible.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-3 bg-[#D1A954] text-[#0B0B0C] px-8 py-4 uppercase tracking-widest font-bold text-xs hover:bg-white transition-colors"
              >
                Get Your Performance Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 uppercase tracking-widest font-bold text-xs hover:bg-white/5 transition-colors"
              >
                See Our Approach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
