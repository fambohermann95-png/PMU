import React from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';
import DEFAULT_CONFIG from '../config';

export default function Footer({ setActiveTab }) {
  const handleNavClick = (tabId) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${DEFAULT_CONFIG.rawWhatsappNumber}?text=${encodeURIComponent(DEFAULT_CONFIG.whatsappMessages.assistance)}`;

  return (
    <footer className="mt-16 border-t border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-muted)] pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-xl font-black font-display gold-gradient-text tracking-wide">TURFELITE-PMU</span>
          </div>
          <p className="text-xs font-semibold text-[var(--text-muted)] italic">
            « {DEFAULT_CONFIG.slogan} »
          </p>
          <p className="text-[11px] text-gold font-bold">
            TURF PERFORMANCE PRO
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[var(--text-main)] font-bold text-xs uppercase tracking-wider mb-3">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => handleNavClick('home')} className="hover:text-gold transition-colors">Accueil</button></li>
            <li><button onClick={() => handleNavClick('pronostics')} className="hover:text-gold transition-colors">Pronostics</button></li>
            <li><button onClick={() => handleNavClick('pronostics')} className="hover:text-gold transition-colors">Abonnements VIP</button></li>
            <li><button onClick={() => handleNavClick('results')} className="hover:text-gold transition-colors">Résultats</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="hover:text-gold transition-colors">Contact</button></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-[var(--text-main)] font-bold text-xs uppercase tracking-wider mb-3">Informations</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => handleNavClick('faq')} className="hover:text-gold transition-colors">FAQ</button></li>
            <li><button onClick={() => handleNavClick('terms')} className="hover:text-gold transition-colors">Conditions Générales</button></li>
            <li><button onClick={() => handleNavClick('privacy')} className="hover:text-gold transition-colors">Confidentialité</button></li>
            <li><button onClick={() => handleNavClick('media')} className="hover:text-gold transition-colors">Replays & Analyses Vidéo</button></li>
          </ul>
        </div>

        {/* Social Links & WhatsApp */}
        <div className="space-y-3">
          <h4 className="text-[var(--text-main)] font-bold text-xs uppercase tracking-wider">Réseaux & Contact</h4>
          <div className="flex flex-col gap-2 text-xs">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-bold hover:underline flex items-center gap-1.5"
            >
              <span>WhatsApp Support (+22646553556)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href={DEFAULT_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Facebook (TURF PERFORMANCE PRO)
            </a>
            <a href={DEFAULT_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
              Instagram (@turfelite)
            </a>
          </div>
        </div>

      </div>

      {/* Responsible gambling short note */}
      <div className="border-t border-[var(--border-color)] py-3 px-4 text-center">
        <p className="text-[11px] text-[var(--text-muted)] italic max-w-3xl mx-auto">
          {DEFAULT_CONFIG.responsibleGamblingNote}
        </p>
      </div>

      {/* Exact Copyright Footer Line */}
      <div className="border-t border-[var(--border-color)] py-4 px-4 text-center">
        <p className="text-xs font-bold text-[var(--text-main)]">
          {DEFAULT_CONFIG.footerCopyright}
        </p>
      </div>
    </footer>
  );
}
