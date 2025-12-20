import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserCheck, CheckCircle, RefreshCcw, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

// Initialisation globale
emailjs.init("T-k-H3YkF8_h2W7tV");

const Quote: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState({ active: false, progress: 0 });
  const [success, setSuccess] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  const sendAuditData = (allMessages: any[]) => {
    const userAnswers = allMessages
      .filter(m => m.sender === 'user')
      .map(m => m.text);

    console.log("Transmission Audit en cours...", userAnswers);

    const templateParams = {
      // Configuration Header
      header_tag: "LINKOOVA STRATEGIC HUB",
      report_title: lang === 'FR' ? "RAPPORT D'AUDIT STRATÉGIQUE" : "STRATEGIC AUDIT REPORT",
      confidential_text: "DOCUMENT CONFIDENTIEL - LINKOOVA PROPRIETARY DATA",

      // Mapping Dynamique
      company_name: userAnswers[0] || "Client",
      industry: userAnswers[1] || "N/A",
      vision_goal: userAnswers[2] || "N/A",
      competitors: userAnswers[3] || "N/A",
      competitive_advantage: userAnswers[4] || "N/A",
      market_position: userAnswers[5] || "N/A",
      target_audience: userAnswers[6] || "N/A",
      ideal_customer_age: userAnswers[7] || "N/A",
      user_location: userAnswers[8] || "N/A",
      pain_point: userAnswers[9] || "N/A",
      current_obstacles: userAnswers[10] || "N/A",
      ads_strategy: userAnswers[11] || "N/A",
      marketing_channels: userAnswers[12] || "N/A",
      budget: userAnswers[13] || "À définir",
      user_email: userAnswers[userAnswers.length - 1] || "N/A",

      // Sections Labels HTML
      label_identity: lang === 'FR' ? "Vision du Projet" : "Project Vision",
      label_market: lang === 'FR' ? "Marché & Cible" : "Market & Target",
      label_audience: lang === 'FR' ? "Identité Visuelle" : "Visual Identity",
      label_analysis: lang === 'FR' ? "Fonctionnalités" : "Features",
      label_acquisition: lang === 'FR' ? "Gestion Business" : "Business Strategy",
      label_specs: lang === 'FR' ? "Finance & Contact" : "Finance & Contact",

      // Params pour le Sujet EmailJS
      project_universe: userAnswers[0] || "Linkoova",
      budget_range: userAnswers[13] || "Consultation"
    };

    emailjs.send('service_7yom6rs', 'template_r1s363j', templateParams)
      .then((res) => console.log("✅ Rapport envoyé avec succès ! Status:", res.status))
      .catch((err) => console.error("❌ Échec de l'envoi EmailJS :", err));
  };

  const handleLanguage = (l: Language) => {
    setLang(l);
    setMessages([{ id: 'start', sender: 'bot', text: CHAT_FLOW_BILINGUAL[l].start.text }]);
    setCurrentStep('start');
  };

  const processNext = (step: string) => {
    if (!lang) return;
    const stepNum = step.match(/\d+/) ? parseInt(step.match(/\d+/)![0]) : 0;
    setProgress((stepNum / 15) * 100);

    if (step === 'loading') {
      sendAuditData(messages);
      return startLoading();
    }

    setIsTyping(true);
    setTimeout(() => {
      const data = CHAT_FLOW_BILINGUAL[lang][step];
      if (data) {
        setMessages(prev => [...prev, { id: step, sender: 'bot', text: data.text }]);
        setCurrentStep(step);
      }
      setIsTyping(false);
    }, 600);
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
    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => { setSuccess(true); setLoading({ active: false, progress: 100 }); }, 600);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 4 };
      });
    }, 120);
  };

  const resetAudit = () => {
    setLang(null);
    setCurrentStep('start');
    setMessages([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
    setProgress(0);
    setSuccess(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-20 relative overflow-hidden text-white selection:bg-[#D1A954]/30">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-serif italic mb-4">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black italic">Strategic Intelligence Hub</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl">
                <h3 className="text-[#D1A954] font-serif text-xl mb-6 italic tracking-wide">Expert Standards</h3>
                <div className="space-y-4">
                  {[
                    { icon: <UserCheck size={16}/>, title: "Expert Team", desc: "Our senior strategists analyze your business parameters." },
                    { icon: <Award size={16}/>, title: "Precision Roadmap", desc: "A 360° growth strategy tailored to your market." },
                    { icon: <ShieldCheck size={16}/>, title: "Confidentiality", desc: "Secure data handling within the Linkoova ecosystem." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5">
                      <div className="text-[#D1A954] mt-1">{item.icon}</div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</p>
                        <p className="text-[11px] text-gray-400 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="h-[650px] bg-black border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-20">
                  <motion.div className="h-full bg-[#D1A954]" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence>
                  {loading.active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md">
                      <div className="w-20 h-20 border-2 border-white/5 rounded-full flex items-center justify-center mb-6">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="absolute inset-0 border-t-2 border-[#D1A954] rounded-full" />
                        <span className="text-[#D1A954] font-serif">{loading.progress}%</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.4em] text-[#D1A954] animate-pulse font-black">Syncing Strategic Data</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <div className="w-24 h-24 bg-[#D1A954] rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-[#D1A954]/20"><CheckCircle size={40} className="text-black"/></div>
                    <h2 className="text-5xl font-serif mb-6 italic">Data <span className="text-[#D1A954] not-italic">Synchronized.</span></h2>
                    <p className="text-gray-400 mb-10 max-w-sm mx-auto text-sm leading-relaxed">
                      {lang === 'FR' 
                        ? "Notre équipe traite vos informations. Votre rapport d'audit sera envoyé sous 24h." 
                        : "Our team is processing your information. Your audit report will be sent within 24h."}
                    </p>
                    <button onClick={() => window.location.href = '/'} className="bg-white text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#D1A954] transition-all">Return Home <ArrowRight size={14}/></button>
                  </motion.div>
                ) : (
                  <>
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#D1A954] flex items-center justify-center text-black shadow-lg"><UserCheck size={24}/></div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest">Linkoova Expert Hub</p>
                          <p className="text-[8px] text-green-500 uppercase tracking-widest font-bold">Secure Intelligence</p>
                        </div>
                      </div>
                      <RefreshCcw size={16} className="text-gray-600 hover:text-white cursor-pointer transition-all" onClick={resetAudit} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
                      {messages.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-6 rounded-[2rem] text-[13px] leading-relaxed max-w-[80%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold' : 'bg-white/5 border border-white/10'}`}>
                            {m.text}
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && <div className="flex gap-2 p-4 opacity-40"><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.2s]"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.4s]"/></div>}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-8 bg-white/[0.01] border-t border-white/5 backdrop-blur-xl">
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
                                <button key={o.value} type="button" onClick={() => onOption(o)} className="px-6 py-3 border border-white/10 rounded-full text-[10px] font-black uppercase hover:border-[#D1A954] hover:text-[#D1A954] transition-all">
                                  {o.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex gap-4">
                              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#D1A954]" />
                              <button type="submit" className="bg-[#D1A954] text-black p-5 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#D1A954]/20"><Send size={20}/></button>
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
