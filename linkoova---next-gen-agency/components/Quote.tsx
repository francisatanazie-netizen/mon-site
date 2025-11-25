
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Clock, CheckCircle, Globe2, ShieldCheck, Zap, ArrowRight, RefreshCcw, Smartphone, Layout, Server, Search, MessageSquare } from 'lucide-react';

// Types for Chatbot
type MessageSender = 'bot' | 'user';

interface Message {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: Date;
}

interface ChatOption {
  label: string;
  value: string;
  nextStep: string;
}

// Chatbot Configuration
const CHAT_FLOW: Record<string, { text: string; options?: ChatOption[]; type?: 'input' | 'select' }> = {
  start: {
    text: "Hello! I'm Linkoova's AI Assistant. I can help you estimate your project cost in about 3 minutes. Ready to start?",
    options: [
      { label: "Start Quote", value: "start", nextStep: "service_type" }
    ]
  },
  service_type: {
    text: "Great. First, what kind of project are we looking at today?",
    options: [
      { label: "SEO & Strategy", value: "seo", nextStep: "budget_seo" },
      { label: "Mobile App Dev", value: "app", nextStep: "budget_app" },
      { label: "Website Creation", value: "web", nextStep: "budget_web" },
      { label: "Migration/Redesign", value: "migration", nextStep: "budget_web" },
      { label: "Enterprise/Custom", value: "enterprise", nextStep: "timeline" }
    ]
  },
  budget_seo: {
    text: "Understood. For SEO & Strategy, what is your approximate budget?",
    options: [
      { label: "Under $1k (Audit)", value: "<1k", nextStep: "timeline" },
      { label: "$1k - $5k", value: "1k-5k", nextStep: "timeline" },
      { label: "$5k+", value: "5k+", nextStep: "timeline" }
    ]
  },
  budget_app: {
    text: "Mobile development varies by complexity. What's your ballpark budget?",
    options: [
      { label: "$15k - $30k (MVP)", value: "15k-30k", nextStep: "timeline" },
      { label: "$30k - $80k", value: "30k-80k", nextStep: "timeline" },
      { label: "$80k+ (Enterprise)", value: "80k+", nextStep: "timeline" }
    ]
  },
  budget_web: {
    text: "Got it. What are you looking to invest in your web platform?",
    options: [
      { label: "$2.5k - $5k", value: "2.5k-5k", nextStep: "timeline" },
      { label: "$5k - $15k", value: "5k-15k", nextStep: "timeline" },
      { label: "$15k+", value: "15k+", nextStep: "timeline" }
    ]
  },
  timeline: {
    text: "And how soon are you looking to launch this project?",
    options: [
      { label: "ASAP (< 1 Month)", value: "asap", nextStep: "email" },
      { label: "1-3 Months", value: "1-3m", nextStep: "email" },
      { label: "3-6 Months", value: "3-6m", nextStep: "email" },
      { label: "Just planning", value: "planning", nextStep: "email" }
    ]
  },
  email: {
    text: "I've analyzed your requirements. I have a preliminary estimate ready. Please enter your email to receive the details and book a consultation.",
    type: 'input'
  },
  finish: {
    text: "Perfect! I've sent the estimate to your inbox. One of our senior strategists will review your project details and contact you within 24 hours. Is there anything else?",
    options: [
      { label: "Back to Home", value: "home", nextStep: "reset" } 
    ]
  }
};

