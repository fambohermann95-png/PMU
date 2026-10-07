import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Clock,
  Ban,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Send,
  Star,
  Trophy,
  Flame,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DEFAULT_CONFIG from '../config';
import VipPromoModal from './VipPromoModal';

export default function Predictions({ selectedRaceId, setSelectedRaceId }) {
  const { user, setAuthModalOpen, setAuthMode, races } = useApp();
  const [inputCode, setInputCode] = useState('');
  const [codeStatus, setCodeStatus] = useState(null); // { type: 'success'|'invalid'|'expired'|'disabled'|'used'|'rate_limit', message: '' }
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [vipUnlocked, setVipUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto my-12 glass-panel rounded-3xl p-8 text-center space-y-6 border border-gold/40 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl gold-gradient-bg text-racing-dark flex items-center justify-center font-black shadow-gold-glow">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-[var(--text-main)] font-display">
          Connexion Requise pour la Rubrique Pronostics
        </h2>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Veuillez vous connecter ou créer un compte membre gratuit pour accéder aux favoris indicatifs et déverrouiller votre espace VIP.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] font-bold text-xs"
          >
            Se Connecter
          </button>
          <button
            onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl gold-gradient-bg text-racing-dark font-black text-xs shadow-gold-glow"
          >
            S'inscrire Gratuitement
          </button>
        </div>
      </div>
    );
  }

  // Handle access code verification (simulating server RPC response rules)
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    if (attempts >= 5) {
      setCodeStatus({
        type: 'rate_limit',
        message: '⚠️ Trop de tentatives. Veuillez reessayer dans 15 minutes.'
      });
      return;
    }

    const clean = inputCode.trim().toUpperCase();

    // Check saved generated access codes from local storage or mock
    const savedCodes = JSON.parse(localStorage.getItem('turfelite_access_codes') || '[]');
    const matchedCode = savedCodes.find(c => c.code === clean);

    if (clean === 'VIP2026' || clean === 'TURF2026' || (matchedCode && matchedCode.active)) {
      if (matchedCode && matchedCode.used_count > 0 && matchedCode.usage === 'single') {
        setCodeStatus({
          type: 'used',
          message: '🔁 Code déjà utilisé. Ce code à usage unique a déjà été validé.'
        });
        setAttempts(prev => prev + 1);
        return;
      }

      // Success unlock!
      setVipUnlocked(true);
      setCodeStatus({
        type: 'success',
        message: '✅ ACCÈS AUTORISÉ ! Votre espace VIP est maintenant déverrouillé.'
      });

      if (matchedCode) {
        matchedCode.used_count += 1;
        localStorage.setItem('turfelite_access_codes', JSON.stringify(savedCodes));
      }
    } else if (clean.includes('EXPIRE')) {
      setCodeStatus({ type: 'expired', message: '⏳ Code expiré. Veuillez obtenir un nouveau code.' });
      setAttempts(prev => prev + 1);
    } else if (clean.includes('DESACTIVE')) {
      setCodeStatus({ type: 'disabled', message: '🚫 Code désactivé par l\'administrateur.' });
      setAttempts(prev => prev + 1);
    } else {
      setCodeStatus({ type: 'invalid', message: '❌ Code d\'accès VIP incorrect. Vérifiez la saisie.' });
      setAttempts(prev => prev + 1);
    }
  };

  // Locked Member View
  if (!vipUnlocked) {
    return (
      <div className="space-y-10 pb-16">

        {/* Gold & Black Premium Header */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold/40 shadow-2xl bg-gradient-to-r from-racing-dark via-[#1a1505] to-racing-dark space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 text-gold text-xs font-bold border border-gold/40">
            <Sparkles className="w-4 h-4 text-gold animate-spin" />
            <span>ESPACE ABONNÉS & ACCÈS VIP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-display">
            Abonnements VIP TURFELITE-PMU
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Pour déverrouiller tous les pronostics complétés, combinaisons d'experts, tuyaux du jour et synthèses exclusives, saisissez votre code confidentiel ou effectuez votre demande.
          </p>
        </div>

        {/* Formules d'abonnement VIP */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[var(--text-main)] font-display">
              Formules d'Abonnement VIP
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Choisissez votre plan et envoyez votre demande sur WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(DEFAULT_CONFIG.pricing).map((plan) => (
              <div
                key={plan.id}
                className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between space-y-6 relative ${
                  plan.popular ? 'border-2 border-gold shadow-gold-glow scale-105' : 'border-[var(--border-color)]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-racing-dark font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[var(--text-main)]">{plan.name}</h3>
                  <div className="text-3xl font-black text-gold">
                    {plan.formattedPrice}
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">Valide {plan.period}</p>

                  <ul className="space-y-2 text-xs text-[var(--text-main)] pt-2 border-t border-[var(--border-color)]">
                    <li>• Pronostics VIP quotidiens</li>
                    <li>• Tiercé, Quarté, Quinté+, Trio, Multi</li>
                    <li>• Analyses détaillées & statistiques</li>
                    <li>• Support prioritaire WhatsApp</li>
                  </ul>
                </div>

                <button
                  onClick={() => setVipModalOpen(true)}
                  className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider ${
                    plan.popular ? 'gold-gradient-bg text-racing-dark shadow-gold-glow' : 'bg-[var(--bg-primary)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-gold'
                  }`}
                >
                  DEVENIR VIP
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Code Entry Block */}
        <section className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold/50 shadow-2xl bg-gradient-to-b from-[var(--bg-card)] to-racing-dark space-y-6 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl gold-gradient-bg text-racing-dark flex items-center justify-center font-bold shadow-gold-glow">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white font-display">
              Entrer un Code d'Accès VIP
            </h3>
            <p className="text-xs text-slate-300">
              Saisissez votre code confidentiel unique transmis par l'administrateur pour déverrouiller tous les pronostics.
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Entrez votre code VIP ici..."
                className="w-full bg-racing-dark border-2 border-gold/40 text-center font-mono font-bold text-lg text-gold placeholder-slate-500 rounded-2xl px-4 py-3.5 focus:outline-none focus:border-gold uppercase transition-colors"
              />
            </div>

            {codeStatus && (
              <div className={`p-3.5 rounded-xl text-xs font-bold text-center border ${
                codeStatus.type === 'success' ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400' : 'bg-red-950/80 border-red-500/40 text-red-300'
              }`}>
                {codeStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl gold-gradient-bg text-racing-dark font-black text-sm uppercase tracking-wider shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-5 h-5" />
              <span>Valider et Déverrouiller</span>
            </button>
          </form>
        </section>

        {/* Single Sample Analysis Preview marked 'Exemple' */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
              Aperçu Démonstration Gratuit
            </span>
            <span className="text-[10px] font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700">
              Exemple
            </span>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold/30 space-y-6">
            <div className="border-b border-[var(--border-color)] pb-4 space-y-1">
              <span className="text-xs font-bold text-gold">Analyse par : Équipe Galop • R3C2 • Longchamp</span>
              <h3 className="text-xl font-bold text-[var(--text-main)]">Prix Ganay – Qatar</h3>
              <p className="text-xs text-[var(--text-muted)]">Discipline : Galop | Distance : 2100 m | Allocation : 300 000 €</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold">FAVORI</span>
                <span className="font-bold text-[var(--text-main)]">N°3 Ace Impact</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold">TUYAU DU JOUR</span>
                <span className="font-bold text-gold">N°1 Horizon Doré</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold">OUTSIDER</span>
                <span className="font-bold text-amber-400">N°6 Feed The Flame</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)]">
                <span className="text-[10px] text-[var(--text-muted)] block font-bold">TOKARD</span>
                <span className="font-bold text-red-400">N°9 Zarakem</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 space-y-2 text-xs">
              <span className="font-bold text-gold block uppercase">Combinaisons d'Experts :</span>
              <p className="text-[var(--text-main)] font-mono">
                Tiercé: 3-1-6 | Quarté: 3-1-6-9 | Quinté+: 3-1-6-9-4-8 | Couplé: 3-1 | Multi: 3-1-6-9-4
              </p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-bold text-[var(--text-main)]">Synthèse du pronostiqueur :</span>
              <p className="text-[var(--text-muted)] italic">
                « Victoire éclatante au galop sur le gazon bon souple de Longchamp. Le sprint final a fait la différence. »
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-center space-y-2">
              <p className="text-xs font-bold text-gold">Pour consulter toutes les autres analyses, abonnez-vous.</p>
              <p className="text-[11px] text-[var(--text-muted)]">Pronostics fournis à titre indicatif et informatif.</p>
            </div>
          </div>
        </section>

        <VipPromoModal
          isOpen={vipModalOpen}
          onClose={() => setVipModalOpen(false)}
          user={user}
        />

      </div>
    );
  }

  // Unlocked VIP Interface View
  return (
    <div className="space-y-10 pb-16 animate-in fade-in">

      {/* Gold Header */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold shadow-gold-glow bg-gradient-to-r from-[#1f1803] via-racing-dark to-[#1f1803] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full gold-gradient-bg text-racing-dark text-xs font-black uppercase mb-2 shadow-md">
            <Crown className="w-4 h-4" />
            <span>ACCÈS VIP ACTIF 👑</span>
          </div>
          <h1 className="text-3xl font-black text-white font-display">
            Espace Pronostics VIP Déverrouillé
          </h1>
          <p className="text-xs text-gold mt-1 font-semibold">
            Bienvenue {user.nom || user.email}. Vous bénéficiez de l'intégralité des analyses et combinaisons d'experts.
          </p>
        </div>

        <div className="bg-racing-dark/90 p-4 rounded-2xl border border-gold/40 text-center min-w-[200px]">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Statut Abonnement</span>
          <span className="text-lg font-black text-gold">30 Jours Restants</span>
        </div>
      </div>

      {/* VIP Daily Picks Display */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[var(--text-main)] font-display flex items-center gap-2">
          <Trophy className="w-6 h-6 text-gold" />
          Pronostics VIP Officiels de la Journée
        </h2>

        {races.map((race) => (
          <div key={race.id} className="glass-panel rounded-3xl p-6 sm:p-8 border-2 border-gold/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <span className="text-xs font-bold text-gold uppercase">{race.code} • {race.hippodrome}</span>
                <h3 className="text-xl font-bold text-[var(--text-main)]">{race.name}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-gold/20 text-gold font-bold text-xs">
                {race.discipline}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-gold/30">
                <span className="text-[10px] text-[var(--text-muted)] font-bold block">FAVORI DE LA COURSE</span>
                <span className="font-extrabold text-[var(--text-main)]">{race.runners[0]?.name || 'N°5 IDAHO SPRINGS'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-gold/30">
                <span className="text-[10px] text-[var(--text-muted)] font-bold block">TUYAU DU JOUR</span>
                <span className="font-extrabold text-gold">{race.sureSelection || 'N°1 HORIZON DORÉ'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-gold/30">
                <span className="text-[10px] text-[var(--text-muted)] font-bold block">OUTSIDER SÉDUISANT</span>
                <span className="font-extrabold text-amber-400">{race.outsiders?.[0] || 'N°6 FEED THE FLAME'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-gold/30">
                <span className="text-[10px] text-[var(--text-muted)] font-bold block">TOKARD À GROSSE COTE</span>
                <span className="font-extrabold text-red-400">{race.tokardOfDay || 'N°9 ZARAKEM'}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-racing-dark via-[#1a1505] to-racing-dark border-2 border-gold/50 space-y-3">
              <span className="text-xs font-black text-gold uppercase tracking-wider block">
                Combinaisons d'Experts Filtres VIP :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs font-extrabold text-white">
                <div className="p-2 rounded bg-gold/20 border border-gold/40 text-center">Tiercé: 5-12-3</div>
                <div className="p-2 rounded bg-gold/20 border border-gold/40 text-center">Quarté: 5-12-3-8</div>
                <div className="p-2 rounded bg-gold/20 border border-gold/40 text-center">Quinté+: 5-12-3-8-14</div>
                <div className="p-2 rounded bg-gold/20 border border-gold/40 text-center">Couplé: 5-12</div>
                <div className="p-2 rounded bg-gold/20 border border-gold/40 text-center">Multi: 5-12-3-8-14</div>
              </div>
            </div>

            <p className="text-xs text-[var(--text-muted)] italic bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
              « {race.synthesis} »
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
