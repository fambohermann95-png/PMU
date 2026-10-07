import React, { useState } from 'react';
import { X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { DEFAULT_CONFIG } from '../config';

export default function VipPromoModal({ isOpen, onClose, user }) {
  const [nom, setNom] = useState(user?.nom || '');
  const [pays, setPays] = useState(user?.pays || 'Bénin');
  const [plan, setPlan] = useState('monthly');
  const [phone, setPhone] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save request locally
    const existingRequests = JSON.parse(localStorage.getItem('turfelite_vip_requests') || '[]');
    const newRequest = {
      id: `req-${Date.now()}`,
      user_id: user?.id || null,
      name: nom,
      country: pays,
      plan,
      phone,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('turfelite_vip_requests', JSON.stringify([newRequest, ...existingRequests]));

    // Format prefilled WhatsApp message
    const planLabel = DEFAULT_CONFIG.pricing[plan]?.name || plan;
    const rawText = DEFAULT_CONFIG.whatsappMessages.subscription(planLabel, nom, pays);
    const whatsappUrl = `https://wa.me/${DEFAULT_CONFIG.rawWhatsappNumber}?text=${encodeURIComponent(rawText)}`;

    // Open WhatsApp in new tab and close modal
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[var(--bg-card)] border-2 border-gold rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-main)] p-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold border border-gold/40">
            <Sparkles className="w-4 h-4" />
            <span>ACCÈS VIP EXCLUSIF</span>
          </div>
          <h3 className="text-2xl font-black text-[var(--text-main)] font-display">
            Déverrouillez TOUS les Pronostics VIP
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            Obtenez votre code d'accès confidentiel directement auprès de l'administrateur.
          </p>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Nom Complet</label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Votre nom"
              className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Pays</label>
              <select
                value={pays}
                onChange={(e) => setPays(e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
              >
                <option value="Bénin">🇧🇯 Bénin</option>
                <option value="Burkina Faso">🇧🇫 Burkina Faso</option>
                <option value="Cameroun">🇨🇲 Cameroun</option>
                <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                <option value="France">🇫🇷 France</option>
                <option value="Gabon">🇬🇦 Gabon</option>
                <option value="Sénégal">🇸🇳 Sénégal</option>
                <option value="Togo">🇹🇬 Togo</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Formule choisie</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
              >
                <option value="weekly">Hebdomadaire (25 000 FCFA)</option>
                <option value="monthly">Mensuel (95 000 FCFA)</option>
                <option value="yearly">Annuel (250 000 FCFA / AN)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Téléphone (facultatif)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+226..."
              className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
            />
          </div>

          <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-[11px] text-gold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 flex-shrink-0 text-gold" />
            <span>Paiement sécurisé directement avec l'administrateur. Code délivré instantanément.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Envoyer la demande sur WhatsApp</span>
          </button>
        </form>

      </div>
    </div>
  );
}
