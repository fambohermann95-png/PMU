import React, { useState } from 'react';
import {
  User as UserIcon,
  Bookmark,
  Bell,
  ShieldCheck,
  Key,
  LogOut,
  Trash2,
  Calendar,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard({ setActiveTab, setSelectedRaceId }) {
  const { user, logout, bookmarks, races, toggleBookmark, notifications, markNotificationAsRead } = useApp();

  const [activeTabSub, setActiveTabSub] = useState('bookmarks'); // 'bookmarks', 'notifications', 'profile'
  const [savedMsg, setSavedMsg] = useState('');
  const [userName, setUserName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!user) {
    return (
      <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-lg mx-auto border border-gold/30">
        <UserIcon className="w-12 h-12 text-gold mx-auto" />
        <h2 className="text-xl font-bold text-white">Espace Membre Restreint</h2>
        <p className="text-xs text-slate-400">Veuillez vous connecter pour accéder à votre espace personnel.</p>
      </div>
    );
  }

  const bookmarkedRaces = races.filter(r => bookmarks.includes(r.id));

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setSavedMsg('Profil et préférences mis à jour avec succès.');
    setTimeout(() => setSavedMsg(''), 4000);
  };

  const handleSelectRace = (raceId) => {
    setSelectedRaceId(raceId);
    setActiveTab('pronostics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-12">

      {/* Profile Header Card */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-gold shadow-gold-glow"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white font-display">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-extrabold uppercase border border-gold/30">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{user.email} • Membre depuis {user.createdAt}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/30 text-red-300 font-bold text-xs transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 pt-6 mt-6 border-t border-racing-border overflow-x-auto">
          <button
            onClick={() => setActiveTabSub('bookmarks')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'bookmarks'
                ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                : 'bg-racing-dark text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Pronostics Favoris ({bookmarks.length})</span>
          </button>

          <button
            onClick={() => setActiveTabSub('notifications')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'notifications'
                ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                : 'bg-racing-dark text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Alertes & Notifications</span>
          </button>

          <button
            onClick={() => setActiveTabSub('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTabSub === 'profile'
                ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                : 'bg-racing-dark text-slate-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Paramètres du Profil</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Saved Bookmarks */}
      {activeTabSub === 'bookmarks' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-gold" />
            <span>Vos Pronostics et Courses Sauvegardées</span>
          </h2>

          {bookmarkedRaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedRaces.map((race) => (
                <div key={race.id} className="glass-panel p-5 rounded-2xl border border-racing-border flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold">{race.code} - {race.hippodrome}</span>
                    <button
                      onClick={() => toggleBookmark(race.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                      title="Retirer des favoris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-base">{race.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">{race.discipline} • {race.distance}</p>
                  </div>

                  <div className="pt-3 border-t border-racing-border flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-semibold">Cote: {race.runners?.[0]?.odds}</span>
                    <button
                      onClick={() => handleSelectRace(race.id)}
                      className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
                    >
                      <span>Voir la fiche</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-sm space-y-2">
              <p>Vous n'avez aucun pronostic sauvegardé pour le moment.</p>
              <button
                onClick={() => setActiveTab('pronostics')}
                className="text-xs font-bold text-gold hover:underline"
              >
                Parcourir les pronostics du jour
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Notifications Feed */}
      {activeTabSub === 'notifications' && (
        <div className="glass-panel p-6 rounded-3xl border border-gold/30 space-y-4">
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Bell className="w-5 h-5 text-gold" />
            <span>Centre de Notifications</span>
          </h2>

          <div className="divide-y divide-racing-border">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationAsRead(notif.id)}
                className={`py-4 cursor-pointer flex items-start justify-between gap-4 transition-colors ${notif.read ? 'opacity-60' : ''}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold">{notif.title}</span>
                    {!notif.read && <span className="w-2 h-2 rounded-full bg-gold animate-ping" />}
                  </div>
                  <p className="text-xs text-slate-300">{notif.message}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">{notif.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Profile Settings Form */}
      {activeTabSub === 'profile' && (
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 space-y-6 max-w-xl">
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Key className="w-5 h-5 text-gold" />
            <span>Gestion du Profil & Sécurité</span>
          </h2>

          {savedMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{savedMsg}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Nom d'affichage</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Mot de passe actuel</label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-racing-dark border border-racing-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-xs shadow-gold-glow hover:brightness-110 transition-all"
            >
              Enregistrer les Modifications
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
