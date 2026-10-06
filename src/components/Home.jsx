import React from 'react';
import {
  Trophy,
  Calendar,
  Award,
  ArrowRight,
  Sparkles,
  Star,
  Flame,
  CheckCircle2,
  ChevronRight,
  Newspaper,
  Clock,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import CountdownTimer from './CountdownTimer';

export default function Home({ setActiveTab, setSelectedRaceId, setSelectedArticleId }) {
  const { races, news, settings } = useApp();

  const upcomingRaces = races.filter(r => r.status === 'UPCOMING');
  const finishedRaces = races.filter(r => r.status === 'FINISHED');
  const nextRace = upcomingRaces[0] || races[0];
  const quinteRace = races.find(r => r.isQuinte) || nextRace;

  const handleSelectRace = (raceId) => {
    setSelectedRaceId(raceId);
    setActiveTab('pronostics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleId) => {
    setSelectedArticleId(articleId);
    setActiveTab('news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 pb-12">

      {/* Hero Banner with Rich Visuals & Dark Overlay */}
      <section className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl min-h-[480px] flex items-center">
        {/* Background Image with Dark Gradient Overlays */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${quinteRace?.image || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop'})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-racing-dark via-racing-dark/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-transparent to-racing-dark/40" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl px-6 sm:px-10 py-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider shadow-gold-glow">
            <Sparkles className="w-4 h-4 text-gold animate-spin" />
            <span>Pronostics Hippiques de Haute Précision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-display text-white leading-tight">
            L'Excellence du <span className="gold-gradient-text">Turf & PMU</span> à Votre Portée
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Analyses poussées, sélections de nos experts, tickets optimisés Tiercé / Quarté / Quinté+ et suivi des arrivées officielles en temps réel.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => handleSelectRace(quinteRace?.id)}
              className="px-6 py-3.5 rounded-2xl gold-gradient-bg text-racing-dark font-extrabold text-sm shadow-gold-glow hover:scale-105 transition-all flex items-center gap-2"
            >
              <Trophy className="w-5 h-5" />
              <span>Voir la Sélection Quinté+ du Jour</span>
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className="px-6 py-3.5 rounded-2xl bg-racing-card/80 hover:bg-racing-card border border-gold/30 text-white font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Award className="w-5 h-5 text-gold" />
              <span>Derniers Résultats Officiels</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Next Race Countdown */}
      {nextRace && (
        <section className="max-w-7xl mx-auto px-4">
          <CountdownTimer
            targetDate={nextRace.date}
            raceName={`${nextRace.code} - ${nextRace.name}`}
            hippodrome={nextRace.hippodrome}
          />
        </section>
      )}

      {/* Highlight Featured Quinté+ Card */}
      {quinteRace && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white font-display">Événement Quinté+ de la Journée</h2>
                <p className="text-xs text-slate-400">Le pronostic phare sélectionné par notre équipe d'experts</p>
              </div>
            </div>

            <button
              onClick={() => handleSelectRace(quinteRace.id)}
              className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
            >
              <span>Fiche complète</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-8 border border-gold/30 relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Image & Quick Badges */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl h-64 lg:h-full min-h-[220px]">
                <img
                  src={quinteRace.image}
                  alt={quinteRace.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-racing-dark/90 border border-gold/40 px-3 py-1 rounded-full text-gold font-bold text-xs">
                  {quinteRace.code} • {quinteRace.discipline}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs text-gold font-semibold uppercase">{quinteRace.hippodrome}</p>
                  <h3 className="text-xl font-bold text-white font-display">{quinteRace.name}</h3>
                </div>
              </div>

              {/* Race Details & Recommendation Summary */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-racing-dark/80 p-3 rounded-xl border border-racing-border">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Distance</span>
                    <span className="text-sm font-bold text-white">{quinteRace.distance}</span>
                  </div>
                  <div className="bg-racing-dark/80 p-3 rounded-xl border border-racing-border">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Allocation</span>
                    <span className="text-sm font-bold text-gold">{quinteRace.prize}</span>
                  </div>
                  <div className="bg-racing-dark/80 p-3 rounded-xl border border-racing-border">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Partants</span>
                    <span className="text-sm font-bold text-white">{quinteRace.startersCount} Chevaux</span>
                  </div>
                  <div className="bg-racing-dark/80 p-3 rounded-xl border border-racing-border">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Terrain</span>
                    <span className="text-sm font-bold text-emerald-400">{quinteRace.trackCondition}</span>
                  </div>
                </div>

                {/* Expert Selection Preview */}
                <div className="bg-racing-green/30 border border-racing-border rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      Sélection Incontournable Quinté+
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">Top 5 Combinaison</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quinteRace.combinations?.quinte?.map((num, idx) => (
                      <div key={idx} className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center font-extrabold text-racing-dark text-base shadow-md">
                        {num}
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 italic pt-1 line-clamp-2">
                    "{quinteRace.synthesis}"
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Flame className="w-4 h-4 text-amber-500" />
                    <span>Tuyau du Jour : <strong className="text-white">{quinteRace.sureSelection}</strong></span>
                  </div>

                  <button
                    onClick={() => handleSelectRace(quinteRace.id)}
                    className="px-5 py-2.5 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow hover:scale-105 transition-all flex items-center gap-1.5"
                  >
                    <span>Consulter le Ticket Complet</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* Grid: Upcoming Schedule & Official Results Preview */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Upcoming Races List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              Prochains Départs
            </h3>
            <button
              onClick={() => setActiveTab('pronostics')}
              className="text-xs font-bold text-gold hover:underline"
            >
              Voir tout ({upcomingRaces.length})
            </button>
          </div>

          <div className="space-y-3">
            {upcomingRaces.slice(0, 3).map((race) => (
              <div
                key={race.id}
                onClick={() => handleSelectRace(race.id)}
                className="glass-panel-hover p-4 rounded-2xl cursor-pointer flex items-center justify-between gap-4 border border-racing-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-racing-dark border border-gold/30 flex flex-col items-center justify-center font-bold text-gold">
                    <span className="text-xs">{race.code}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-sm hover:text-gold transition-colors">{race.name}</h4>
                      {race.isQuinte && (
                        <span className="px-1.5 py-0.5 rounded bg-gold/20 text-gold text-[10px] font-black uppercase">
                          Quinté+
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{race.hippodrome} • {race.discipline} • {race.distance}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                    {new Date(race.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Cote favori: {race.runners[0]?.odds}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Official Results List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Dernières Arrivées Officieuses
            </h3>
            <button
              onClick={() => setActiveTab('results')}
              className="text-xs font-bold text-gold hover:underline"
            >
              Consulter l'archivage
            </button>
          </div>

          <div className="space-y-3">
            {finishedRaces.length > 0 ? (
              finishedRaces.slice(0, 3).map((race) => (
                <div key={race.id} className="glass-panel p-4 rounded-2xl border border-racing-border">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-bold text-gold">{race.code} - {race.hippodrome}</span>
                      <h4 className="font-bold text-white text-sm">{race.name}</h4>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      Officiel
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-racing-border/50">
                    <span className="text-xs text-slate-400 font-semibold">Arrivée :</span>
                    <div className="flex items-center gap-1.5">
                      {race.officialArrival?.map((num, idx) => (
                        <span
                          key={idx}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            idx === 0 ? 'bg-gold text-racing-dark font-black' : 'bg-racing-dark text-white border border-racing-border'
                          }`}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel p-6 rounded-2xl text-center text-slate-400 text-sm">
                Aucun résultat publié pour le moment.
              </div>
            )}
          </div>
        </div>

      </section>

      {/* News & Expert Analyses Feed */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold/10 border border-gold/30 text-gold">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white font-display">Actualités & Chroniques Hippiques</h2>
              <p className="text-xs text-slate-400">Analyses tactiques et conseils pour optimiser vos choix</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('news')}
            className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
          >
            <span>Toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.slice(0, 2).map((article) => (
            <div
              key={article.id}
              onClick={() => handleSelectArticle(article.id)}
              className="glass-panel-hover rounded-2xl overflow-hidden border border-racing-border cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-racing-dark/90 text-gold px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-gold/30">
                  {article.category}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>• Par {article.author}</span>
                  </div>
                  <h3 className="font-bold text-white text-base hover:text-gold transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-racing-border flex items-center justify-between text-xs font-bold text-gold">
                  <span>Lire l'article complet</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
