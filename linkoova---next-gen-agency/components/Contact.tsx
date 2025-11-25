import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert("Thank you. Linkoova team will contact you shortly.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
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
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-[#D1A954] uppercase tracking-wider">Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-[#D1A954] uppercase tracking-wider">Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                  placeholder="john@company.com"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#D1A954] uppercase tracking-wider">Company</label>
              <input 
                type="text" 
                name="company"
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Company Name"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#D1A954] uppercase tracking-wider">Project Budget</label>
              <select 
                name="budget"
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors appearance-none"
                onChange={handleChange}
              >
                <option value="" className="bg-[#0B0B0C]">Select a range</option>
                <option value="10k-50k" className="bg-[#0B0B0C]">$10k - $50k</option>
                <option value="50k-100k" className="bg-[#0B0B0C]">$50k - $100k</option>
                <option value="100k+" className="bg-[#0B0B0C]">$100k+</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-[#D1A954] uppercase tracking-wider">Message</label>
              <textarea 
                name="message"
                rows={4}
                required
                className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-[#D1A954] transition-colors"
                placeholder="Tell us about your goals..."
                onChange={handleChange}
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