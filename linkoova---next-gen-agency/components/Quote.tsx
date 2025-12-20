import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserCheck, CheckCircle, RefreshCcw, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

emailjs.init("_sHyfwIAzyg5Krf5j");

// --- COMPOSANT ÉTOILES FILANTES ---
const ShootingStars = () => {
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    const createStar = () => ({
      id: Math.random(),
      top: Math.random() * 70 + "%",
      left: Math.random() * 100 + "%",
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 10
    });
    setStars(Array.from({ length: 12 }, createStar));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ x: "-100px", y: "-100px", opacity: 0 }}
          animate={{ x: "1000px", y: "800px", opacity: [0, 1, 0] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: "linear" }}
          className="absolute w-[2px] h-[2px] bg-[#D1A954] shadow-[0_0_20px_#D1A954]"
          style={{ top: star.top, left: star.left, rotate: "35deg" }}
        >
          <div className="absolute top-0 left-0 w-[120px] h-[1px] bg-gradient-to-r from-[#D1A954] to-transparent transform -translate-x-full" />
        </motion.div>
      ))}
    </div>
  );
};

const Quote: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState({ active: false, progress: 0 });
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<any>({});
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // FONCTION CORRIGÉE : Lance le bot immédiatement après le choix de langue
  const handleLanguage = (l: Language) => {
    setLang(l);
    setIsTyping(true);
    setTimeout(() => {
      const firstData = CHAT_FLOW_BILINGUAL[l].start;
      setMessages([{ id: 'start', sender: 'bot', text: firstData.text }]);
      setCurrentStep('start');
      setIsTyping(false);
    }, 600);
  };

  const sendAuditData = (finalData: any) => {
    // Mapping exact avec discovery_source et user_email en q16
    const keyMap: any = {
      q1: 'company_name', q2: 'industry', q3: 'vision_goal',
      q4: 'competitors', q5: 'competitive_advantage', q6: 'market_position',
      q7: 'target_audience', q8: 'ideal_customer_age', q9: 'user_location',
      q10: 'pain_point', q11: 'current_obstacles', q12: 'ads_strategy',
      q13: 'marketing_channels', q14: 'budget', q15: 'discovery_source', q16: 'user_email'
    };

    const templateParams: any = {};
    Object.keys(finalData).forEach(key => {
      if (keyMap[key]) templateParams[keyMap[key]] = finalData[key];
    });

    emailjs.send('service_94yaj7r', 'template_c1xbsvk', templateParams)
      .then(() => console.log("✅ Audit envoyé avec succès"))
      .catch((err) => console.error("❌ Erreur EmailJS", err));
  };

  const processNext = (nextStep: string, answerValue: string) => {
    if (!lang) return;

    // Sauvegarde la réponse dans l'objet global
    const updatedData = { ...formData, [currentStep]: answerValue };
    setFormData(updatedData);

    // Calcul de la barre de progression (max 16 étapes)
    const stepNum = nextStep.match(/\d+/) ? parseInt(nextStep.match(/\d+/)![0]) : 16;
    setProgress((stepNum / 16) * 100);

    if (nextStep === 'loading') {
      sendAuditData(updatedData);
      return startLoading();
    }

    setIsTyping(true);
    setTimeout(() => {
      const nextData = CHAT_FLOW_BILINGUAL[lang][nextStep];
      if (nextData) {
        setMessages(prev => [...prev, { id: nextStep, sender: 'bot', text: nextData.text }]);
        setCurrentStep(nextStep);
      }
      setIsTyping(false);
    }, 800);
  };

  const onOption = (opt: any) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: opt.label }]);
    processNext(opt.nextStep, opt.label);
  };

  const onInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !lang) return;

    const next = CHAT_FLOW_BILINGUAL[lang][currentStep].nextStep || 'loading';
    const text = inputValue;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: text }]);
    setInputValue('');
    processNext(next, text);
  };

  const startLoading = () => {
    setLoading({ active: true, progress: 0 });
    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => { setSuccess(true); setLoading({ active: false, progress: 100 }); }, 1000);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 2 };
      });
    }, 40);
  };

  const resetAudit = () => {
    setLang(null); setCurrentStep('start'); setProgress(0); setSuccess(false); setFormData({});
    setMessages([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-20 relative overflow-hidden text-white font-sans selection:bg-[#D1A954]/30">
      <ShootingStars />
      
      {/* Glow effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.03]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.02]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-6xl md:text-8xl font-serif italic mb-4">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black italic">Strategic Intelligence Hub</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl">
                <h3 className="text-[#D1A954] font-serif text-xl mb-6 italic tracking-wide">Expert Standards</h3>
                <div className="space-y-4">
                  {[
                    { icon: <UserCheck size={18}/>, title: "Senior Strategists", desc: "Expert analysis of your market position." },
                    { icon: <Award size={18}/>, title: "Precision Roadmap", desc: "Tailored growth and tech strategy." },
                    { icon: <ShieldCheck size={18}/>, title: "Data Security", desc: "Confidential handling of your vision." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-[#D1A954]/30 transition-all group">
                      <div className="text-[#D1A954] group-hover:scale-110 transition-transform">{item.icon}</div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</p>
                        <p className="text-[11px] text-gray-500 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="h-[700px] bg-black border border-white/10 rounded-[3rem] overflow-hidden flex flex-col relative shadow-2xl shadow-black/50">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-20">
                  <motion.div className="h-full bg-[#D1A954] shadow-[0_0_15px_#D1A954]" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence>
                  {loading.active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
                      <div className="w-24 h-24 border-2 border-white/5 rounded-full flex items-center justify-center mb-8 relative">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="absolute inset-[-4px] border-t-2 border-[#D1A954] rounded-full" />
                        <span className="text-[#D1A954] font-serif text-2xl">{loading.progress}%</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-[#D1A954] animate-pulse font-black">Syncing Strategic Data</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle size={60} className="text-[#D1A954] mb-8"/>
                    <h2 className="text-5xl font-serif mb-6 italic">Data <span className="text-[#D1A954] not-italic">Received.</span></h2>
                    <p className="text-gray-400 mb-10 max-w-sm mx-auto text-sm leading-relaxed">Your audit is being analyzed. You will receive a response within 24h.</p>
                    <button onClick={() => window.location.href = '/'} className="bg-white text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#D1A954] transition-all">Return Home <ArrowRight size={14}/></button>
                  </motion.div>
                ) : (
                  <>
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#D1A954] flex items-center justify-center text-black shadow-xl"><UserCheck size={28}/></div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Linkoova Intelligence</p>
                          <p className="text-[9px] text-green-500 uppercase tracking-widest font-black flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Encryption Active</p>
                        </div>
                      </div>
                      <RefreshCcw size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all hover:rotate-180" onClick={resetAudit} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar scroll-smooth">
                      {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-6 rounded-[2rem] text-[13px] max-w-[85%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold rounded-tr-none' : 'bg-white/[0.03] border border-white/10 rounded-tl-none'}`}>{m.text}</div>
                        </div>
                      ))}
                      {isTyping && <div className="flex gap-2 p-4 opacity-40"><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce"/></div>}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-8 bg-black/50 border-t border-white/5 backdrop-blur-3xl">
                      {!lang ? (
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => handleLanguage('EN')} className="py-6 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">English</button>
                          <button onClick={() => handleLanguage('FR')} className="py-6 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Français</button>
                        </div>
                      ) : (
                        <form onSubmit={onInput} className="flex flex-col gap-4">
                          {CHAT_FLOW_BILINGUAL[lang][currentStep]?.options && !isTyping ? (
                            <div className="flex flex-wrap gap-2">
                              {CHAT_FLOW_BILINGUAL[lang][currentStep].options?.map((o: any) => (
                                <button key={o.value} type="button" onClick={() => onOption(o)} className="px-6 py-4 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#D1A954] hover:text-[#D1A954] bg-white/[0.02] transition-all">{o.label}</button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex gap-4">
                              <input type="text" autoFocus value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="..." className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:border-[#D1A954] transition-all" />
                              <button type="submit" className="bg-[#D1A954] text-black px-8 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-[#D1A954]/20"><Send size={20}/></button>
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
