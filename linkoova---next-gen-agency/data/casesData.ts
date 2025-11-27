import { Landmark, ShoppingBag, ShieldCheck, Globe } from 'lucide-react';

export const cases = [
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
