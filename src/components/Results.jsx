import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Search,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  MapPin,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Results() {
  const { races } = useApp();

  const [filterDiscipline, setFilterDiscipline] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL'); // 'ALL', 'FINISHED', 'UPCOMING'
  const [searchQuery, setSearchQuery] = useState('');

  const disciplines = Array.from(new Set(races.map(r => r.discipline)));

  const filteredRaces = races.filter(race => {
    const matchesDiscipline = filterDiscipline === 'ALL' || race.discipline === filterDiscipline;
    const matchesStatus = filterStatus === 'ALL' || race.status === filterStatus;
    const matchesSearch = race.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          race.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          race.hippodrome.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDiscipline && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-10 pb-12">

      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Données Officielles & Certifiées</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-3">
              <Award className="w-8 h-8 text-gold" />
              <span>Résultats & Arrivées Officielles</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Consultez les résultats authentiques des courses PMU terminées et le statut en direct des départs.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrer par hippodrome, nom..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-racing-dark border border-racing-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-racing-border">
          <div className="flex items-center gap-2 text-xs font-bold text-gold uppercase tracking-wider">
            <Filter className="w-4 h-4 text-gold" />
            <span>Filtres :</span>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-racing-dark border border-racing-border text-xs text-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-gold"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="FINISHED">Résultats Officiels uniquement</option>
            <option value="UPCOMING">Courses en Attente d'arrivée</option>
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

      {/* Results Grid List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRaces.map((race) => {
          const isFinished = race.status === 'FINISHED' && race.officialArrival;

          return (
            <div
              key={race.id}
              className="glass-panel p-6 rounded-3xl border border-racing-border hover:border-gold/30 transition-all space-y-6"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-racing-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-racing-dark border border-gold/40 flex flex-col items-center justify-center font-black text-gold text-sm shadow-inner">
                    <span>{race.code}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-lg">{race.name}</h3>
                      {race.isQuinte && (
                        <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[10px] font-extrabold uppercase">
                          Quinté+
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{race.hippodrome}</span>
                      <span>•</span>
                      <span>{race.discipline}</span>
                      <span>•</span>
                      <span>{race.distance}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div>
                  {isFinished ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 font-bold text-xs border border-emerald-500/40 shadow-emerald-glow">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Arrivée Officielle</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 text-amber-400 font-bold text-xs border border-amber-500/40">
                      <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>En attente d'arrivée officielle</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              {isFinished ? (
                <div className="space-y-4">
                  {/* Official Arrival Numbers Banner */}
                  <div className="bg-racing-dark/90 p-4 rounded-2xl border border-gold/30 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gold uppercase tracking-wider">
                        Ordre d'Arrivée Officiel :
                      </span>
                      <div className="flex items-center gap-2">
                        {race.officialArrival.map((num, idx) => (
                          <div
                            key={idx}
                            className={`w-10 h-10 rounded-xl font-black text-base flex items-center justify-center shadow-md ${
                              idx === 0
                                ? 'gold-gradient-bg text-racing-dark border-2 border-white'
                                : 'bg-racing-card text-white border border-racing-border'
                            }`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Non starters list */}
                    {race.nonStarters && race.nonStarters.length > 0 && (
                      <div className="text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/30 px-3 py-1.5 rounded-xl">
                        Non-Partant(s) : N° {race.nonStarters.join(', ')}
                      </div>
                    )}
                  </div>

                  {/* Summary commentary */}
                  {race.synthesis && (
                    <p className="text-xs text-slate-300 italic bg-racing-dark/40 p-3 rounded-xl border border-racing-border">
                      "{race.synthesis}"
                    </p>
                  )}
                </div>
              ) : (
                /* Unconfirmed / Pending State Disclaimer */
                <div className="bg-racing-dark/60 border border-dashed border-racing-border rounded-2xl p-6 text-center space-y-2">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto animate-bounce" />
                  <h4 className="text-sm font-bold text-white">Course à venir ou en cours d'arbitrage</h4>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    Conformément aux règles de déontologie, les résultats affichés comme officiels ne sont jamais générés artificiellement. L'ordre d'arrivée apparaîtra dès sa validation officielle par les juges.
                  </p>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
