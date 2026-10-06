import React from 'react';
import { Sparkles, ShieldCheck, PhoneCall, HelpCircle, AlertOctagon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer({ setActiveTab }) {
  const { settings } = useApp();

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-racing-border bg-racing-dark text-slate-400">

      {/* Top Value Banner */}
      <div className="border-b border-racing-border bg-racing-card/60 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 bg-racing-dark/60 p-4 rounded-2xl border border-racing-border">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center text-racing-dark font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">100% Information & Analyse</h4>
              <p className="text-xs text-slate-400">Aucun pari d'argent réel enregistré sur la plateforme.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-racing-dark/60 p-4 rounded-2xl border border-racing-border">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Pronostics Quinté+ Quotidiens</h4>
              <p className="text-xs text-slate-400">Rédigés par nos analystes hippiques chevronnés.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-racing-dark/60 p-4 rounded-2xl border border-racing-border">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold border border-gold/30 flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Support Client WhatsApp 7j/7</h4>
              <p className="text-xs text-slate-400">Assistance directe pour vos questions et accès abonnés.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold font-display gold-gradient-text">TURFELITE</span>
            <span className="text-[10px] font-bold bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded">PRO</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Le portail d'excellence dédié aux passionnés de courses hippiques (PMU). Analyses synthétiques, visualisations de tickets, suivi des résultats officiels et actualités hippiques en temps réel.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-display gold-gradient-text">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => handleNavClick('home')} className="hover:text-gold transition-colors">Accueil & Compte à Rebours</button></li>
            <li><button onClick={() => handleNavClick('pronostics')} className="hover:text-gold transition-colors">Tous les Pronostics & Tickets</button></li>
            <li><button onClick={() => handleNavClick('results')} className="hover:text-gold transition-colors">Résultats Officiels & Arrivées</button></li>
            <li><button onClick={() => handleNavClick('news')} className="hover:text-gold transition-colors">Actualités & Analyses Détaillées</button></li>
            <li><button onClick={() => handleNavClick('media')} className="hover:text-gold transition-colors">Médiathèque & Vidéos Replays</button></li>
          </ul>
        </div>

        {/* Support & Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider font-display gold-gradient-text">Aide & Assistance</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => handleNavClick('faq')} className="hover:text-gold transition-colors flex items-center gap-1.5"><HelpCircle className="w-3.5 h-3.5 text-gold" /> FAQ & Assistance</button></li>
            <li><a href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(settings.whatsappMessage)}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1.5 font-semibold">Contact WhatsApp Direct</a></li>
            <li><span className="text-slate-500">Horaires : 08h00 - 20h00 7j/7</span></li>
          </ul>
        </div>

        {/* Legal Risk Notice Column */}
        <div className="bg-racing-card p-4 rounded-xl border border-gold/20 space-y-2">
          <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase">
            <AlertOctagon className="w-4 h-4 text-gold" />
            <span>Avertissement Légal</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-normal">
            {settings.responsibleGamblingText}
          </p>
        </div>

      </div>

      {/* Copyright Line */}
      <div className="border-t border-racing-border py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} TurfElite Media Inc. Tous droits réservés.</p>
          <p className="text-[11px] text-slate-500">Plateforme indépendante d'analyses hippiques. Non affiliée à PMU SA.</p>
        </div>
      </div>

    </footer>
  );
}
