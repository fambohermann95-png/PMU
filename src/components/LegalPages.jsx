import React from 'react';
import { ShieldCheck, Lock, FileText, AlertTriangle } from 'lucide-react';
import DEFAULT_CONFIG from '../config';

export function LegalTerms() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/30 space-y-3">
        <h1 className="text-3xl font-black text-[var(--text-main)] font-display">
          Conditions Générales d'Utilisation
        </h1>
        <p className="text-xs text-[var(--text-muted)]">Dernière mise à jour : 2026</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <h2 className="text-base font-bold text-[var(--text-main)]">1. Objet du Service</h2>
        <p>
          TurfElite-PMU (TURF PERFORMANCE PRO) est une plateforme d'information, d'analyses et de pronostics hippiques. Le site ne propose aucun service de pari en ligne, de dépôt d'argent ni de portefeuille virtuel.
        </p>

        <h2 className="text-base font-bold text-[var(--text-main)]">2. Responsabilité & Absence de Garantie</h2>
        <p>
          {DEFAULT_CONFIG.responsibleGamblingNote} Les analyses d'experts et les outils d'intelligence artificielle constituent une aide à la décision et n'engagent en aucun cas la responsabilité de l'éditeur en cas de perte financière.
        </p>

        <h2 className="text-base font-bold text-[var(--text-main)]">3. Accès VIP</h2>
        <p>
          Les codes d'accès VIP sont personnels et délivrés sous la seule responsabilité de l'administrateur.
        </p>
      </div>
    </div>
  );
}

export function PrivacyPolicy() {
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/30 space-y-3">
        <h1 className="text-3xl font-black text-[var(--text-main)] font-display">
          Politique de Confidentialité
        </h1>
        <p className="text-xs text-[var(--text-muted)]">Protection des données personnelles</p>
      </div>

      <div className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
        <h2 className="text-base font-bold text-[var(--text-main)]">1. Collecte des Données</h2>
        <p>
          Les données collectées (nom, email, pays) lors de l'inscription ou des formulaires de contact servent exclusivement à la gestion de votre compte et à l'assistance.
        </p>

        <h2 className="text-base font-bold text-[var(--text-main)]">2. Sécurité des Mots de Passe & Codes</h2>
        <p>
          Tous les mots de passe et codes d'accès VIP sont stockés sous forme de condensat cryptographique sécurisé (SHA-256 avec sel). Aucun secret n'est lisible en clair.
        </p>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="text-center space-y-6 py-16 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto rounded-3xl gold-gradient-bg flex items-center justify-center text-racing-dark font-black text-2xl shadow-gold-glow">
        404
      </div>
      <h1 className="text-3xl font-black text-[var(--text-main)] font-display">Page Introuvable</h1>
      <p className="text-xs text-[var(--text-muted)]">La page que vous recherchez n'existe pas ou a été déplacée.</p>
    </div>
  );
}
