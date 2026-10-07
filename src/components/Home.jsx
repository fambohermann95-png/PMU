import React, { useState } from 'react';
import {
  Sparkles,
  Trophy,
  Award,
  Zap,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Mail,
  Send,
  MessageSquare,
  Lock,
  Eye,
  Star,
  Flame,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Hero from './Hero';
import CountdownTimer from './CountdownTimer';
import VipPromoModal from './VipPromoModal';
import DEFAULT_CONFIG from '../config';

export default function Home({ setActiveTab, setSelectedRaceId }) {
  const { user, setAuthModalOpen, setAuthMode, races, results } = useApp();
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  // Cookie banner state
  const [cookieConsent, setCookieConsent] = useState(() => {
    return localStorage.getItem('turfelite_cookies') || null;
  });

  const nextRace = races.find(r => r.status === 'UPCOMING');

  // Discipline favorites data
  const freeFavoritesData = {
    quinte: {
      title: "Favoris Quinté+",
      picks: ["5 - IDAHO SPRINGS", "12 - KINGS TROTTER", "3 - EXCELLENCE D'OR", "8 - BARON DU CROT"],
      analysis: "Une épreuve sélective sur le parcours classique. Le favori N°5 se présente au sommet de sa forme."
    },
    quarte: {
      title: "Favoris Quarté",
      picks: ["1 - HORIZON DORÉ", "3 - ACE IMPACT", "6 - FEED THE FLAME", "9 - ZARAKEM"],
      analysis: "Un lot relevé de pur-sang. Excellente préparation du N°1 pour cette distance de tenue."
    },
    pmu: {
      title: "Favoris PMU",
      picks: ["2 - DIAMANT DU NORD", "7 - LUNA ROSSA", "11 - SOLAR WIND", "14 - QUEEN OF SPEED"],
      analysis: "Combinaison polyvalente pour jouer sur les réunions PMU du jour avec régularité."
    },
    trio: {
      title: "Favoris Trio",
      picks: ["5 - IDAHO SPRINGS", "3 - EXCELLENCE D'OR", "12 - KINGS TROTTER"],
      analysis: "Trois bases indiscutables pour constituer un champ réduit ou un trio combiné."
    }
  };

  const handleDisciplineClick = (disciplineKey) => {
    if (!user) {
      setAuthMode('login');
      setAuthModalOpen(true);
      return;
    }
    setSelectedDiscipline(disciplineKey);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // Anti-spam

    const existingMsgs = JSON.parse(localStorage.getItem('turfelite_messages') || '[]');
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: contactName,
      email: contactEmail,
      message: contactMsg,
      status: 'unread',
      created_at: new Date().toISOString()
    };
    localStorage.setItem('turfelite_messages', JSON.stringify([newMsg, ...existingMsgs]));
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const testimonials = [
    { name: "Marc K.", country: "🇧🇯 Bénin", comment: "Des analyses claires et synthétiques. L'abonnement VIP vaut largement le coup.", stars: 5, is_demo: true },
    { name: "Ibrahim S.", country: "🇨🇮 Côte d'Ivoire", comment: "Interface très fluide sur téléphone. Le code d'accès est reçu immédiatement.", stars: 5, is_demo: true },
    { name: "Jean-Baptiste P.", country: "🇫🇷 France", comment: "Excellente réactivité du support WhatsApp et vraies explications sur les tuyaux.", stars: 5, is_demo: true },
    { name: "Ousmane D.", country: "🇸🇳 Sénégal", comment: "Enfin une vraie communauté hippique moderne et professionnelle !", stars: 5, is_demo: true },
  ];

  const faqList = [
    { q: "Comment obtenir un code d'accès VIP ?", a: "Vous envoyez votre demande via le formulaire ou directement sur WhatsApp (+22646553556). L'administrateur vous génère un code unique et confidentiel après confirmation." },
    { q: "Quelle est la durée des abonnements VIP ?", a: "Trois formules existent : Hebdomadaire (7 jours), Mensuel (30 jours) et Annuel (365 jours)." },
    { q: "Qu'est-ce que le VIP apporte en plus ?", a: "Le VIP déverrouille l'intégralité des combinaisons d'experts (Tiercé, Quarté, Quinté+, Couplé, Multi, Trio), les tuyaux du jour, les tokards et des statistiques avancées." },
    { q: "Comment fonctionnent les outils d'intelligence artificielle ?", a: "Nos algorithmes analysent les chronos récents, la régularité sur les parcours et l'historique des jockeys/entraineurs pour croiser l'analyse de nos pronostiqueurs." },
    { q: "Les pronostics garantissent-ils des gains ?", a: "Non. Les pronostics sont fournis à titre uniquement indicatif et d'analyse. Aucun gain n'est garanti. Jouez de manière responsable." }
  ];

  return (
    <div className="space-y-12 pb-16">

      {/* 1. Hero Section */}
      <Hero
        onNavigate={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        openVipModal={() => setVipModalOpen(true)}
      />

      {/* 2. AI Banner */}
      <section className="glass-panel rounded-2xl p-4 sm:p-6 border border-gold/30 bg-gradient-to-r from-racing-green/40 via-[var(--bg-card)] to-racing-green/40 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-2xl gold-gradient-bg text-racing-dark font-black flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-wider">Expertise & Intelligence Artificielle</span>
            <p className="text-sm sm:text-base font-semibold text-[var(--text-main)] mt-0.5">
              {DEFAULT_CONFIG.aiBannerText}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Countdown Timer (Hidden if no race) */}
      {nextRace && (
        <section>
          <CountdownTimer
            targetDate={nextRace.date}
            raceName={`${nextRace.code} - ${nextRace.name}`}
            hippodrome={nextRace.hippodrome}
          />
        </section>
      )}

      {/* 4. Discipline Buttons (Quinté, Quarté, PMU, Trio) */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-display">
            Sélections de la Journée
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Choisissez une discipline pour afficher les favoris indicatifs gratuits.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { key: 'quinte', label: 'Quinté', icon: Trophy, color: 'border-gold text-gold' },
            { key: 'quarte', label: 'Quarté', icon: Award, color: 'border-amber-500 text-amber-400' },
            { key: 'pmu', label: 'PMU', icon: Flame, color: 'border-emerald-500 text-emerald-400' },
            { key: 'trio', label: 'Trio', icon: Star, color: 'border-indigo-500 text-indigo-400' },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedDiscipline === item.key;
            return (
              <button
                key={item.key}
                onClick={() => handleDisciplineClick(item.key)}
                className={`p-4 sm:p-6 rounded-2xl glass-panel-hover border flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected ? 'bg-gold/15 border-gold shadow-gold-glow scale-105' : 'border-[var(--border-color)]'
                }`}
              >
                <Icon className={`w-8 h-8 ${item.color}`} />
                <span className="font-extrabold text-base sm:text-lg text-[var(--text-main)]">{item.label}</span>
                {!user && (
                  <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-gold" /> Connexion requise
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Discipline Display */}
        {selectedDiscipline && freeFavoritesData[selectedDiscipline] && (
          <div className="glass-panel rounded-3xl p-6 border-2 border-gold/40 shadow-2xl space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
              <div>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">Sélection gratuite, indicative</span>
                <h3 className="text-xl font-bold text-[var(--text-main)]">{freeFavoritesData[selectedDiscipline].title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-gold/20 text-gold font-bold text-xs">
                3 à 4 favoris
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {freeFavoritesData[selectedDiscipline].picks.map((pick, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg gold-gradient-bg text-racing-dark font-black flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span className="font-bold text-xs text-[var(--text-main)]">{pick}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[var(--text-muted)] italic">
              « {freeFavoritesData[selectedDiscipline].analysis} »
            </p>

            {/* Blurred VIP Locked Preview */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-gold/50 bg-gradient-to-b from-racing-dark to-[var(--bg-card)] p-6 text-center space-y-4">
              <div className="filter blur-sm select-none opacity-40 pointer-events-none grid grid-cols-5 gap-2 max-w-md mx-auto my-2">
                <div className="p-2 rounded bg-gold text-black font-bold">① ••••</div>
                <div className="p-2 rounded bg-gold text-black font-bold">② ••••</div>
                <div className="p-2 rounded bg-gold text-black font-bold">③ ••••</div>
                <div className="p-2 rounded bg-gold text-black font-bold">④ ••••</div>
                <div className="p-2 rounded bg-gold text-black font-bold">⑤ ••••</div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                <Lock className="w-8 h-8 text-gold mb-2 animate-bounce" />
                <h4 className="text-base font-extrabold text-white">🔒 Pronostic complet, réservé aux membres VIP</h4>
                <p className="text-xs text-slate-300 max-w-md mb-4">
                  Déverrouillez la totalité des combinaisons, tuyaux et tokards d'experts.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setVipModalOpen(true)}
                    className="px-5 py-2.5 rounded-xl gold-gradient-bg text-racing-dark font-black text-xs shadow-gold-glow uppercase tracking-wider"
                  >
                    DEVENIR VIP
                  </button>
                  <a
                    href={`https://wa.me/22646553556?text=${encodeURIComponent("Bonjour TURF PERFORMANCE PRO, je souhaite obtenir mon code d'accès aux pronostics VIP TURFELITE-PMU.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-black text-xs shadow-emerald-glow uppercase tracking-wider"
                  >
                    📲 OBTENIR MON CODE SUR WHATSAPP
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* 5. Free Analysis of the Day */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl gold-gradient-bg text-racing-dark">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-gold uppercase tracking-wider">Chronique Gratuite du Jour</span>
            <h3 className="text-xl font-bold text-[var(--text-main)]">Analyse Tactique Quinté+</h3>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          Les favoris affichent une belle régularité en grande piste. Nous vous conseillons de surveiller particulièrement les chevaux préparés pour les parcours de tenue. Les favoris gratuits représentent une base d'orientation, mais le pronostic complet VIP contient la sélection filtrée définitive.
        </p>
      </section>

      {/* 6. Results Section Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[var(--text-main)] font-display">Résultats Officiels du Jour</h2>
            <p className="text-xs text-[var(--text-muted)]">Arrivées confirmées de la journée</p>
          </div>
          <button
            onClick={() => setActiveTab('results')}
            className="text-xs font-bold text-gold hover:underline"
          >
            Consulter la page Résultats →
          </button>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-[var(--border-color)] text-center">
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            En attente d'arrivée officielle. Les arrivées sont publiées en direct dès validation par le secrétariat de course.
          </p>
        </div>
      </section>

      {/* 7. Why Us Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-display">
            Pourquoi Choisir TurfElite ?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Une nouvelle vision de la pronostique hippique</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: "🏇 Analyse", desc: "Expertise humaine croisée avec des algorithmes prédictifs." },
            { title: "🔐 Accès privé", desc: "Code confidentiel sécurisé et vérifié côté serveur." },
            { title: "📱 100 % mobile", desc: "Interface fluide et réactive optimisée sur Android." },
            { title: "⚡ Ère numérique", desc: "Mises à jour instantanées de la plateforme sans rechargement." },
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-2">
              <h3 className="font-extrabold text-base text-[var(--text-main)]">{item.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Marketing Section */}
      <section className="rounded-3xl gold-gradient-bg p-8 text-racing-dark shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-black uppercase tracking-widest bg-racing-dark text-gold px-3 py-1 rounded-full">
            EXPERTISE NORMÉE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-tight">
            VIVRE AUTREMENT LES PRONOSTICS
          </h2>
          <p className="text-sm font-semibold opacity-90 leading-relaxed">
            Passez au niveau supérieur : analyses d'experts + outils d'intelligence artificielle. Un accompagnement premium pour mieux lire chaque course.
          </p>
          <button
            onClick={() => { setActiveTab('pronostics'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3.5 rounded-xl bg-racing-dark text-gold font-black text-xs uppercase tracking-wider shadow-2xl hover:scale-105 transition-all"
          >
            DÉCOUVRIR TURFELITE-PMU
          </button>
        </div>
      </section>

      {/* 9. VIP Subscriptions Summary */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-display">
            Abonnements VIP
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            Accédez à tous les pronostics complets et aux analyses détaillées.
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
                <p className="text-xs text-[var(--text-muted)]">Accès valide {plan.period}</p>

                <ul className="space-y-2 text-xs text-[var(--text-main)] pt-2 border-t border-[var(--border-color)]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Pronostics VIP quotidiens</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Tiercé, Quarté, Quinté, Trio</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Analyses détaillées & statistiques</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Support prioritaire WhatsApp</li>
                </ul>
              </div>

              <button
                onClick={() => setVipModalOpen(true)}
                className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                  plan.popular ? 'gold-gradient-bg text-racing-dark shadow-gold-glow' : 'bg-[var(--bg-primary)] text-[var(--text-main)] border border-[var(--border-color)] hover:border-gold'
                }`}
              >
                DEVENIR VIP
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Testimonials Carousel */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-display">
            Avis de nos Membres
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Retours de la communauté Turf Performance Pro</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {testimonials.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3 relative">
              {item.is_demo && (
                <span className="absolute top-3 right-3 text-[9px] font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                  Exemple
                </span>
              )}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gold-gradient-bg font-bold text-racing-dark flex items-center justify-center text-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[var(--text-main)]">{item.name}</h4>
                  <p className="text-[10px] text-[var(--text-muted)]">{item.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-gold">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold" />
                ))}
              </div>

              <p className="text-xs text-[var(--text-main)] italic">
                « {item.comment} »
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-display">
            Questions Fréquentes (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">Tout ce que vous devez savoir</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqList.map((item, index) => (
            <div key={index} className="glass-panel rounded-2xl border border-[var(--border-color)] overflow-hidden">
              <button
                onClick={() => setActiveFaqIndex(activeFaqIndex === index ? null : index)}
                className="w-full p-4 text-left font-bold text-sm text-[var(--text-main)] flex items-center justify-between gap-4"
              >
                <span>{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-gold transition-transform ${activeFaqIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {activeFaqIndex === index && (
                <div className="p-4 pt-0 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 12. Contact & Assistance Form */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold/30 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-[var(--text-main)] font-display">
            Contact & Assistance
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            Notre équipe vous répond par email à <strong className="text-gold">emmabrn888@gmail.com</strong>
          </p>
        </div>

        {contactSent ? (
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
            <p className="font-bold">Votre message a été transmis avec succès.</p>
            <p>Notre support vous recontactera sous peu.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
            />

            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Nom / Prénom</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Votre Email</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="votre.email@exemple.com"
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Message</label>
              <textarea
                required
                rows={4}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Expliquez votre demande..."
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-racing-dark font-black text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Envoyer le Message</span>
            </button>
          </form>
        )}
      </section>

      {/* 13. Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-4 max-w-md z-50 glass-panel border-2 border-gold/40 p-5 rounded-2xl shadow-2xl space-y-3 animate-in slide-in-from-bottom-5">
          <p className="text-xs text-[var(--text-main)]">
            🍪 Nous utilisons des cookies strictement nécessaires pour garantir votre session et mémoriser votre mode d'affichage. Aucun traceur publicitaire non essentiel n'est déposé.
          </p>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => { localStorage.setItem('turfelite_cookies', 'rejected'); setCookieConsent('rejected'); }}
              className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] text-[var(--text-muted)] text-xs font-bold border border-[var(--border-color)]"
            >
              Refuser
            </button>
            <button
              onClick={() => { localStorage.setItem('turfelite_cookies', 'accepted'); setCookieConsent('accepted'); }}
              className="px-4 py-1.5 rounded-lg gold-gradient-bg text-racing-dark text-xs font-black"
            >
              Accepter
            </button>
          </div>
        </div>
      )}

      {/* VIP Promo Modal */}
      <VipPromoModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
        user={user}
      />

    </div>
  );
}
