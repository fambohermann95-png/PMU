import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export default function FAQ() {
  const { settings } = useApp();

  const [openIndex, setOpenIndex] = useState(0); // Accordion state
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Pronostics & Infos',
    message: ''
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactForm({ name: '', email: '', subject: 'Pronostics & Infos', message: '' });
    }, 5000);
  };

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="space-y-12 pb-12">

      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 shadow-2xl space-y-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-gold" />
            <span>Assistance Client & FAQ Interactive</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Retrouvez les réponses aux questions les plus fréquentes ou contactez notre équipe support.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: FAQ Accordion */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <span>Foire Aux Questions</span>
          </h2>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl border border-racing-border overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm hover:text-gold transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-gold flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-racing-border/50 pt-3 animate-in fade-in">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Contact Form & WhatsApp Card */}
        <div className="lg:col-span-5 space-y-6">

          {/* WhatsApp Direct Highlight Box */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 shadow-emerald-glow space-y-4 bg-gradient-to-br from-racing-card via-racing-dark to-emerald-950/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-lg">
                <MessageSquare className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">Assistance WhatsApp 7j/7</span>
                <h3 className="font-bold text-white text-base">Réponse en moins de 5 min</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Besoin d'un renseignement immédiat sur un tuyau de course ou sur la prise en main de la plateforme ? Écrivez-nous directement sur WhatsApp.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Contacter sur WhatsApp ({settings.whatsappNumber})</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="glass-panel p-6 rounded-3xl border border-gold/30 space-y-4">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" />
              <span>Formulaire de Contact Direct</span>
            </h3>

            {formSent ? (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>Votre message a bien été transmis à notre équipe support. Merci !</span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nom complet</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Adresse Email</label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.fr"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Décrivez votre demande..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer le Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
