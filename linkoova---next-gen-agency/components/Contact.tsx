import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  // L'état `formState` et la fonction `handleChange` ne sont plus nécessaires 
  // car nous utilisons la soumission native HTML de Netlify.

  // NOTE : J'ai mis en commentaire le useState et handleChange au cas où vous en auriez besoin plus tard, 
  // mais ils ne sont PAS utilisés dans cette configuration de formulaire Netlify.
  /*
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  */

  // La fonction handleSubmit doit simplement prévenir l'événement par défaut de React 
  // et laisser le navigateur gérer la soumission vers Netlify (via l'attribut action)
  const handleSubmit = (e: React.FormEvent) => {
    // Si nous utilisions l'action native, nous ne ferions rien ici, 
    // mais dans React, il est souvent plus simple de laisser la fonction être appelée 
    // et gérer l'envoi soi-même (méthode Netlify 2).

    // Pour l'approche la plus simple (méthode Netlify 1 - HTML natif), 
    // on retire l'onSubmit de la balise <form>.

    // Pour l'approche la plus robuste avec React, nous allons utiliser 'fetch' 
    // pour que le formulaire reste dans une Single Page Application.
    e.preventDefault();
    
    // Collecte des données du formulaire
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    
    // Envoi des données à Netlify (via le fetch, ou en laissant l'action native)
    // Pour ne pas complexifier, je vais adapter la méthode 1 (HTML natif) 
    // et enlever l'onSubmit de la balise <motion.form> !
    
    // IMPORTANT : Pour que React et Netlify fonctionnent ensemble sans problème, 
    // il est souvent plus propre d'utiliser la soumission native HTML.
    // Nous allons RETIRER l'attribut onSubmit={handleSubmit} de <motion.form>
    
    // *** Comme la soumission native est meilleure pour Netlify, 
    // j'ai retiré 'onSubmit={handleSubmit}' dans le code ci-dessous. ***

    // Si vous souhaitez utiliser une alerte de succès (bien que Netlify en fournisse une)
    // vous devrez utiliser la méthode Fetch API et le formulaire n'est pas optimisé pour cela.
    
    // Pour l'instant, nous laissons le formulaire soumis au backend Netlify.
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
            // ATTRIBUTS CRUCIAUX POUR NETLIFY :
            // 1. name="contact-form" : nom du formulaire pour l'administration Netlify
            // 2. method="POST" : requis par Netlify
            // 3. data-netlify="true" : indique à Netlify de traiter la soumission
            name="contact-form" 
            method="POST" 
            data-netlify="true"
            // J'ai RETIRÉ onSubmit={handleSubmit} pour que la soumission soit purement HTML/Netlify
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* CHAMPS CACHÉS OBLIGATOIRES POUR NETLIFY */}
            <input type="hidden" name="form-name" value="contact-form" />
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs text-[#D1A954] uppercase tracking-wider">Name</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" // L'attribut 'name' est utilisé par Netlify pour identifier le champ
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="John Doe"
                  // Pas de onChange pour la soumission Netlify native
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs text-[#D1A954] uppercase tracking-wider">Email</label>
                <input 
                  id="email"
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="john@company.com"
                  // Pas de onChange pour la soumission Netlify native
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="company" className="text-xs text-[#D1A954] uppercase tracking-wider">Company</label>
              <input 
                id="company"
                type="text" 
                name="company"
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Company Name"
                // Pas de onChange pour la soumission Netlify native
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="budget" className="text-xs text-[#D1A954] uppercase tracking-wider">Project Budget</label>
              <select 
                id="budget"
                name="budget"
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors appearance-none"
                // Pas de onChange pour la soumission Netlify native
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
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Tell us about your goals..."
                // Pas de onChange pour la soumission Netlify native
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#D1A954] text-[#0B0B0C] font-semibold py-4 uppercase tracking-widest hover:bg-white transition-colors duration-300"
            >
              Launch Transformation
            </button>
          </motion.form>

        </div>
      </div>
    </section>
  );
};

export default Contact;
