import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, CheckCircle, RefreshCcw, ArrowRight, Sparkles } from 'lucide-react';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

const Quote: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([{ id: '0', sender: 'bot', text: "Hello! / Bonjour ! 👋 Choose your language / Choisissez votre langue." }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState({ active: false, progress: 0 });
  const [success, setSuccess] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, isTyping]);

  const handleLanguage = (l: Language) => {
    setLang(l);
    setMessages([{ id: '1', sender: 'bot', text: CHAT_FLOW_BILINGUAL[l].start.text }]);
  };

  const processNext = (step: string) => {
    if (!lang) return;
    if (step === 'loading') return startLoading();

    setIsTyping(true);
    setTimeout(() => {
      const data = CHAT_FLOW_BILINGUAL[lang][step];
      const reactions = lang === 'FR' ? ["Parfait.", "Je vois.", "Très bien."] : ["Got it.", "Perfect.", "Interesting."];
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: `${randomReaction} ${data.text}` }]);
      setCurrentStep(step);
      setIsTyping(false);
    }, 1000);
  };

  const onOption = (opt: any) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: opt.label }]);
    processNext(opt.nextStep);
  };

  const onInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const next = CHAT_FLOW_BILINGUAL[lang!][currentStep].nextStep;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: inputValue }]);
    setInputValue('');
    if (next) processNext(next);
  };

  const startLoading = () => {
    setLoading({ active: true, progress: 0 });
    const inv = setInterval(() => {
      setLoading(prev => {
        if (prev.progress >= 100) {
          clearInterval(inv);
          setTimeout(() => { setLoading({ active: false, progress: 100 }); setSuccess(true); }, 800);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 300);
  };

  return (
    <div className="bg-[#030303] min-h-screen pt-20 pb-20 relative overflow-hidden text-white font-sans">
      
      {/* --- LIVING BACKGROUND --- */}
      <div className="fixed inset-0 z-0">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-[#D1A954]/20 rounded-full blur-[100px]" />
        <motion.div animate={{ y: [0, -50, 0] }} transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]" />
        
        {/* Fireflies (Particles) */}
        {[...Array(10)].map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: i }}
            className="absolute w-1 h-1 bg-[#D1A954] rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4 text-[#D1A954]">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">Next-Gen Audit</span>
            </div>
            <h1 className="text-6xl font-serif mb-6 leading-tight">Linkoova <br/><span className="text-[#D1A954]">Intelligence</span></h1>
            <p className="text-gray-400 text-lg max-w-sm leading-relaxed italic">"Transforming vision into digital excellence through strategic data analysis."</p>
          </motion.div>

          {/* CHAT BOX */}
          <div className="relative w-full h-[600px] bg-black/40 border border-white/10 rounded-3xl backdrop-blur-3xl overflow-hidden flex flex-col shadow-2xl">
            
            {loading.active && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#D1A954] rounded-full animate-spin mb-4" />
                <p className="text-[#D1A954] font-bold tracking-tighter text-2xl">{loading.progress}%</p>
                <p className="text-xs uppercase tracking-widest mt-2 text-gray-500">Generating Roadmap...</p>
              </motion.div>
            )}

            {success ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex-1 flex flex-col items-center justify-center p-10 text-center">
                <div className="w-16 h-16 bg-[#D1A954] rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(209,169,84,0.4)]">
                  <CheckCircle className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-3xl font-serif mb-4">Strategic Data Received</h3>
                <p className="text-gray-400 text-sm mb-8">Our analysts are processing your project. You will receive the 360 roadmap shortly.</p>
                <button className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold transition-all hover:bg-[#D1A954]">
                  Book Meeting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ) : (
              <>
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">AI Assistant Active</span>
                  </div>
                  <RefreshCcw className="w-4 h-4 text-gray-600 hover:text-white cursor-pointer transition-colors" onClick={() => window.location.reload()} />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                  {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed max-w-[85%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black rounded-tr-none font-medium' : 'bg-white/5 border border-white/10 rounded-tl-none text-gray-200'}`}>
                        {m.text}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-[#D1A954] text-[10px] font-bold uppercase">AI Analysis...</motion.div>}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-5 bg-white/[0.02] border-t border-white/5">
                  {!lang ? (
                    <div className="flex gap-3">
                      {['FR', 'EN'].map(l => (
                        <button key={l} onClick={() => handleLanguage(l as Language)} className="flex-1 py-3 border border-white/10 rounded-xl hover:bg-white hover:text-black font-bold transition-all">{l}</button>
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={onInput} className="flex gap-2">
                      {CHAT_FLOW_BILINGUAL[lang][currentStep]?.options && !isTyping ? (
                        <div className="flex flex-wrap gap-2">
                          {CHAT_FLOW_BILINGUAL[lang][currentStep].options?.map((o: any) => (
                            <button key={o.value} type="button" onClick={() => onOption(o)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[11px] hover:border-[#D1A954] hover:text-[#D1A954] transition-all">
                              {o.label}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <>
                          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} disabled={isTyping}
                            placeholder={lang === 'FR' ? "Écrivez ici..." : "Type here..."} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D1A954]" />
                          <button type="submit" className="bg-[#D1A954] text-black p-3 rounded-xl hover:bg-white transition-colors"><Send className="w-5 h-5" /></button>
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
