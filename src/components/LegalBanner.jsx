import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function LegalBanner() {
  return (
    <div className="bg-racing-dark border-b border-[var(--border-color)] py-1.5 px-4 text-center text-[11px] font-semibold text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
        <span>Plateforme d'Information & d'Analyse • Aucun pari d'argent réel enregistré • Pronostics à titre indicatif</span>
      </div>
    </div>
  );
}
