import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LegalBanner() {
  const { settings } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-950 via-racing-dark to-amber-950 border-b border-gold/30 text-gold-light py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-medium">
          <AlertTriangle className="w-4 h-4 text-gold flex-shrink-0 animate-pulse" />
          <span>
            <strong className="text-white uppercase tracking-wider">Jeu Responsable :</strong> {settings.responsibleGamblingText}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-emerald-400 text-[11px] font-semibold whitespace-nowrap bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Plateforme 100% Informative</span>
        </div>
      </div>
    </div>
  );
}
