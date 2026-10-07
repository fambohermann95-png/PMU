import React from 'react';
import { HelpCircle, ShieldCheck, Lock, Award, HeartHandshake } from 'lucide-react';

export default function FAQ() {
  const faqItems = [
    {
      q: "Comment obtenir mon code d'accès VIP ?",
      a: "Vous remplissez le formulaire de demande ou cliquez sur le bouton WhatsApp (+22646553556). L'administrateur vous communique votre code confidentiel après validation."
    },
    {
      q: "Combien de temps est valable mon code VIP ?",
      a: "Selon la formule souscrite : Hebdomadaire (7 jours), Mensuel (30 jours) ou Annuel (365 jours)."
    },
    {
      q: "Puis-je partager mon code d'accès avec un ami ?",
      a: "Les codes à usage unique sont associés strictement à votre compte utilisateur lors de la validation."
    },
    {
      q: "Quelles sont les disciplines couvertes par TurfElite-PMU ?",
      a: "Nous couvrons le Trot Attelé, le Trot Monté, le Galop Plat et l'Obstacle pour l'ensemble des réunions Quinté+, Quarté, PMU et Trio."
    },
    {
      q: "Les pronostics sont-ils garantis ?",
      a: "Aucun pronostic hippique ne peut garantir un gain. Nos sélections sont des analyses de haute précision combinant expertise humaine et algorithmes d'IA. Jouez de manière responsable."
    }
  ];

  return (
    <div className="space-y-8 pb-12 max-w-4xl mx-auto">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/30 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold border border-gold/30">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span>CENTRE D'ASSISTANCE</span>
        </div>
        <h1 className="text-3xl font-black text-[var(--text-main)] font-display">
          Foire Aux Questions (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Retrouvez toutes les réponses concernant l'accès VIP et le fonctionnement de TurfElite-PMU.
        </p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] space-y-2">
            <h3 className="font-bold text-base text-[var(--text-main)] flex items-center gap-2">
              <span className="text-gold font-black">Q.</span> {item.q}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pl-5 border-l-2 border-gold/40">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
