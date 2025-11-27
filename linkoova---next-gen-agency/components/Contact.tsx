import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Définition des types pour une meilleure gestion d'état (TypeScript)
interface FormState {
  name: string;
  email: string;
  company: string;
  budget: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    // --- PRÉPARATION DES DONNÉES ---
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Netlify requiert l'encodage URL pour le Content-Type: application/x-www-form-urlencoded
    const encodedData = new URLSearchParams(formData as any).toString();

    try {
        const response = await fetch("/", {
            method: "POST",
            // Définition du Content-Type requis pour Netlify Forms (données non-fichiers)
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encodedData // Utilisation des données encodées
        });

        if (response.ok) {
            setStatus('success');
            setMessage("Merci ! Votre message a été envoyé avec succès.");
            // Réinitialisation du formulaire
            setFormState({ name: '', email: '', company: '', budget: '', message: '' }); 
        } else {
            setStatus('error');
            // Gérer les erreurs spécifiques de Netlify
            const errorText = await response.text();
            console.error('Netlify Form Error Details:', errorText);

            let displayMessage = "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.";
            if (response.status === 404) {
                 displayMessage = "Erreur 404: La détection du formulaire par Netlify a échoué. **Vérifiez l'Étape 2 ci-dessous.**";
            }
            setMessage(displayMessage);
        }
    } catch (error) {
        console.error('Submission error:', error);
        setStatus('error');
        setMessage("Erreur de connexion. Veuillez vérifier votre réseau.");
    }
  };


  return (
    <section id="contact" className="py-24 bg-[#0B0B0C] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Section d'information à gauche */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Let's build the <br /> extraordinary.</h2>
            <p className="text-gray-400 mb-8 font-light">
              Ready to accelerate your digital transformation? Tell us about your project, and our strategists will provide a preliminary roadmap.
            </p>
            <div className="space-y-4 text-gray-500 text-sm">
                <p>New Business: <span className="text-white">hello@linkoova.com</span></p>
                <p>Careers: <span className="text-white">talent@linkoova.com</span></p>
            </div>
          </div>

          {/* FORMULAIRE REACT/JSX (Soumission Asynchrone) */}
          <motion.form 
            onSubmit={handleSubmit}
            // ATTRIBUTS CRUCIAUX POUR NETLIFY
            name="contact-form" 
            method="POST" 
            data-netlify="true"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* 🛑 CHAMP CACHÉ ESSENTIEL pour la soumission AJAX */}
            <input type="hidden" name="form-name" value="contact-form" />
            
            <div className="grid grid-cols-2 gap-6">
              {/* Champ Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs text-[#D1A954] uppercase tracking-wider">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" // 🛑 NAME doit correspondre au formulaire caché
                  required
                  value={formState.name} 
                  onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              {/* Champ Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs text-[#D1A954] uppercase tracking-wider">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" // 🛑 NAME doit correspondre au formulaire caché
                  required
                  value={formState.email} 
                  onChange={handleChange} 
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            {/* Champ Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="text-xs text-[#D1A954] uppercase tracking-wider">Company</label>
              <input 
                id="company"
                type="text" 
                name="company" // 🛑 NAME doit correspondre au formulaire caché
                value={formState.company} 
                onChange={handleChange} 
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Company Name"
              />
            </div>

            {/* Champ Budget (Select) */}
            <div className="space-y-2">
              <label htmlFor="budget" className="text-xs text-[#D1A954] uppercase tracking-wider">Project Budget</label>
              <select 
                id="budget"
                name="budget" // 🛑 NAME doit correspondre au formulaire caché
                value={formState.budget} 
                onChange={handleChange} 
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors appearance-none"
              >
                <option value="" className="bg-[#0B0B0C]">Select a range</option>
                <option value="10k-50k" className="bg-[#0B0B0C]">$10k - $50k</option>
                <option value="50k-100k" className="bg-[#0B0B0C]">$50k - $100k</option>
                <option value="100k+" className="bg-[#0B0B0C]">$100k+</option>
              </select>
            </div>

            {/* Champ Message (Textarea) */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs text-[#D1A954] uppercase tracking-wider">Message</label>
              <textarea 
                id="message"
                name="message" // 🛑 NAME doit correspondre au formulaire caché
                rows={4}
                required
                value={formState.message} 
                onChange={handleChange} 
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Tell us about your goals..."
              />
            </div>
            
            {/* Affichage du statut (succès/erreur) */}
            {message && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 text-sm rounded ${status === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                >
                    {message}
                </motion.div>
            )}

            <button 
              type="submit"
              disabled={status === 'submitting'} 
              className="w-full bg-[#D1A954] text-[#0B0B0C] font-semibold py-4 uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Launch Transformation'}
            </button>
          </motion.form>

        </div>
      </div>

      {/* 🛑 VOUS AVEZ DÉJÀ INCLUS LE FORMULAIRE CACHÉ ICI, C'EST BIEN. */}
      {/* C'est la solution la plus courante pour les sites React/Gatsby/Next.js. */}
      {/* Assurez-vous simplement que le nom 'contact-form' est unique. */}
      <form name="contact-form" netlify hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="text" name="company" />
          <select name="budget">
            <option value=""></option>
            <option value="10k-50k"></option>
            <option value="50k-100k"></option>
            <option value="100k+"></option>
          </select>
          <textarea name="message"></textarea>
      </form>

    </section>
  );
};

export default Contact;
