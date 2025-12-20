import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserCheck, CheckCircle, RefreshCcw, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

// INITIALISATION
emailjs.init("_sHyfwIAzyg5Krf5j");

const Quote: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [currentStep, setCurrentStep] = useState('start');
  const [messages, setMessages] = useState([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState({ active: false, progress: 0 });
  const [success, setSuccess] = useState(false);

  // STOCKAGE INFAILLIBLE : Chaque réponse est liée à sa clé (q1, q2, q3...)
  const [formData, setFormData] = useState<any>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  const sendAuditData = (finalData: any) => {
    const templateParams = {
      header_tag: "LINKOOVA STRATEGIC HUB",
      report_title: lang === 'FR' ? "RAPPORT D'AUDIT COMPLET" : "COMPLETE AUDIT REPORT",
      
      // On vide les labels pour laisser ton HTML EmailJS gérer le design
      label_identity: "", label_market: "", label_audience: "", label_analysis: "", label_acquisition: "", label_specs: "",
      q1_label: "", q2_label: "", q3_label: "", q4_label: "", q5_label: "", q6_label: "", q7_label: "", q8_label: "", q9_label: "", q10_label: "", q11_label: "", q12_label: "", q13_label: "", q14_label: "", q15_label: "",
      confidential_text: "DOCUMENT CONFIDENTIEL LINKOOVA",

      // MAPPING DIRECT (Basé sur les clés du chatData)
      company_name: finalData.q1 || "N/A",
      industry: finalData.q2 || "N/A",
      vision_goal: finalData.q3 || "N/A",
      competitors: finalData.q4 || "N/A",
      competitive_advantage: finalData.q5 || "N/A",
      market_position: finalData.q6 || "N/A",
      target_audience: finalData.q7 || "N/A",
      ideal_customer_age: finalData.q8 || "N/A",
      user_location: finalData.q9 || "N/A",
      pain_point: finalData.q10 || "N/A",
      current_obstacles: finalData.q11 || "N/A",
      ads_strategy: finalData.q12 || "N/A",
      marketing_channels: finalData.q13 || "N/A",
      budget: finalData.q14 || "N/A",
      user_email: finalData.q15 || "N/A"
    };

    emailjs.send('service_94yaj7r', 'template_c1xbsvk', templateParams)
      .then(() => console.log("✅ Email envoyé sans décalage"))
      .catch((err) => console.error("❌ Erreur EmailJS", err));
  };

  const handleLanguage = (l: Language) => {
    setLang(l);
    setMessages([{ id: 'start', sender: 'bot', text: CHAT_FLOW_BILINGUAL[l].start.text }]);
    setCurrentStep('start');
  };

  const processNext = (step: string, lastAnswer: string) => {
    if (!lang) return;

    // On enregistre la réponse avec le nom de l'étape actuelle comme clé
    const updatedData = { ...formData, [currentStep]: lastAnswer };
    setFormData(updatedData);

    const stepNum = step.match(/\d+/) ? parseInt(step.match(/\d+/)![0]) : 0;
    setProgress((stepNum / 15) * 100);

    if (step === 'loading') {
      sendAuditData(updatedData);
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
    processNext(opt.nextStep, opt.label);
  };

  const onInput = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const next = CHAT_FLOW_BILINGUAL[lang!][currentStep].nextStep;
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text: inputValue }]);
    const val = inputValue;
    setInputValue('');
    if (next) processNext(next, val);
  };

  const startLoading = () => {
    setLoading({ active: true, progress: 0 });
    const interval = setInterval(() => {
      setLoading(prev => {
        if (prev.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => { setSuccess(true); setLoading({ active: false, progress: 100 }); }, 800);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 150);
  };

  const resetAudit = () => {
    setLang(null);
    setCurrentStep('start');
    setMessages([{ id: 'init', sender: 'bot', text: "Welcome to Linkoova. / Bienvenue chez Linkoova." }]);
    setProgress(0);
    setSuccess(false);
    setFormData({});
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-20 relative overflow-hidden text-white">
      {/* BACKGROUND DESIGN */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#D1A954] rounded-full blur-[150px] opacity-[0.02] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-6xl md:text-8xl font-serif italic mb-4">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
            <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-black italic">Strategic Intelligence Hub</p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl">
                <h3 className="text-[#D1A954] font-serif text-xl mb-6 italic tracking-wide">Expert Standards</h3>
                <div className="space-y-4">
                  {[
                    { icon: <UserCheck size={18}/>, title: "Senior Strategists", desc: "Expert analysis of your market position." },
                    { icon: <Award size={18}/>, title: "Precision Roadmap", desc: "Tailored growth and tech strategy." },
                    { icon: <ShieldCheck size={18}/>, title: "Data Security", desc: "Confidential handling of your vision." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-3xl bg-white/[0.01] border border-white/5 hover:border-[#D1A954]/30 transition-all group">
                      <div className="text-[#D1A954] mt-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <div><p className="text-[10px] font-black uppercase tracking-widest mb-1">{item.title}</p><p className="text-[11px] text-gray-500">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CHAT CONTAINER */}
            <div className="lg:col-span-8">
              <div className="h-[700px] bg-black border border-white/10 rounded-[3rem] overflow-hidden flex flex-col relative shadow-2xl">
                
                {/* PROGRESS BAR 1-100 */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5 z-20">
                  <motion.div className="h-full bg-[#D1A954] shadow-[0_0_15px_#D1A954]" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence>
                  {loading.active && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
                      <div className="w-24 h-24 border-2 border-white/5 rounded-full flex items-center justify-center mb-8 relative">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute inset-[-4px] border-t-2 border-[#D1A954] rounded-full" />
                        <span className="text-[#D1A954] font-serif text-2xl font-light">{loading.progress}%</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.5em] text-[#D1A954] animate-pulse font-black">Syncing Strategic Data</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle size={60} className="text-[#D1A954] mb-8"/>
                    <h2 className="text-5xl font-serif mb-6 italic">Data <span className="text-[#D1A954] not-italic">Received.</span></h2>
                    <p className="text-gray-400 mb-10 text-sm">Your audit is being analyzed. You will receive a response within 24h.</p>
                    <button onClick={() => window.location.href = '/'} className="bg-white text-black px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-3 hover:bg-[#D1A954] transition-all">Return Home <ArrowRight size={14}/></button>
                  </motion.div>
                ) : (
                  <>
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#D1A954] flex items-center justify-center text-black"><UserCheck size={28}/></div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em]">Linkoova Intelligence</p>
                          <p className="text-[9px] text-green-500 uppercase tracking-widest font-black flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/> Encryption Active</p>
                        </div>
                      </div>
                      <RefreshCcw size={18} className="text-gray-600 hover:text-white cursor-pointer transition-all hover:rotate-180" onClick={resetAudit} />
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 space-y-8 no-scrollbar scroll-smooth">
                      {messages.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-6 rounded-[2rem] text-[13px] max-w-[85%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold rounded-tr-none' : 'bg-white/[0.03] border border-white/10 rounded-tl-none'}`}>{m.text}</div>
                        </motion.div>
                      ))}
                      {isTyping && <div className="flex gap-2 p-4 opacity-40"><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.2s]"/><span className="w-1.5 h-1.5 bg-[#D1A954] rounded-full animate-bounce [animation-delay:0.4s]"/></div>}
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
                              <input type="text" autoFocus value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="..." className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#D1A954] transition-all" />
                              <button type="submit" className="bg-[#D1A954] text-black px-8 rounded-2xl hover:scale-105 transition-all"><Send size={20}/></button>
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
