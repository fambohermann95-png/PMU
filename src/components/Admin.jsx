import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Edit3,
  Trash2,
  Check,
  Settings,
  Users,
  Newspaper,
  Film,
  Calendar,
  Award,
  X,
  Save,
  Sparkles,
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Admin() {
  const {
    user,
    races,
    news,
    media,
    settings,
    users,
    saveRace,
    deleteRace,
    updateOfficialResult,
    saveNews,
    deleteNews,
    saveMedia,
    deleteMedia,
    updateSettings,
    toggleUserRole
  } = useApp();

  const [activeTab, setActiveTab] = useState('races'); // 'races', 'results', 'news', 'media', 'users', 'settings'
  const [successMsg, setSuccessMsg] = useState('');

  // Race Modal / Form State
  const [raceModalOpen, setRaceModalOpen] = useState(false);
  const [editingRace, setEditingRace] = useState(null);
  const [raceForm, setRaceForm] = useState({
    id: '',
    code: 'R1C5',
    name: '',
    hippodrome: 'Vincennes',
    discipline: 'Attelé',
    distance: '2700m',
    prize: '50 000 €',
    date: new Date().toISOString().slice(0, 16),
    isQuinte: false,
    status: 'UPCOMING',
    trackCondition: 'Bon',
    startersCount: 12,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
    synthesis: 'Analyse et pronostic rédigés par le back-office.',
    favorites: ['5 - FAVORITE', '3 - SECOND'],
    outsiders: ['8 - OUTSIDER'],
    sureSelection: '5 - FAVORITE',
    tokardOfDay: '1 - TOKARD',
    combinations: {
      tierce: ['5', '3', '8'],
      quarte: ['5', '3', '8', '12'],
      quinte: ['5', '3', '8', '12', '1'],
      couple: ['5 - 3'],
      multi: ['5', '3', '8', '12', '1', '2']
    },
    runners: [
      { num: 1, name: 'TOKARD EXPRESS', jockey: 'F. Nivard', trainer: 'P. Levesque', odds: '25/1', form: '1a 2a', weight: '2700m' },
      { num: 3, name: 'SECOND CHANCE', jockey: 'E. Raffin', trainer: 'J.M. Bazire', odds: '4/1', form: '1a 1a', weight: '2700m' },
      { num: 5, name: 'FAVORITE STAR', jockey: 'J.M. Bazire', trainer: 'J.M. Bazire', odds: '2.5/1', form: '1a 1a', weight: '2700m' }
    ]
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Result Form State
  const [resultModalRace, setResultModalRace] = useState(null);
  const [officialArrivalStr, setOfficialArrivalStr] = useState('');
  const [nonStartersStr, setNonStartersStr] = useState('');

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-lg mx-auto border border-red-500/40">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Accès Refusé (Espace Administrateur)</h2>
        <p className="text-xs text-slate-400">Vous devez disposer du rôle d'administrateur pour accéder au Back-Office.</p>
      </div>
    );
  }

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleOpenRaceModal = (race = null) => {
    if (race) {
      setEditingRace(race);
      setRaceForm({
        ...race,
        date: new Date(race.date).toISOString().slice(0, 16)
      });
    } else {
      setEditingRace(null);
      setRaceForm({
        id: `race-${Date.now()}`,
        code: 'R1C5',
        name: 'Nouveau Prix de Course',
        hippodrome: 'Vincennes',
        discipline: 'Attelé',
        distance: '2700m',
        prize: '60 000 €',
        date: new Date(Date.now() + 3600000 * 2).toISOString().slice(0, 16),
        isQuinte: false,
        status: 'UPCOMING',
        trackCondition: 'Bon',
        startersCount: 12,
        image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
        synthesis: 'Synthèse rédigée par l\'admin.',
        favorites: ['5 - STAR', '3 - HERO'],
        outsiders: ['8 - BARON'],
        sureSelection: '5 - STAR',
        tokardOfDay: '1 - SURPRISE',
        combinations: {
          tierce: ['5', '3', '8'],
          quarte: ['5', '3', '8', '12'],
          quinte: ['5', '3', '8', '12', '1'],
          couple: ['5 - 3'],
          multi: ['5', '3', '8', '12', '1', '2']
        },
        runners: [
          { num: 1, name: 'SURPRISE', jockey: 'F. Nivard', trainer: 'P. Levesque', odds: '25/1', form: '1a 2a', weight: '2700m' },
          { num: 3, name: 'HERO', jockey: 'E. Raffin', trainer: 'J.M. Bazire', odds: '4/1', form: '1a 1a', weight: '2700m' },
          { num: 5, name: 'STAR', jockey: 'J.M. Bazire', trainer: 'J.M. Bazire', odds: '2.5/1', form: '1a 1a', weight: '2700m' }
        ]
      });
    }
    setRaceModalOpen(true);
  };

  const handleSaveRaceSubmit = (e) => {
    e.preventDefault();
    saveRace({
      ...raceForm,
      date: new Date(raceForm.date).toISOString()
    });
    setRaceModalOpen(false);
    showNotification('Course et pronostic enregistrés avec succès !');
  };

  const handleSaveResultSubmit = (e) => {
    e.preventDefault();
    if (!resultModalRace) return;
    const arrivalArr = officialArrivalStr.split('-').map(s => s.trim()).filter(Boolean);
    const nonStartersArr = nonStartersStr ? nonStartersStr.split('-').map(s => s.trim()).filter(Boolean) : [];

    updateOfficialResult(resultModalRace.id, arrivalArr, nonStartersArr);
    setResultModalRace(null);
    showNotification('Résultat officiel publié avec succès !');
  };

  const handleSaveSettingsSubmit = (e) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showNotification('Paramètres de la plateforme mis à jour !');
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Admin Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-racing-dark flex items-center justify-center font-bold shadow-gold-glow">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white font-display">Back-Office Administrateur</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase border border-emerald-500/30">
                  Mode Pilote
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Gestion intégrale des pronostics, validation des arrivées officielles, gestion des membres et paramétrage.
              </p>
            </div>
          </div>
        </div>

        {/* Global Notification Banner */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-racing-border overflow-x-auto">
          {[
            { id: 'races', label: 'Gestion Courses & Pronos', icon: Calendar },
            { id: 'results', label: 'Saisie des Résultats', icon: Award },
            { id: 'users', label: 'Membres & Rôles', icon: Users },
            { id: 'settings', label: 'Paramétrage du Site', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                    : 'bg-racing-dark text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Races & Pronostics CRUD */}
      {activeTab === 'races' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display">
              Liste des Courses et Pronostics ({races.length})
            </h2>
            <button
              onClick={() => handleOpenRaceModal()}
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une Course / Pronostic</span>
            </button>
          </div>

          <div className="glass-panel rounded-3xl border border-gold/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-racing-dark text-gold font-bold uppercase border-b border-racing-border">
                  <tr>
                    <th className="py-3.5 px-4">Code</th>
                    <th className="py-3.5 px-4">Nom de la Course</th>
                    <th className="py-3.5 px-4">Hippodrome</th>
                    <th className="py-3.5 px-4">Discipline</th>
                    <th className="py-3.5 px-4">Statut</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-racing-border/60 text-slate-300">
                  {races.map(race => (
                    <tr key={race.id} className="hover:bg-racing-card/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{race.code}</td>
                      <td className="py-3.5 px-4 font-bold text-white">{race.name}</td>
                      <td className="py-3.5 px-4">{race.hippodrome}</td>
                      <td className="py-3.5 px-4">{race.discipline}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          race.status === 'FINISHED'
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {race.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenRaceModal(race)}
                          className="p-1.5 rounded-lg bg-racing-dark hover:bg-gold hover:text-racing-dark text-gold border border-gold/30 transition-colors"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Supprimer cette course ?')) {
                              deleteRace(race.id);
                              showNotification('Course supprimée.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-racing-dark hover:bg-red-950 hover:text-red-400 text-slate-400 border border-racing-border transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Official Results Input */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font-display">
            Saisie des Arrivées Officieuses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {races.map(race => (
              <div key={race.id} className="glass-panel p-5 rounded-2xl border border-racing-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold">{race.code} - {race.hippodrome}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${race.status === 'FINISHED' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'}`}>
                    {race.status === 'FINISHED' ? 'Officiel Publié' : 'En Attente'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base">{race.name}</h3>

                {race.status === 'FINISHED' ? (
                  <p className="text-xs text-emerald-400 font-mono">Arrivée : {race.officialArrival?.join(' - ')}</p>
                ) : (
                  <p className="text-xs text-slate-400">Aucun résultat officiel enregistré.</p>
                )}

                <button
                  onClick={() => {
                    setResultModalRace(race);
                    setOfficialArrivalStr(race.officialArrival?.join(' - ') || '5 - 12 - 3 - 8 - 1');
                    setNonStartersStr(race.nonStarters?.join(' - ') || '');
                  }}
                  className="w-full py-2 rounded-xl bg-racing-dark hover:bg-gold hover:text-racing-dark border border-gold/30 text-gold font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Saisir / Valider Arrivée Officielle</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Users & Roles */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font-display">
            Gestion des Utilisateurs ({users.length})
          </h2>

          <div className="glass-panel rounded-3xl border border-gold/30 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-racing-dark text-gold font-bold uppercase border-b border-racing-border">
                  <tr>
                    <th className="py-3.5 px-4">Utilisateur</th>
                    <th className="py-3.5 px-4">Email</th>
                    <th className="py-3.5 px-4">Rôle</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-racing-border/60 text-slate-300">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-racing-card/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full border border-gold" />
                        <span>{u.name}</span>
                      </td>
                      <td className="py-3.5 px-4">{u.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-gold/20 text-gold' : 'bg-slate-800 text-slate-300'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            toggleUserRole(u.id);
                            showNotification(`Rôle modifié pour ${u.name}`);
                          }}
                          className="px-3 py-1 rounded-lg bg-racing-dark hover:bg-racing-card border border-racing-border text-xs text-slate-300"
                        >
                          Changer en {u.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Site Settings */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 max-w-2xl space-y-6">
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Settings className="w-5 h-5 text-gold" />
            <span>Paramètres Généraux de la Plateforme</span>
          </h2>

          <form onSubmit={handleSaveSettingsSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Numéro WhatsApp du Support</label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Message Pré-rempli WhatsApp</label>
              <input
                type="text"
                value={settingsForm.whatsappMessage}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappMessage: e.target.value })}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Texte de l'Avertissement Jeu Responsable</label>
              <textarea
                rows={3}
                value={settingsForm.responsibleGamblingText}
                onChange={(e) => setSettingsForm({ ...settingsForm, responsibleGamblingText: e.target.value })}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Enregistrer les Paramètres</span>
            </button>
          </form>
        </div>
      )}

      {/* Modal for Creating / Editing Race */}
      {raceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-racing-card border border-gold/40 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">

            <div className="flex items-center justify-between border-b border-racing-border pb-4">
              <h3 className="font-bold text-white text-lg font-display">
                {editingRace ? 'Modifier la Course / Pronostic' : 'Créer une Nouvelle Course'}
              </h3>
              <button
                onClick={() => setRaceModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-full bg-racing-dark border border-racing-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRaceSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Code Course (ex: R1C4)</label>
                  <input
                    type="text"
                    required
                    value={raceForm.code}
                    onChange={(e) => setRaceForm({ ...raceForm, code: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Hippodrome</label>
                  <input
                    type="text"
                    required
                    value={raceForm.hippodrome}
                    onChange={(e) => setRaceForm({ ...raceForm, hippodrome: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Nom de la Course / Prix</label>
                <input
                  type="text"
                  required
                  value={raceForm.name}
                  onChange={(e) => setRaceForm({ ...raceForm, name: e.target.value })}
                  className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Discipline</label>
                  <select
                    value={raceForm.discipline}
                    onChange={(e) => setRaceForm({ ...raceForm, discipline: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Attelé">Attelé</option>
                    <option value="Monté">Monté</option>
                    <option value="Galop">Galop</option>
                    <option value="Haies">Haies</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Distance</label>
                  <input
                    type="text"
                    value={raceForm.distance}
                    onChange={(e) => setRaceForm({ ...raceForm, distance: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Allocation (€)</label>
                  <input
                    type="text"
                    value={raceForm.prize}
                    onChange={(e) => setRaceForm({ ...raceForm, prize: e.target.value })}
                    className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Synthèse / Analyse de l'Expert</label>
                <textarea
                  rows={3}
                  value={raceForm.synthesis}
                  onChange={(e) => setRaceForm({ ...raceForm, synthesis: e.target.value })}
                  className="w-full bg-racing-dark border border-racing-border rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isQuinte"
                  checked={raceForm.isQuinte}
                  onChange={(e) => setRaceForm({ ...raceForm, isQuinte: e.target.checked })}
                  className="w-4 h-4 accent-gold"
                />
                <label htmlFor="isQuinte" className="font-bold text-gold">Course support du Quinté+</label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow"
              >
                Enregistrer la Course
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Modal for Result Entry */}
      {resultModalRace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-racing-card border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">

            <div className="flex items-center justify-between border-b border-racing-border pb-3">
              <h3 className="font-bold text-white text-base font-display">
                Résultat Officiel : {resultModalRace.code}
              </h3>
              <button
                onClick={() => setResultModalRace(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full bg-racing-dark border border-racing-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveResultSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">Ordre d'Arrivée (Séparé par des tirets)</label>
                <input
                  type="text"
                  required
                  placeholder="ex: 7 - 12 - 3 - 9 - 2"
                  value={officialArrivalStr}
                  onChange={(e) => setOfficialArrivalStr(e.target.value)}
                  className="w-full bg-racing-dark border border-racing-border rounded-xl px-3.5 py-2.5 text-white font-mono text-sm"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Non-Partants (si applicable)</label>
                <input
                  type="text"
                  placeholder="ex: 5 - 11"
                  value={nonStartersStr}
                  onChange={(e) => setNonStartersStr(e.target.value)}
                  className="w-full bg-racing-dark border border-racing-border rounded-xl px-3.5 py-2.5 text-white font-mono text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow"
              >
                Publier le Résultat Officiel
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
