import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  Flame,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Predictions({ selectedRaceId, setSelectedRaceId }) {
  const { races, bookmarks, toggleBookmark, settings } = useApp();

  const [filterHippodrome, setFilterHippodrome] = useState('ALL');
  const [filterDiscipline, setFilterDiscipline] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTicketType, setActiveTicketType] = useState('quinte'); // 'tierce', 'quarte', 'quinte', 'couple', 'multi'

  // Find current race or default
  const currentRace = races.find(r => r.id === selectedRaceId) || races[0];

  // Filtering list
  const filteredRaces = races.filter(race => {
    const matchesHippodrome = filterHippodrome === 'ALL' || race.hippodrome === filterHippodrome;
    const matchesDiscipline = filterDiscipline === 'ALL' || race.discipline === filterDiscipline;
    const matchesSearch = race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          race.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          race.hippodrome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHippodrome && matchesDiscipline && matchesSearch;
  });

  const hippodromes = Array.from(new Set(races.map(r => r.hippodrome)));
  const disciplines = Array.from(new Set(races.map(r => r.discipline)));

  const isBookmarked = bookmarks.includes(currentRace?.id);

  return (
    <div className="space-y-10 pb-12">

      {/* Top Header & Search Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-3">
              <Calendar className="w-8 h-8 text-gold" />
              <span>Pronostics & Fiches de Courses</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Consultez nos sélections, billets de combinaisons et synthèses d'experts.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une course, hippodrome..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-racing-dark border border-racing-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-racing-border">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Filter className="w-4 h-4 text-gold" />
            <span>Filtres :</span>
          </div>

          <select
            value={filterHippodrome}
            onChange={(e) => setFilterHippodrome(e.target.value)}
            className="bg-racing-dark border border-racing-border text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
          >
            <option value="ALL">Tous les Hippodromes</option>
            {hippodromes.map(h => <option key={h} value={h}>{h}</option>)}
          </select>

          <select
            value={filterDiscipline}
            onChange={(e) => setFilterDiscipline(e.target.value)}
            className="bg-racing-dark border border-racing-border text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
          >
            <option value="ALL">Toutes Disciplines</option>
            {disciplines.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Side: Race Selector Cards Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider px-2">
            Programme des Courses ({filteredRaces.length})
          </h3>

          <div className="space-y-3 max-h-[850px] overflow-y-auto pr-1">
            {filteredRaces.map((race) => {
              const selected = race.id === currentRace?.id;
              return (
                <div
                  key={race.id}
                  onClick={() => setSelectedRaceId(race.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    selected
                      ? 'bg-racing-green/60 border-gold shadow-gold-glow'
                      : 'glass-panel-hover border-racing-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold">{race.code} • {race.hippodrome}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      race.status === 'FINISHED'
                        ? 'bg-slate-800 text-slate-400 border border-slate-700'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {race.status === 'FINISHED' ? 'Terminée' : new Date(race.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-sm mt-1">{race.name}</h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{race.discipline} • {race.distance}</span>
                    <span className="text-gold font-semibold">{race.prize}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Race & Prediction Sheet */}
        {currentRace && (
          <div className="lg:col-span-8 space-y-8">

            {/* Header Banner for Selected Race */}
            <div className="glass-panel rounded-3xl p-6 md:p-8 border border-gold/40 relative overflow-hidden space-y-6">

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1 rounded-xl bg-gold/20 text-gold border border-gold/40 font-black text-sm">
                    {currentRace.code}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span>{currentRace.hippodrome}</span>
                    <span>•</span>
                    <Clock className="w-4 h-4 text-gold" />
                    <span>{new Date(currentRace.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(currentRace.id)}
                    className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-bold ${
                      isBookmarked
                        ? 'bg-gold text-racing-dark border-gold'
                        : 'bg-racing-dark border-racing-border text-slate-300 hover:text-gold'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{isBookmarked ? 'Favori' : 'Sauvegarder'}</span>
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white font-display">{currentRace.name}</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Discipline: <strong className="text-white">{currentRace.discipline}</strong> | Distance: <strong className="text-white">{currentRace.distance}</strong> | Allocation: <strong className="text-gold">{currentRace.prize}</strong>
                </p>
              </div>

              {/* Quick Recommendations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">

                <div className="bg-racing-dark/90 p-3.5 rounded-2xl border border-racing-border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Favoris Solidarité</span>
                  <div className="text-xs font-bold text-emerald-400 space-y-0.5">
                    {currentRace.favorites?.map((f, i) => <div key={i}>{f}</div>)}
                  </div>
                </div>

                <div className="bg-racing-dark/90 p-3.5 rounded-2xl border border-racing-border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Outsiders Séduisants</span>
                  <div className="text-xs font-bold text-amber-400 space-y-0.5">
                    {currentRace.outsiders?.map((o, i) => <div key={i}>{o}</div>)}
                  </div>
                </div>

                <div className="bg-racing-dark/90 p-3.5 rounded-2xl border border-racing-border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Sélection Sûre / Tuyau</span>
                  <div className="text-xs font-black text-gold">
                    {currentRace.sureSelection}
                  </div>
                </div>

                <div className="bg-racing-dark/90 p-3.5 rounded-2xl border border-racing-border">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Tokard du Jour</span>
                  <div className="text-xs font-black text-red-400">
                    {currentRace.tokardOfDay}
                  </div>
                </div>

              </div>

            </div>

            {/* Visual Coupons & Combinations Ticket */}
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-racing-border">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <h3 className="text-xl font-bold text-white font-display">Coupons & Tickets Recommandés</h3>
                </div>

                {/* Ticket Type Selector Tabs */}
                <div className="flex flex-wrap items-center gap-1 bg-racing-dark p-1 rounded-xl border border-racing-border">
                  {['quinte', 'quarte', 'tierce', 'couple', 'multi'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveTicketType(type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                        activeTicketType === type
                          ? 'gold-gradient-bg text-racing-dark shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket Preview Box (Designed like a real betting coupon) */}
              <div className="bg-gradient-to-br from-racing-card via-racing-dark to-racing-card border-2 border-gold/50 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold text-racing-dark text-[10px] font-black uppercase px-4 py-1 rounded-bl-xl tracking-wider">
                  TICKET OPTIMISÉ TURFELITE
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-gold uppercase tracking-wider block">
                      Type de Pari : {activeTicketType.toUpperCase()}
                    </span>
                    <p className="text-sm font-bold text-white mt-0.5">
                      {currentRace.code} - {currentRace.name} ({currentRace.hippodrome})
                    </p>
                  </div>

                  {/* Combination Balls */}
                  <div className="py-4 border-y border-gold/20 flex flex-wrap items-center gap-3">
                    <span className="text-xs text-slate-400 font-semibold uppercase">Combinaison :</span>
                    {currentRace.combinations?.[activeTicketType]?.map((num, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-2xl gold-gradient-bg text-racing-dark font-black text-lg flex items-center justify-center shadow-lg border-2 border-white/20 transform hover:scale-110 transition-transform"
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {/* Mandatory Legal Risk Disclaimer Badge on Coupon */}
                  <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-3 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-amber-200 leading-tight">
                      <strong>Avertissement :</strong> Pronostics fournis à titre uniquement indicatif et d'analyse. Jouer comporte des risques : endettement, isolement. Appelez le <strong>09 74 75 13 13</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Expert Written Synthesis */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-gold uppercase tracking-wider">
                  Synthèse & Analyse Détaillée de l'Expert
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-racing-dark/60 p-4 rounded-2xl border border-racing-border">
                  {currentRace.synthesis}
                </p>
              </div>

            </div>

            {/* Table of Starters / Runners */}
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 space-y-4">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" />
                <span>Tableau Général des Partants ({currentRace.runners?.length || 0})</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-racing-dark text-gold font-bold uppercase border-b border-racing-border">
                    <tr>
                      <th className="py-3 px-3">N°</th>
                      <th className="py-3 px-3">Cheval</th>
                      <th className="py-3 px-3">Jockey / Driver</th>
                      <th className="py-3 px-3">Entraîneur</th>
                      <th className="py-3 px-3">Musique</th>
                      <th className="py-3 px-3 text-right">Cote Probable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-racing-border/50 text-slate-300">
                    {currentRace.runners?.map((runner) => (
                      <tr key={runner.num} className="hover:bg-racing-card/60 transition-colors">
                        <td className="py-3 px-3 font-bold text-white">
                          <span className="w-7 h-7 rounded-lg bg-racing-dark border border-gold/30 inline-flex items-center justify-center text-gold">
                            {runner.num}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-extrabold text-white">{runner.name}</td>
                        <td className="py-3 px-3 text-slate-300">{runner.jockey}</td>
                        <td className="py-3 px-3 text-slate-400">{runner.trainer}</td>
                        <td className="py-3 px-3 font-mono text-emerald-400">{runner.form}</td>
                        <td className="py-3 px-3 text-right font-bold text-gold">{runner.odds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
