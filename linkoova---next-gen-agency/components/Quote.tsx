import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, CheckCircle, Sparkles, Languages, RefreshCcw, ArrowRight } from 'lucide-react';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

const Quote: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([{ id: '0', sender: 'bot', text: "Welcome to Linkoova's Strategic Hub. / Bienvenue sur le hub stratégique de Linkoova." }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState({ active: false, progress: 0 });
  const [success, setSuccess] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // --- FIX AUTO-SCROLL ---
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  const handleLanguage = (l: Language) => {
    setLang(l);
    setMessages([{ id: '1', sender: 'bot', text: CHAT_FLOW_BILINGUAL[l].start.text }]);
  };

  const processNext = (step: string) => {
    if (!lang) return;
    const stepNum = step.match(/\d+/) ? parseInt(step.match(/\d+/)![0]) : 0;
    setProgress((stepNum / 15) * 100);

    if (step === 'loading') return startLoading();

    setIsTyping(true);
    setTimeout(() => {
      const data = CHAT_FLOW_BILINGUAL[lang][step];
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'bot', text: data.text }]);
      setCurrentStep(step);
      setIsTyping(false);
    }, 900);
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
      setLoading(p => p.progress >= 100 ? (clearInterval(inv), setTimeout(() => setSuccess(true), 500), p) : { ...p, progress: p.progress + 5 });
    }, 120);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-20 relative overflow-hidden text-white selection:bg-[#D1A954]/30">
      
      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D1A954] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-serif leading-none italic mb-4">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
            <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Hybrid strategy powered by Linkoova expertise.</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* PROGRESS SIDEBAR */}
            <div className="lg:col-span-4 hidden lg:block sticky top-28">
              <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl">
                <h3 className="text-[#D1A954] font-serif text-2xl mb-8 italic">Strategic Pillars</h3>
                <div className="space-y-8">
                  {['Vision', 'Target Market', 'Design Emotion', 'Technical Core', 'Business Closing'].map((p, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${progress > (i * 20) ? 'bg-[#D1A954] shadow-[0_0_8px_#D1A954]' : 'bg-white/10'}`} />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${progress > (i * 20) ? 'text-white' : 'text-gray-600'}`}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHAT CONTAINER */}
            <div className="lg:col-span-8 sticky top-28">
              <div className="h-[650px] bg-black border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl relative">
                
                {/* TOP PROGRESS BAR */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
                  <motion.div className="h-full bg-[#D1A954]" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence>
                  {loading.active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
                      <div className="w-20 h-20 border-2 border-white/5 rounded-full flex items-center justify-center mb-6">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 border-t-2 border-[#D1A954] rounded-full" />
                        <span className="text-[#D1A954] font-serif">{loading.progress}%</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-[#D1A954] animate-pulse">Processing 360° Data</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 bg-[#D1A954] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#D1A954]/20"><CheckCircle size={40} className="text-black"/></div>
                    <h2 className="text-5xl font-serif mb-6 italic">Strategic Data <span className="text-[#D1A954] not-italic">Received.</span></h2>
                    <p className="text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed text-sm">
                      {lang === 'FR' ? "Nos analystes traitent votre projet. Vous recevrez votre roadmap 360° sous peu." : "Our analysts are processing your project. You will receive the 360° roadmap shortly."}
                    </p>
                    <button onClick={() => window.location.href = '/'} className="bg-white text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#D1A954] transition-all">Back to Vision <ArrowRight size={14}/></button>
                  </motion.div>
                ) : (
                  <>
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D1A954] to-white/20 flex items-center justify-center text-black shadow-lg"><Bot size={24}/></div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#D1A954]">Audit Intelligence</p>
                          <p className="text-xs font-bold">Linkoova Hub</p>
                        </div>
                      </div>
                      <RefreshCcw size={16} className="text-gray-600 hover:text-white cursor-pointer" onClick={() => window.location.reload()} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
                      {messages.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-6 rounded-[2rem] text-[13px] leading-relaxed max-w-[80%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold' : 'bg-white/5 border border-white/10 backdrop-blur-md'}`}>
                            {m.text}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && <div className="flex gap-2 p-4 opacity-40"><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.2s]"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.4s]"/></div>}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-8 bg-white/[0.02] border-t border-white/5 backdrop-blur-xl">
                      {!lang ? (
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => handleLanguage('EN')} className="py-5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all">English</button>
                          <button onClick={() => handleLanguage('FR')} className="py-5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all">Français</button>
                        </div>
                      ) : (
                        <form onSubmit={onInput} className="flex flex-col gap-4">
                          {CHAT_FLOW_BILINGUAL[lang][currentStep]?.options && !isTyping ? (
                            <div className="flex flex-wrap gap-2">
                              {CHAT_FLOW_BILINGUAL[lang][currentStep].options?.map((o: any) => (
                                <button key={o.value} type="button" onClick={() => onOption(o)} className="px-6 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase hover:border-[#D1A954] hover:text-[#D1A954] transition-all tracking-tighter">
                                  {o.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex gap-4">
                              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} disabled={isTyping} placeholder="..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#D1A954]" />
                              <button type="submit" disabled={isTyping} className="bg-[#D1A954] text-black p-5 rounded-2xl hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-[#D1A954]/20"><Send size={20}/></button>
                            </div>
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
      </div>
    </div>
  );
};

export default Quote;
