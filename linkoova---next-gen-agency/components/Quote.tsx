import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, CheckCircle, RefreshCcw, ArrowRight, Smartphone, Layout, Server, Globe2, Zap, Search, ShieldCheck, MessageSquare } from 'lucide-react';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

// Types
interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
}

const Quote: React.FC = () => {
  // États de la Logique
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: "Hello! / Bonjour ! Please choose your language to start the audit." }
  ]);
  
  // États de l'Interface
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // --- LOGIQUE DE NAVIGATION ---

  const handleLanguageChoice = (chosenLang: Language) => {
    setLang(chosenLang);
    const flow = CHAT_FLOW_BILINGUAL[chosenLang];
    setMessages([{ id: 'start', sender: 'bot', text: flow.start.text }]);
  };

  const nextStepLogic = (stepKey: string) => {
    if (!lang) return;
    
    if (stepKey === 'loading') {
      startLoadingSequence();
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const stepData = CHAT_FLOW_BILINGUAL[lang][stepKey];
      if (stepData) {
        setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: stepData.text }]);
        setCurrentStep(stepKey);
      }
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (opt: any) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: opt.label }]);
    nextStepLogic(opt.nextStep);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const currentFlow = lang ? CHAT_FLOW_BILINGUAL[lang][currentStep] : null;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: inputValue }]);
    setInputValue('');
    
    if (currentFlow?.nextStep) {
      nextStepLogic(currentFlow.nextStep);
    }
  };

  // --- SEQUENCE DE CHARGEMENT ---
  const startLoadingSequence = () => {
    setIsLoading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
        }, 800);
      } else {
        setLoadingProgress(progress);
      }
    }, 400);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-24 pb-24 relative overflow-hidden text-gray-200 font-sans">
      
      {/* 1. BACKGROUND TROPICALISÉ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ x: [0, 30, 0], y: [0, 20, 0] }} transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#D1A954]/10 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* GAUCHE: TEXTE */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
             <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
               Strategic <span className="text-[#D1A954]">Audit 360</span>
             </h1>
             <p className="text-gray-400 text-lg mb-8 max-w-md">
               Obtenez une feuille de route complète et un devis précis en répondant à nos questions d'expertise.
             </p>
          </motion.div>

          {/* DROITE: CHAT / LOADING / SUCCESS */}
          <div className="relative w-full h-[650px] bg-white/[0.02] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col">
            
            {/* OVERLAY CHARGEMENT DYNAMIQUE */}
            <AnimatePresence>
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md">
                  <div className="w-20 h-20 mb-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" stroke="#ffffff10" strokeWidth="4" fill="none" />
                      <motion.circle cx="50" cy="50" r="45" stroke="#D1A954" strokeWidth="4" fill="none"
                        strokeDasharray="283" strokeDashoffset={283 - (283 * loadingProgress) / 100} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[#D1A954] font-bold">{Math.round(loadingProgress)}%</span>
                  </div>
                  <p className="text-[#D1A954] animate-pulse uppercase tracking-widest text-xs font-bold">Analyse stratégique en cours...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ÉCRAN DE SUCCÈS */}
            {isSuccess ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-[#D1A954] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#D1A954]/20">
                  <CheckCircle className="w-10 h-10 text-black" />
                </div>
                <h2 className="text-3xl font-serif text-white mb-4">Audit Terminé</h2>
                <p className="text-gray-400 mb-8">Nous avons reçu vos informations. Un consultant expert Linkoova vous contactera sous 24h.</p>
                <button className="bg-[#D1A954] text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-colors">
                  Réserver un appel <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              /* LE CHAT CLASSIQUE */
              <>
                <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.01]">
                  <Bot className="w-6 h-6 text-[#D1A954]" />
                  <span className="text-sm font-bold tracking-widest uppercase">Linkoova Assistant</span>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-[#D1A954] text-black rounded-tr-none' : 'bg-white/5 border border-white/10 rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isTyping && <div className="text-[#D1A954] text-xs animate-pulse font-bold uppercase tracking-widest">L'IA analyse...</div>}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 bg-black/40 border-t border-white/5">
                  {!lang ? (
                    <div className="flex gap-2">
                      <button onClick={() => handleLanguageChoice('FR')} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-[#D1A954] hover:text-black transition-all">FRANÇAIS</button>
                      <button onClick={() => handleLanguageChoice('EN')} className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-[#D1A954] hover:text-black transition-all">ENGLISH</button>
                    </div>
                  ) : (
                    <form onSubmit={handleInputSubmit} className="flex gap-2">
                      {lang && CHAT_FLOW_BILINGUAL[lang][currentStep]?.options ? (
                        <div className="flex flex-wrap gap-2">
                          {CHAT_FLOW_BILINGUAL[lang][currentStep].options?.map((opt: any) => (
                            <button key={opt.value} type="button" onClick={() => handleOptionClick(opt)}
                              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs hover:border-[#D1A954] hover:text-[#D1A954] transition-all">
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <>
                          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Votre réponse..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D1A954]" />
                          <button type="submit" className="bg-[#D1A954] text-black p-3 rounded-xl"><Send className="w-5 h-5" /></button>
                        </>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
