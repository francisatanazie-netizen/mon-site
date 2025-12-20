import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, UserCheck, CheckCircle, RefreshCcw, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CHAT_FLOW_BILINGUAL, Language } from '../constants/chatData';

// INITIALISATION AVEC TA CLÉ PUBLIQUE
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

    // Préparation des paramètres pour ton Template EmailJS
    const templateParams = {
      company_name: userAnswers[0] || "Client",
      user_email: userAnswers[userAnswers.length - 1] || "Non spécifié",
      budget: userAnswers[13] || "TBD",
      vision_goal: userAnswers[2] || "N/A",
      // Ces noms doivent être les mêmes que dans ton template EmailJS {{...}}
    };

    // UTILISATION DE TON SERVICE_ID ET TEMPLATE_ID
    emailjs.send('service_94yaj7r', 'template_c1xbsvk', templateParams)
      .then((res) => {
        console.log("✅ RAPPORT ENVOYÉ !", res.status);
      })
      .catch((err) => {
        console.error("❌ ERREUR CRITIQUE EMAILJS :", err);
      });
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
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-28 pb-20 relative text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-serif italic mb-12">The <span className="text-[#D1A954] not-italic">Audit.</span></h1>
          
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10">
                <p className="text-[#D1A954] font-black uppercase text-[10px] tracking-widest mb-4">Security Protocol</p>
                <p className="text-gray-400 text-xs leading-relaxed">Your data is encrypted and sent directly to our strategic team.</p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="h-[600px] bg-black border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                  <motion.div className="h-full bg-[#D1A954]" animate={{ width: `${progress}%` }} />
                </div>

                <AnimatePresence>
                  {loading.active && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-12 h-12 border-t-2 border-[#D1A954] rounded-full mb-4" />
                      <p className="text-[10px] text-[#D1A954] tracking-widest font-black uppercase">Transmitting Data...</p>
                    </div>
                  )}
                </AnimatePresence>

                {success ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                    <CheckCircle size={60} className="text-[#D1A954] mb-6"/>
                    <h2 className="text-4xl font-serif mb-4">Audit Complete.</h2>
                    <p className="text-gray-400 text-sm mb-8">We will contact you shortly.</p>
                    <button onClick={() => window.location.href = '/'} className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase">Close</button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                      {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-5 rounded-2xl text-xs max-w-[80%] ${m.sender === 'user' ? 'bg-[#D1A954] text-black font-bold' : 'bg-white/5 border border-white/10'}`}>
                            {m.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="p-6 border-t border-white/5">
                      {!lang ? (
                        <div className="grid grid-cols-2 gap-4">
                          <button onClick={() => handleLanguage('EN')} className="py-4 border border-white/10 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-white hover:text-black">English</button>
                          <button onClick={() => handleLanguage('FR')} className="py-4 border border-white/10 rounded-xl text-[10px] uppercase font-black tracking-widest hover:bg-white hover:text-black">Français</button>
                        </div>
                      ) : (
                        <form onSubmit={onInput} className="flex gap-4">
                          {CHAT_FLOW_BILINGUAL[lang][currentStep]?.options ? (
                            <div className="flex flex-wrap gap-2">
                              {CHAT_FLOW_BILINGUAL[lang][currentStep].options.map((o: any) => (
                                <button key={o.value} type="button" onClick={() => onOption(o)} className="px-4 py-2 border border-white/10 rounded-full text-[10px] uppercase font-black hover:border-[#D1A954]">
                                  {o.label}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <>
                              <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D1A954]" placeholder="..." />
                              <button type="submit" className="bg-[#D1A954] text-black p-3 rounded-xl"><Send size={18}/></button>
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
      </div>
    </div>
  );
};

export default Quote;
