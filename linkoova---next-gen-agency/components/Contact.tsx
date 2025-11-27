import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  // 1. Réactivation de l'état local du formulaire
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  // 2. Gestion de l'état de soumission pour feedback utilisateur
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    // Création des données encodées, OBLIGATOIRE pour Netlify via fetch
    const encoded = new URLSearchParams();
    
    // Ajout du champ caché requis par Netlify
    encoded.append('form-name', 'contact-form');
    
    // Ajout des données du formulaire
    Object.entries(formState).forEach(([key, value]) => {
      // Assurez-vous que la valeur n'est pas nulle pour l'encodage
      if (value !== null) {
        encoded.append(key, value as string);
      }
    });

    try {
        // Envoi des données au chemin racine. 
        // NOTE: Certains frameworks nécessitent window.location.pathname au lieu de "/", 
        // mais nous laissons "/" pour la compatibilité maximale Netlify.
        const response = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encoded.toString()
        });

        if (response.ok) {
            setStatus('success');
            setMessage("Merci ! Votre message a été envoyé avec succès. Nous vous contacterons bientôt.");
            // Efface le formulaire après succès
            setFormState({ name: '', email: '', company: '', budget: '', message: '' }); 
        } else {
            setStatus('error');
            // Affichage de l'erreur brute si possible pour le débogage, sinon message générique
            const errorText = await response.text();
            console.error('Netlify Form Error Details:', errorText);
            // Si le code est 404, le formulaire n'est pas détecté. 
            // Nous affichons un message plus précis pour cette erreur.
            let displayMessage = "Une erreur s'est produite lors de l'envoi. Veuillez réessayer. (Code: " + response.status + ")";
            if (response.status === 404) {
                displayMessage = "Erreur 404: Le formulaire n'a pas été détecté par Netlify. Veuillez vérifier que votre site a été entièrement redéployé APRÈS l'ajout du formulaire caché.";
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
    // L'ID 'contact' est essentiel pour la navigation par ancre de la Navbar
    <section id="contact" className="py-24 bg-[#0B0B0C] border-t border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          
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

          <motion.form 
            // 3. Réactivation de la fonction de soumission
            onSubmit={handleSubmit}
            // ATTRIBUTS CRUCIAUX POUR NETLIFY (toujours nécessaires)
            name="contact-form" 
            method="POST" 
            data-netlify="true"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* CHAMPS CACHÉS OBLIGATOIRES POUR NETLIFY */}
            {/* Ce champ est crucial pour le fetch asynchrone */}
            <input type="hidden" name="form-name" value="contact-form" />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs text-[#D1A954] uppercase tracking-wider">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name"
                  required
                  value={formState.name} // Liaison à l'état React
                  onChange={handleChange} // Gestion du changement
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs text-[#D1A954] uppercase tracking-wider">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  required
                  value={formState.email} // Liaison à l'état React
                  onChange={handleChange} // Gestion du changement
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-xs text-[#D1A954] uppercase tracking-wider">Company</label>
              <input 
                id="company"
                type="text" 
                name="company"
                value={formState.company} // Liaison à l'état React
                onChange={handleChange} // Gestion du changement
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Company Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-xs text-[#D1A954] uppercase tracking-wider">Project Budget</label>
              <select 
                id="budget"
                name="budget"
                value={formState.budget} // Liaison à l'état React
                onChange={handleChange} // Gestion du changement
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors appearance-none"
              >
                <option value="" className="bg-[#0B0B0C]">Select a range</option>
                <option value="10k-50k" className="bg-[#0B0B0C]">$10k - $50k</option>
                <option value="50k-100k" className="bg-[#0B0B0C]">$50k - $100k</option>
                <option value="100k+" className="bg-[#0B0B0C]">$100k+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs text-[#D1A954] uppercase tracking-wider">Message</label>
              <textarea 
                id="message"
                name="message"
                rows={4}
                required
                value={formState.message} // Liaison à l'état React
                onChange={handleChange} // Gestion du changement
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Tell us about your goals..."
              />
            </div>
            
            {/* 4. Affichage du statut (succès/erreur) */}
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
              disabled={status === 'submitting'} // Désactive le bouton pendant l'envoi
              className="w-full bg-[#D1A954] text-[#0B0B0C] font-semibold py-4 uppercase tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Sending...' : 'Launch Transformation'}
            </button>
          </motion.form>

          {/* Ajout du FORMULAIRE CACHÉ pour la détection statique par Netlify.
            Ceci corrige l'erreur 400/500 lorsque le site est déployé.
            Il doit contenir les mêmes attributs 'name' et le 'form-name'.
          */}
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

        </div>
      </div>
    </section>
  );
};

export default Contact;
