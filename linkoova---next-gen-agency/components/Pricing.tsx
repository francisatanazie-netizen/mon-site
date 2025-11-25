
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, Zap, Shield, Rocket, Server, Smartphone, Globe, ArrowRight, Brain, User, Lock, Briefcase, Layout, Code, Database, RefreshCcw, Sparkles } from 'lucide-react';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'web' | 'seo' | 'app' | 'enterprise'>('web');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const FeatureItem = ({ included, text }: { included: boolean; text: string }) => (
    <div className={`flex items-start gap-3 text-sm ${included ? 'text-gray-300' : 'text-gray-600'}`}>
      {included ? (
        <Check className="w-4 h-4 text-[#D1A954] mt-0.5 shrink-0" />
      ) : (
        <X className="w-4 h-4 text-gray-700 mt-0.5 shrink-0" />
      )}
      <span className={included ? '' : 'line-through decoration-gray-700'}>{text}</span>
    </div>
  );

  return (
    <section className="bg-[#0B0B0C] min-h-screen pt-32 pb-24 relative overflow-hidden">
      
      {/* Advanced Animated Background for Hero */}
      <div className="absolute top-0 left-0 w-full h-[800px] z-0 pointer-events-none overflow-hidden">
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          
          {/* Moving Gradient Orbs */}
          <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
                x: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-[#D1A954]/10 rounded-full blur-[100px]" 
          />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 text-center mb-20 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5 backdrop-blur-md"
        >
            <span className="text-[#D1A954] text-[10px] font-bold uppercase tracking-[0.2em]">High Frequency Digital Agency</span>
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight"
        >
          Transparent Pricing <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E8E1D5] via-white to-[#D1A954]">for Every Stage.</span>
        </motion.h1>
        
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="flex justify-center gap-2 mb-8"
        >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D1A954]"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D1A954]"></div>
        </motion.div>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg font-light leading-relaxed"
        >
           Advanced front-end architecture and haute couture visual identity for international tech companies.
           <br/><span className="text-white/60 text-sm mt-2 block">Powered by LINKOOVA.</span>
        </motion.p>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-6 mb-20 sticky top-24 z-30">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-[#0B0B0C]/80 backdrop-blur-xl rounded-full border border-white/10 max-w-4xl mx-auto shadow-2xl">
          {[
            { id: 'web', label: 'Web Services', icon: Globe },
            { id: 'seo', label: 'SEO & Strategy', icon: Brain },
            { id: 'app', label: 'Mobile App Dev', icon: Smartphone },
            { id: 'enterprise', label: 'Enterprise', icon: Server },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 ${
                activeTab === tab.id 
                  ? 'bg-[#D1A954] text-[#0B0B0C] shadow-[0_0_20px_rgba(209,169,84,0.3)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* WEB SERVICES CONTENT - Refactored to match SEO Layout */}
      {activeTab === 'web' && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-6 max-w-7xl"
        >
           {/* Section 1: Creation */}
           <div className="mb-24">
               <div className="flex items-center gap-4 mb-8">
                   <div className="w-1 h-8 bg-[#D1A954]"></div>
                   <h3 className="text-2xl font-serif text-white">Creation & Redesign</h3>
               </div>
               
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Pack Start */}
                 <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-500 transition-colors flex flex-col group">
                    <div className="mb-6">
                        <span className="text-gray-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <Layout className="w-4 h-4" /> Pack Start
                        </span>
                        <div className="text-3xl font-serif text-white mt-4">$2,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: Senior Dev</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 min-h-[60px] leading-relaxed">
                        A professional, high-performance foundation designed for speed and reliability. We deliver a pixel-perfect, SEO-ready site perfect for emerging businesses needing immediate credibility without technical complexity.
                    </p>
                    <div className="space-y-3 mb-8 flex-1">
                        <FeatureItem included={true} text="5-8 Premium Static Pages" />
                        <FeatureItem included={true} text="1 Year Managed Hosting" />
                        <FeatureItem included={true} text="Mobile Responsive & Retina Ready" />
                        <FeatureItem included={true} text="Basic Technical SEO Setup" />
                        <FeatureItem included={true} text="Contact Form Integration" />
                        <FeatureItem included={false} text="Custom CMS Architecture" />
                    </div>
                    <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-white">
                        Select Start
                    </button>
                 </div>

                 {/* Pack Evolve */}
                 <div className="bg-[#161618] border border-[#D1A954]/40 p-8 rounded-sm shadow-2xl shadow-black/50 transform md:-translate-y-4 flex flex-col relative">
                    <div className="absolute top-0 right-0 bg-[#D1A954] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                        Best Value
                    </div>
                    <div className="mb-6">
                        <span className="text-[#D1A954] text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <Briefcase className="w-4 h-4" /> Pack Evolve
                        </span>
                        <div className="text-4xl font-serif text-white mt-4">$8,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: UX Architect + SEO</p>
                    </div>
                    <p className="text-gray-300 text-sm mb-8 min-h-[60px] leading-relaxed">
                        Strategic design meets advanced functionality. Built on robust frameworks to capture leads and convert traffic into revenue. Includes a comprehensive content strategy specifically tailored for growing service-based businesses.
                    </p>
                    <div className="space-y-3 mb-8 flex-1">
                        <FeatureItem included={true} text="Semi-Custom Architecture" />
                        <FeatureItem included={true} text="15-25 Optimized Pages" />
                        <FeatureItem included={true} text="CRM & Email Integrations" />
                        <FeatureItem included={true} text="Advanced Content Strategy" />
                        <FeatureItem included={true} text="Blog/News Section Structure" />
                        <FeatureItem included={true} text="Next.js / WordPress CMS" />
                    </div>
                    <button className="w-full py-4 bg-[#D1A954] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#D1A954]/20">
                        Select Evolve
                    </button>
                 </div>

                 {/* Pack Premium */}
                 <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-500 transition-colors flex flex-col group">
                    <div className="mb-6">
                        <span className="text-gray-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <Code className="w-4 h-4" /> Pack Premium
                        </span>
                        <div className="text-3xl font-serif text-white mt-4">$19,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: Product Team</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-8 min-h-[60px] leading-relaxed">
                        Bespoke, enterprise-grade solutions engineered for high-volume transactions and complex user flows. <strong className="text-white">The definitive choice for scaling SaaS platforms</strong> and established e-commerce requiring custom architecture.
                    </p>
                    <div className="space-y-3 mb-8 flex-1">
                        <FeatureItem included={true} text="Fully Custom Design System" />
                        <FeatureItem included={true} text="Complex React/Node Functionality" />
                        <FeatureItem included={true} text="Advanced Conversion Optimization" />
                        <FeatureItem included={true} text="6-Month Strategic Roadmap" />
                        <FeatureItem included={true} text="High-Load Scalability" />
                        <FeatureItem included={true} text="Global CDNs & Security" />
                    </div>
                    <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-white">
                        Select Premium
                    </button>
                 </div>
               </div>
           </div>

           {/* Section 2: Technical & Migration */}
           <div>
               <div className="flex items-center gap-4 mb-8">
                   <div className="w-1 h-8 bg-gray-600"></div>
                   <h3 className="text-2xl font-serif text-white">Technical & Migration</h3>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {/* Pack Clean */}
                 <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-500 transition-colors flex flex-col group">
                    <div className="mb-6">
                        <span className="text-gray-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <RefreshCcw className="w-4 h-4" /> Pack Clean
                        </span>
                        <div className="text-2xl font-serif text-white mt-4">$3,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: Audit Technician</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 min-h-[60px]">
                        Eliminate technical debt and optimize core performance without disrupting your live traffic. Deep code refactoring to improve speed, security, and maintainability.
                    </p>
                    <div className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
                        <FeatureItem included={true} text="Deep Technical Audit" />
                        <FeatureItem included={true} text="Speed Optimization (Core Vitals)" />
                        <FeatureItem included={true} text="Code Refactoring" />
                        <FeatureItem included={true} text="Accessibility Compliance (WCAG)" />
                    </div>
                    <button className="w-full py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Inquire
                    </button>
                 </div>

                 {/* Pack Rebrand */}
                 <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-500 transition-colors flex flex-col group">
                    <div className="mb-6">
                        <span className="text-gray-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <Sparkles className="w-4 h-4" /> Pack Rebrand
                        </span>
                        <div className="text-2xl font-serif text-white mt-4">$9,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: Senior UI/UX</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 min-h-[60px]">
                        Modernize your entire visual identity and user experience while strictly preserving your existing SEO equity. A seamless transition to a contemporary aesthetic without ranking drops.
                    </p>
                    <div className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
                        <FeatureItem included={true} text="Visual Identity Refresh" />
                        <FeatureItem included={true} text="User Journey Optimization" />
                        <FeatureItem included={true} text="Content Migration" />
                        <FeatureItem included={true} text="SEO Preservation Protocol" />
                    </div>
                    <button className="w-full py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Inquire
                    </button>
                 </div>

                 {/* Pack Migration */}
                 <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-500 transition-colors flex flex-col group">
                    <div className="mb-6">
                        <span className="text-gray-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                             <Database className="w-4 h-4" /> Pack Migration
                        </span>
                        <div className="text-2xl font-serif text-white mt-4">$18,990</div>
                        <p className="text-[#D1A954] text-[10px] uppercase tracking-wider mt-2 font-bold">Expert Lead: Platform Engineer</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 min-h-[60px]">
                        Complex platform transfers (e.g., Magento to Shopify) executed with zero downtime. Includes comprehensive data integrity verification and post-launch traffic monitoring.
                    </p>
                    <div className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
                        <FeatureItem included={true} text="Data Integrity Verification" />
                        <FeatureItem included={true} text="Zero-Downtime Transfer" />
                        <FeatureItem included={true} text="60-Day Post-Launch Monitoring" />
                        <FeatureItem included={true} text="Traffic Retention Guarantee" />
                    </div>
                    <button className="w-full py-3 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Inquire
                    </button>
                 </div>
               </div>
           </div>
        </motion.div>
      )}

      {/* SEO CONTENT */}
      {activeTab === 'seo' && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-6"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* FREE TIER */}
            <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-600 transition-colors flex flex-col">
              <div className="mb-6">
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">Flash Diagnostic</span>
                <div className="text-3xl font-serif text-white mt-2">$0</div>
                <p className="text-gray-500 text-xs mt-1">Free Lead Magnet</p>
              </div>
              <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                Instant overall technical score based on raw data analysis.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                <FeatureItem included={true} text="Homepage-only crawl" />
                <FeatureItem included={true} text="Overall Technical Score" />
                <FeatureItem included={true} text="1 Critical Insight" />
                <FeatureItem included={true} text="Data processed in 2 mins" />
                <FeatureItem included={false} text="Detailed human analysis" />
              </div>
              <button className="w-full py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Start Free Diagnostic
              </button>
            </div>

            {/* SILVER TIER */}
            <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-600 transition-colors flex flex-col relative group">
              <div className="mb-6">
                <span className="text-white text-xs font-bold tracking-widest uppercase">Silver</span>
                <div className="text-3xl font-serif text-white mt-2">$149</div>
                <p className="text-gray-500 text-xs mt-1">One-shot</p>
              </div>
              <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                Technical audit and quick optimization wins. Automated data collection.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                <FeatureItem included={true} text="15-page Audit Report" />
                <FeatureItem included={true} text="Crawl 100 pages" />
                <FeatureItem included={true} text="Top 15 Problems Ranked" />
                <FeatureItem included={true} text="Execution Checklist PDF" />
                <FeatureItem included={true} text="Automated Delivery (24h)" />
                <FeatureItem included={false} text="Human Strategic Consulting" />
              </div>
              <button className="w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                Get Technical Audit
              </button>
            </div>

            {/* GOLD TIER */}
            <div className="bg-[#18181b] border border-[#D1A954] p-8 rounded-sm shadow-xl shadow-[#D1A954]/10 transform md:-translate-y-4 flex flex-col relative">
              <div className="absolute top-0 right-0 bg-[#D1A954] text-[#0B0B0C] text-[10px] font-bold px-3 py-1 uppercase tracking-wider">
                Most Popular
              </div>
              <div className="mb-6">
                <span className="text-[#D1A954] text-xs font-bold tracking-widest uppercase">Gold Strategy</span>
                <div className="text-4xl font-serif text-white mt-2">$499</div>
                <p className="text-gray-500 text-xs mt-1">One-shot</p>
              </div>
              <p className="text-gray-300 text-sm mb-6 min-h-[40px]">
                Strategic planning. Billions of data points analyzed, interpreted by Humans.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                <FeatureItem included={true} text="40-page Strategic Report" />
                <FeatureItem included={true} text="Crawl 500 pages" />
                <FeatureItem included={true} text="8-12 Competitors Mapped" />
                <FeatureItem included={true} text="Top 20 Keywords & Difficulty" />
                <FeatureItem included={true} text="30-min Expert Call (Human)" />
                <FeatureItem included={false} text="Content Briefs" />
              </div>
              <button className="w-full py-4 bg-[#D1A954] text-[#0B0B0C] text-xs font-bold uppercase tracking-widest hover:bg-[#e3b963] transition-colors shadow-lg">
                Unlock Strategy
              </button>
            </div>

            {/* DIAMOND TIER */}
            <div className="bg-[#121213] border border-white/10 p-8 rounded-sm hover:border-gray-600 transition-colors flex flex-col">
              <div className="mb-6">
                <span className="text-blue-300 text-xs font-bold tracking-widest uppercase">Diamond Executive</span>
                <div className="text-3xl font-serif text-white mt-2">$1,499</div>
                <p className="text-gray-500 text-xs mt-1">One-shot</p>
              </div>
              <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                Complete executive roadmap. <strong className="text-white">Ideal for E-commerce & High-Traffic Sites.</strong> Expert-crafted plan for 6 months of growth.
              </p>
              <div className="space-y-3 mb-8 flex-1">
                <FeatureItem included={true} text="85+ page Executive Roadmap" />
                <FeatureItem included={true} text="Crawl 5,000 pages" />
                <FeatureItem included={true} text="6-Month Visual Roadmap" />
                <FeatureItem included={true} text="5 Ready Content Briefs" />
                <FeatureItem included={true} text="ROI Calculator" />
                <FeatureItem included={true} text="1-hour Strategy Call (Human)" />
              </div>
              <button className="w-full py-3 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Get Executive Roadmap
              </button>
            </div>

          </div>
        </motion.div>
      )}

      {/* MOBILE APP CONTENT */}
      {activeTab === 'app' && (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-6"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#121213] p-10 border border-white/10 hover:border-[#D1A954]/50 transition-all group flex flex-col">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D1A954] transition-colors">
                  <Rocket className="w-6 h-6 text-white group-hover:text-black" />
               </div>
               <h3 className="text-2xl font-serif text-white mb-2">MVP Pack</h3>
               <p className="text-[#D1A954] font-bold text-lg mb-4">$15k - $35k</p>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                 We prioritize the ONE feature that matters. Market validated by data; built by Human Product Owners.
               </p>
               <div className="space-y-3 border-t border-white/10 pt-6 mb-8 flex-1">
                 <FeatureItem included={true} text="Lean MVP (1 Core Feature)" />
                 <FeatureItem included={true} text="iOS OR Android (Single)" />
                 <FeatureItem included={true} text="Data-Backed Market Validation" />
                 <FeatureItem included={true} text="Basic Backend Infra" />
               </div>
               <div className="flex flex-col flex-1 justify-end">
                   <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-white">
                     Start MVP Journey
                   </button>
               </div>
            </div>

            <div className="bg-[#121213] p-10 border border-[#D1A954] relative flex flex-col">
               <div className="absolute top-4 right-4 text-[#D1A954]"><Zap className="w-5 h-5" /></div>
               <h3 className="text-2xl font-serif text-white mb-2">Deployment Pack</h3>
               <p className="text-[#D1A954] font-bold text-lg mb-4">$45k - $80k</p>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                 Full cross-platform launch. Our team leverages semantic data for initial store visibility.
               </p>
               <div className="space-y-3 border-t border-white/10 pt-6 mb-8 flex-1">
                 <FeatureItem included={true} text="iOS + Android (Cross-platform)" />
                 <FeatureItem included={true} text="Robust Backend Architecture" />
                 <FeatureItem included={true} text="ASO Semantic Data Analysis" />
                 <FeatureItem included={true} text="Comprehensive QA Suite" />
               </div>
               <button className="w-full py-4 bg-[#D1A954] text-black text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                 Launch Your App
               </button>
            </div>

            <div className="bg-[#121213] p-10 border border-white/10 hover:border-[#D1A954]/50 transition-all group flex flex-col">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#D1A954] transition-colors">
                  <Shield className="w-6 h-6 text-white group-hover:text-black" />
               </div>
               <h3 className="text-2xl font-serif text-white mb-2">Enterprise Pack</h3>
               <p className="text-[#D1A954] font-bold text-lg mb-4">$100k+</p>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                 Scale, security, and custom integration. Defined and executed by Senior Software Architects.
               </p>
               <div className="space-y-3 border-t border-white/10 pt-6 mb-8 flex-1">
                 <FeatureItem included={true} text="Enterprise-grade Security" />
                 <FeatureItem included={true} text="Scalability Planning (100k+ users)" />
                 <FeatureItem included={true} text="Automated Code Quality Scans" />
                 <FeatureItem included={true} text="Custom APIs & Integrations" />
               </div>
               <div className="flex flex-col flex-1 justify-end">
                  <button className="w-full py-4 border border-white/10 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all group-hover:border-white">
                     Request Consultation
                  </button>
               </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ENTERPRISE CONTENT */}
      {activeTab === 'enterprise' && (
          <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 text-center"
      >
          <div className="bg-[#121213] border border-[#D1A954]/30 p-12 max-w-4xl mx-auto rounded-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D1A954] to-transparent"></div>
             <h2 className="text-3xl font-serif text-white mb-4">Custom Enterprise Solutions</h2>
             <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                 For organizations requiring dedicated infrastructure, custom proprietary models, and long-term strategic partnerships.
             </p>
             <div className="grid md:grid-cols-3 gap-8 text-left mb-12">
                 <div>
                     <h4 className="text-white font-bold mb-2">Dedicated Experts</h4>
                     <p className="text-xs text-gray-500">Senior architects and strategists assigned exclusively to your account.</p>
                 </div>
                 <div>
                     <h4 className="text-white font-bold mb-2">Private Data Models</h4>
                     <p className="text-xs text-gray-500">We train proprietary data engines specifically on your industry vertical.</p>
                 </div>
                 <div>
                     <h4 className="text-white font-bold mb-2">Security & Control</h4>
                     <p className="text-xs text-gray-500">Rigorous confidentiality protocols and guaranteed uptime.</p>
                 </div>
             </div>
             <button className="px-8 py-4 bg-[#D1A954] text-[#0B0B0C] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                 Contact Sales
             </button>
          </div>
      </motion.div>
      )}

      {/* Human Expertise Section - Refined */}
      <div className="container mx-auto px-6 mt-32">
        <div className="bg-gradient-to-r from-[#121213] to-[#0B0B0C] border border-white/10 p-8 md:p-12 rounded-sm grid md:grid-cols-2 gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#D1A954]/5 skew-x-12 transform origin-bottom-left"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif text-white mb-6">Expertise. <br/><span className="text-[#D1A954]">Enhanced by Data.</span></h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              At Linkoova, every line of code and every strategic decision is crafted by <strong className="text-white">senior human experts</strong>. We utilize advanced data intelligence tools solely to process market information at scale, giving our team the insights needed to build superior solutions.
            </p>
            <ul className="space-y-4">
               <li className="flex items-start gap-3">
                  <div className="bg-[#D1A954]/20 p-2 rounded-full"><User className="w-4 h-4 text-[#D1A954]"/></div>
                  <div>
                      <h4 className="text-white font-bold text-sm">Human-Led Strategy:</h4>
                      <p className="text-gray-500 text-xs">Our architects and consultants maintain 100% control over execution.</p>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <div className="bg-blue-900/30 p-2 rounded-full"><Server className="w-4 h-4 text-blue-400"/></div>
                  <div>
                      <h4 className="text-white font-bold text-sm">Data-Backed Precision:</h4>
                      <p className="text-gray-500 text-xs">We use tools to analyze billions of data points to validate our decisions.</p>
                  </div>
               </li>
               <li className="flex items-start gap-3">
                  <div className="bg-green-900/20 p-2 rounded-full"><Lock className="w-4 h-4 text-green-400"/></div>
                  <div>
                      <h4 className="text-white font-bold text-sm">Security & Confidentiality:</h4>
                      <p className="text-gray-500 text-xs">Enterprise-grade protocols. Your data is never used to train public models.</p>
                  </div>
               </li>
            </ul>
          </div>
          <div className="relative h-64 bg-black/50 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center backdrop-blur-sm z-10">
             <div className="text-center p-8">
                 <Shield className="w-12 h-12 text-[#D1A954] mx-auto mb-4" />
                 <h3 className="text-white font-serif text-xl mb-2">Certified Excellence</h3>
                 <p className="text-gray-500 text-sm">Premium quality assurance by industry veterans.</p>
             </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 mt-32 max-w-3xl">
        <h2 className="text-3xl font-serif text-white mb-12 text-center">Common Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: "How does the 'Data Advantage' affect pricing?",
              a: "By utilizing advanced data processing tools, our experts save hundreds of hours on research and pattern recognition. We pass these efficiency savings to you, allowing you to pay for high-value strategic execution rather than manual data entry."
            },
            {
              q: "Who is responsible for my project?",
              a: "A dedicated human squad led by a Senior Architect or Strategist. While we use software for market analysis, all creative, strategic, and coding work is performed and verified by our elite team."
            },
            {
              q: "Can I upgrade my package later?",
              a: "Yes. You can upgrade from Pack Start to Pack Evolve, or add specific modules as your business scales. We build long-term partnerships."
            },
            {
               q: "How do you handle confidentiality?",
               a: "We adhere to strict enterprise-grade security protocols. Client data is never shared or used to train public models. We operate with complete discretion."
            }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-4">
              <button
                className="w-full flex justify-between items-center text-left py-2 hover:text-[#D1A954] transition-colors"
                onClick={() => toggleFaq(idx)}
              >
                <span className="text-lg font-medium text-white">{item.q}</span>
                {openFaq === idx ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: openFaq === idx ? 'auto' : 0, opacity: openFaq === idx ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="text-gray-400 mt-2 mb-4 text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-6 mt-32 text-center">
         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             <div className="bg-[#121213] p-10 border border-white/10 hover:border-white/30 transition-colors">
                 <h3 className="text-xl text-white font-serif mb-2">Not Sure Yet?</h3>
                 <p className="text-gray-500 text-sm mb-6">Let our experts analyze your current standing.</p>
                 <button className="text-white border-b border-white pb-1 hover:text-[#D1A954] hover:border-[#D1A954] transition-colors text-xs uppercase tracking-widest font-bold">Start Free Diagnostic</button>
             </div>
             <div className="bg-[#D1A954] p-10 text-[#0B0B0C] shadow-[0_10px_40px_-10px_rgba(209,169,84,0.3)]">
                 <h3 className="text-xl font-bold font-serif mb-2">Ready to Start?</h3>
                 <p className="opacity-80 text-sm mb-6">Expert-led digital transformation.</p>
                 <button className="bg-black text-white px-8 py-4 uppercase tracking-widest font-bold text-xs hover:bg-white hover:text-black transition-colors w-full">
                     Choose Your Package
                 </button>
             </div>
         </div>
      </div>
    </section>
  );
};

export default Pricing;