const Quote: React.FC = () => {
  // Chatbot State
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: CHAT_FLOW.start.text, timestamp: new Date() }
  ]);
  const [currentStep, setCurrentStep] = useState('start');
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOptionClick = (option: ChatOption) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: option.label,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const nextFlow = CHAT_FLOW[option.nextStep];
      if (nextFlow) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: nextFlow.text,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMsg]);
        setCurrentStep(option.nextStep);
      } else if (option.nextStep === 'reset') {
         // In a real app we might redirect, for now just reset chat
         setMessages([{ id: '1', sender: 'bot', text: CHAT_FLOW.start.text, timestamp: new Date() }]);
         setCurrentStep('start');
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // Assuming next step after email is finish
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: CHAT_FLOW.finish.text,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setCurrentStep('finish');
      setIsTyping(false);
    }, 1500);
  };

  const startSpecificQuote = (type: string) => {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset chat and jump to specific flow
      setMessages([
          { id: '1', sender: 'bot', text: CHAT_FLOW.start.text, timestamp: new Date() },
          { id: '2', sender: 'user', text: "I'd like a quote for " + type, timestamp: new Date() }
      ]);
      setIsTyping(true);
      setTimeout(() => {
          // Determine next step based on type text match (simplified)
          let nextStep = 'service_type';
          if(type.includes("SEO")) nextStep = 'budget_seo';
          if(type.includes("App")) nextStep = 'budget_app';
          if(type.includes("Web")) nextStep = 'budget_web';
          if(type.includes("Migration")) nextStep = 'budget_web';
          if(type.includes("Enterprise")) nextStep = 'timeline';

          const nextFlow = CHAT_FLOW[nextStep] || CHAT_FLOW.service_type; // Fallback
          
          const botMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: 'bot',
            text: nextFlow.text,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMsg]);
          setCurrentStep(nextStep);
          setIsTyping(false);
      }, 800);
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen pt-24 pb-24 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D1A954]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* SECTION 1: HERO WITH CHATBOT */}
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left Side: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D1A954]/30 bg-[#D1A954]/5">
              <span className="w-2 h-2 rounded-full bg-[#D1A954] animate-pulse" />
              <span className="text-[#D1A954] text-[10px] font-bold uppercase tracking-[0.2em]">Live Quote Engine</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
              Get Your Custom <br />
              Quote in <span className="text-[#D1A954]">3 Minutes</span>
            </h1>
            
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              Our AI-powered assistant will ask you a few questions to understand your needs and provide an instant preliminary quote. No phone calls. No waiting. Just honest, transparent pricing—right now.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Instant preliminary pricing",
                "No credit card required",
                "Zero commitment",
                "Optional expert consultation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-[#D1A954]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#0B0B0C] flex items-center justify-center text-[10px] text-white font-bold">
                             {String.fromCharCode(64+i)}
                        </div>
                    ))}
                </div>
                <p>Join 500+ businesses who started here</p>
            </div>
          </motion.div>

          {/* Right Side: Chatbot Widget */}
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="order-1 lg:order-2 w-full h-[600px] bg-[#121213] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col relative"
          >
              {/* Header */}
              <div className="bg-[#18181b] p-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#D1A954] flex items-center justify-center text-black">
                          <Bot className="w-6 h-6" />
                      </div>
                      <div>
                          <h3 className="text-white font-medium text-sm">Linkoova Assistant</h3>
                          <p className="text-[#D1A954] text-xs flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                          </p>
                      </div>
                  </div>
                  <button onClick={() => {
                      setMessages([{ id: '1', sender: 'bot', text: CHAT_FLOW.start.text, timestamp: new Date() }]);
                      setCurrentStep('start');
                  }} className="text-gray-500 hover:text-white transition-colors p-2">
                      <RefreshCcw className="w-4 h-4" />
                  </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                  {messages.map((msg) => (
                      <motion.div 
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                          <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                              msg.sender === 'user' 
                              ? 'bg-[#D1A954] text-[#0B0B0C] rounded-br-none' 
                              : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
                          }`}>
                              {msg.text}
                          </div>
                      </motion.div>
                  ))}
                  
                  {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                          <div className="bg-white/10 text-gray-100 p-4 rounded-2xl rounded-bl-none border border-white/5 flex gap-1">
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                      </motion.div>
                  )}
                  <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-[#18181b] border-t border-white/5">
                  {CHAT_FLOW[currentStep]?.options && !isTyping ? (
                      <div className="flex flex-wrap gap-2">
                          {CHAT_FLOW[currentStep].options?.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => handleOptionClick(opt)}
                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-white hover:bg-[#D1A954] hover:text-black transition-all hover:border-[#D1A954]"
                              >
                                  {opt.label}
                              </button>
                          ))}
                      </div>
                  ) : (
                      <form onSubmit={handleInputSubmit} className="flex gap-2">
                          <input 
                              type="text" 
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder={isTyping ? "Assistant is typing..." : "Type your answer..."}
                              className="flex-1 bg-black/20 border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                              disabled={isTyping || !!CHAT_FLOW[currentStep]?.options}
                          />
                          <button 
                              type="submit" 
                              disabled={!inputValue.trim() || isTyping}
                              className="bg-[#D1A954] text-black p-3 rounded-full hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                              <Send className="w-4 h-4" />
                          </button>
                      </form>
                  )}
              </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: HOW IT WORKS */}
      <div className="container mx-auto px-6 py-24 border-t border-white/5">
         <div className="text-center mb-16">
             <span className="text-[#D1A954] text-xs font-bold tracking-[0.2em] uppercase mb-4 block">Process</span>
             <h2 className="text-3xl font-serif text-white">Three Steps to Your Custom Solution</h2>
         </div>

         <div className="grid md:grid-cols-3 gap-12 relative">
             <div className="absolute top-12 left-0 w-full h-0.5 bg-white/5 hidden md:block"></div>
             
             {[
                 {
                     icon: MessageSquare,
                     title: "Tell Us Your Needs",
                     time: "2 minutes",
                     desc: "Our intelligent chatbot asks targeted questions about your industry, challenges, and goals."
                 },
                 {
                     icon: Zap,
                     title: "Receive Instant Insights",
                     time: "30 seconds",
                     desc: "Our AI analyzes your inputs to provide a preliminary price range and recommended roadmap."
                 },
                 {
                     icon: User,
                     title: "Book Strategy Call",
                     time: "Optional",
                     desc: "Speak with a LINKOOVA expert to refine the details and receive a binding proposal."
                 }
             ].map((step, idx) => (
                 <div key={idx} className="relative bg-[#0B0B0C] p-6 border border-white/10 rounded-sm z-10 hover:border-[#D1A954] transition-colors group">
                     <div className="w-16 h-16 bg-[#18181b] rounded-full flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#D1A954] group-hover:text-[#D1A954] transition-all">
                         <step.icon className="w-8 h-8 text-white group-hover:text-[#D1A954]" />
                     </div>
                     <h3 className="text-xl font-medium text-white mb-2">{step.title}</h3>
                     <p className="text-xs text-[#D1A954] uppercase tracking-wider mb-4 font-bold">{step.time}</p>
                     <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                 </div>
             ))}
         </div>
      </div>

      {/* SECTION 3: DIFFERENTIATORS */}
      <div className="bg-[#121213] py-24">
          <div className="container mx-auto px-6">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-16 text-center">Why LINKOOVA's Quote Process Stands Out</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                      { icon: Zap, title: "AI-Powered Precision", text: "We use machine learning to ask the RIGHT questions. No wasted time on irrelevant details." },
                      { icon: Search, title: "Transparent Pricing", text: "You'll see price ranges immediately. No 'we'll call you' delays." },
                      { icon: Globe2, title: "Global Expertise", text: "With teams in USA, France, and Senegal, we understand local markets." },
                      { icon: ShieldCheck, title: "No Pressure, Ever", text: "Get your quote, think it over. We'll never chase you aggressively." }
                  ].map((item, idx) => (
                      <div key={idx} className="bg-[#0B0B0C] p-8 border border-white/5 hover:bg-white/5 transition-colors">
                          <item.icon className="w-8 h-8 text-[#D1A954] mb-4" />
                          <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* SECTION 4: SERVICE GRID */}
      <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-white">What Can You Get Quoted Today?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                  { title: "SEO & Digital Strategy", price: "$149", desc: "AI-powered audits and strategic planning", type: "SEO Strategy" },
                  { title: "Mobile App Development", price: "$15,000", desc: "iOS, Android, or cross-platform MVPs", type: "Mobile App" },
                  { title: "Website Creation", price: "$2,990", desc: "From simple sites to complex e-commerce", type: "Website Creation" },
                  { title: "Website Migration", price: "$3,990", desc: "Risk-free platform changes and refreshes", type: "Web Migration" },
                  { title: "Custom Enterprise", price: "Custom", desc: "Tailored solutions for unique needs", type: "Enterprise" },
              ].map((service, idx) => (
                  <div key={idx} className="bg-[#121213] p-8 border border-white/10 flex flex-col items-start hover:border-[#D1A954] transition-colors">
                      <div className="bg-white/5 p-3 rounded-lg mb-4">
                           {idx === 1 ? <Smartphone className="w-6 h-6 text-white"/> : 
                            idx === 2 ? <Layout className="w-6 h-6 text-white"/> :
                            idx === 4 ? <Server className="w-6 h-6 text-white"/> :
                            <Globe2 className="w-6 h-6 text-white"/>
                           }
                      </div>
                      <h3 className="text-xl font-medium text-white mb-1">{service.title}</h3>
                      <p className="text-[#D1A954] text-xs font-bold uppercase mb-3">Starting at {service.price}</p>
                      <p className="text-gray-500 text-sm mb-6 flex-1">{service.desc}</p>
                      <button 
                         onClick={() => startSpecificQuote(service.type)}
                         className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest hover:text-[#D1A954] transition-colors"
                      >
                          Get Quote <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default Quote;
