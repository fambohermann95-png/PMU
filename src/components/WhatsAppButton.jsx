import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WhatsAppButton() {
  const { settings } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(settings.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Interactive Tooltip Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-racing-card border border-emerald-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-2 border-b border-racing-border">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Assistance TurfElite</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="my-3 text-xs text-slate-300">
            <p className="font-semibold text-emerald-400 mb-1">🟢 En ligne - Réponse en 5 min</p>
            <p>Une question sur un pronostic, le Quinté+ ou les offres abonnés ? Écrivez-nous directement sur WhatsApp !</p>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Ouvrir WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3.5 rounded-full shadow-emerald-glow transition-all duration-300 hover:scale-105"
        title="Contacter le support WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline text-xs font-extrabold pr-1">Support Live</span>

        {/* Status indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-racing-dark"></span>
        </span>
      </button>

    </div>
  );
}
