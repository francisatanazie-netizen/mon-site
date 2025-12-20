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

  // Stabilisateur de scroll : scroll uniquement le chat interne
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

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
      .then(() => console.log("✅ Audit envoyé"))
      .catch((err) => console.error("❌ Erreur EmailJS", err));
  };

  const processNext = (nextStep: string, answerValue: string) => {
    if (!lang) return;
    const updatedData = { ...formData, [currentStep]: answerValue };
    setFormData(updatedData);
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
    <div className="fixed inset-0 bg-[#050505] overflow-hidden text-white font-sans selection:bg-[#D1A954]/30">
      <ShootingStars />
      
      {/* Background Gradients Fixed */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.02] pointer-events-none" />

      <div className="h-full w-full overflow-y-auto pt-28 pb-20 no-scrollbar">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <h1 className="text-6xl md:text-8xl font-serif italic mb-4">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black italic">Strategic Intelligence Hub</p>
            </motion.div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-6 hidden lg:block">
                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl">
                  <h3 className="text-[#D1A954] font-serif text-xl mb-6 italic tracking-wide">Expert Standards</h3>
                  <div className="space-y-4">
                    {[
                      { icon: <UserCheck size={18}/>, title: "Senior Strategists", desc: "Expert analysis." },
                      { icon: <Award size={18}/>, title: "Precision Roadmap", desc: "Tailored tech strategy." },
                      { icon: <ShieldCheck size={18}/>, title: "Data Security", desc: "Confidential handling." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-white/[0.01] border border-white/5">
                        <div className="text-[#D1A954]">{item.icon}</div>
                        <div><p className="text-[10px] font-black uppercase tracking-widest">{item.title}</p><p className="text-[11px] text-gray-500">{item.desc}</p></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="h-[650px] bg-black border border-white/10 rounded-[3rem] overflow-hidden flex flex-col relative shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-20">
                    <motion.div className="h-full bg-[#D1A954]" animate={{ width: `${progress}%` }} />
                  </div>

                  <AnimatePresence>
                    {loading.active && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
                        <div className="w-24 h-24 border-2 border-white/5 rounded-full flex items-center justify-center mb-8 relative">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="absolute inset-[-4px] border-t-2 border-[#D1A954] rounded-full" />
                          <span className="text-[#D1A954] font-serif text-2xl">{loading.progress}%</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#D1A954] animate-pulse font-black">Syncing Data</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {success ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                      <CheckCircle size={60} className="text-[#D1A954] mb-8"/>
                      <h2 className="text-5xl font-serif mb-6 italic">Data <span className="text-[#D1A954] not-italic">Received.</span></h2>
                      <button onClick={() => window.location.href = '/'} className="bg-white text-black px-10 py-5 rounded-full font-black text-[10px] uppercase">Home</button>
                    </div>
                  ) : (
                    <>
                      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                        <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-xl bg-[#D1A954] flex items-center justify-center text-black"><UserCheck size={24}/></div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Linkoova Intelligence</p>
                        </div>
                        <RefreshCcw size={18} className="text-gray-600 hover:text-white cursor-pointer" onClick={resetAudit} />
                      </div>

                      <div className="flex-1 overflow-y-auto p-10 space-y-6 no-scrollbar">
                        {messages.map((m, i) => (
                          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-5 rounded-[1.8rem] text-[13px] max-w-[85%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold' : 'bg-white/[0.03] border border-white/10'}`}>{m.text}</div>
                          </div>
                        ))}
                        {isTyping && <div className="flex gap-2 p-4 opacity-40"><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce"/></div>}
                        <div ref={chatEndRef} />
                      </div>

                      <div className="p-8 bg-black border-t border-white/5">
                        {!lang ? (
                          <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => handleLanguage('EN')} className="py-5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">English</button>
                            <button onClick={() => handleLanguage('FR')} className="py-5 border border-white/10 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Français</button>
                          </div>
                        ) : (
                          <form onSubmit={onInput} className="flex flex-col gap-4">
                            {CHAT_FLOW_BILINGUAL[lang][currentStep]?.options && !isTyping ? (
                              <div className="flex flex-wrap gap-2">
                                {CHAT_FLOW_BILINGUAL[lang][currentStep].options?.map((o: any) => (
                                  <button key={o.value} type="button" onClick={() => onOption(o)} className="px-5 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase hover:border-[#D1A954] hover:text-[#D1A954] transition-all">{o.label}</button>
                                ))}
                              </div>
                            ) : (
                              <div className="flex gap-4">
                                <input type="text" autoFocus value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="..." className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#D1A954] outline-none" />
                                <button type="submit" className="bg-[#D1A954] text-black px-6 rounded-2xl"><Send size={18}/></button>
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
    </div>
  );
};

export default Quote;
