import React, { useState } from 'react';
import {
  Trophy,
  Calendar,
  Award,
  Newspaper,
  Film,
  HelpCircle,
  ShieldAlert,
  User,
  LogOut,
  Menu,
  X,
  Bookmark,
  Bell,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ activeTab, setActiveTab }) {
  const { user, logout, setAuthModalOpen, setAuthMode, bookmarks, notifications, markNotificationAsRead } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Trophy },
    { id: 'pronostics', label: 'Pronostics & Courses', icon: Calendar },
    { id: 'results', label: 'Résultats & Arrivées', icon: Award },
    { id: 'news', label: 'Actualités & Analyses', icon: Newspaper },
    { id: 'media', label: 'Médiathèque', icon: Film },
    { id: 'faq', label: 'Assistance & FAQ', icon: HelpCircle },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-racing-dark/95 backdrop-blur-md border-b border-racing-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-11 h-11 rounded-xl gold-gradient-bg p-0.5 shadow-gold-glow flex items-center justify-center">
              <div className="w-full h-full bg-racing-dark rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold font-display gold-gradient-text tracking-wide">TURFELITE</span>
                <span className="text-[10px] font-bold bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.5 rounded uppercase">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Pronostics & Expertise Hippique</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-racing-green text-gold border border-gold/30 shadow-emerald-glow'
                      : 'text-slate-300 hover:text-white hover:bg-racing-card'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions (Auth, Notifications, Bookmarks) */}
          <div className="hidden sm:flex items-center gap-3">

            {/* Bookmarks Quick Link */}
            {user && (
              <button
                onClick={() => handleNavClick('dashboard')}
                className="relative p-2.5 rounded-xl bg-racing-card hover:bg-racing-cardHover border border-racing-border text-slate-300 hover:text-gold transition-colors"
                title="Vos Pronostics Favoris"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-racing-dark font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            )}

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl bg-racing-card hover:bg-racing-cardHover border border-racing-border text-slate-300 hover:text-gold transition-colors"
                title="Centre de notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-racing-card border border-gold/30 rounded-xl shadow-2xl z-50 p-4">
                  <div className="flex items-center justify-between pb-3 border-b border-racing-border">
                    <h4 className="font-bold text-white text-sm">Notifications Alertes</h4>
                    <span className="text-xs text-gold font-semibold">{notifications.length} nouvelles</span>
                  </div>
                  <div className="divide-y divide-racing-border max-h-64 overflow-y-auto my-2">
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${n.read ? 'opacity-60' : 'bg-racing-green/20 hover:bg-racing-green/40'}`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-gold">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.date}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Admin or User Section */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-racing-border">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-racing-card border border-gold/30 hover:border-gold/60 transition-all"
                >
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover border border-gold" />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                    <p className="text-[10px] text-gold font-medium">{user.role === 'ADMIN' ? 'Espace Admin' : 'Mon Compte'}</p>
                  </div>
                </button>

                {user.role === 'ADMIN' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="p-2.5 rounded-xl bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-racing-dark font-bold transition-all text-xs flex items-center gap-1.5"
                    title="Panneau Administrateur"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span className="hidden xl:inline">Back-Office</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-racing-card hover:bg-red-950/50 hover:text-red-400 text-slate-400 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-gold transition-colors"
                >
                  Connexion
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); }}
                  className="px-4 py-2 rounded-xl gold-gradient-bg text-racing-dark font-bold text-sm shadow-gold-glow hover:brightness-110 transition-all flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>S'inscrire</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {!user && (
              <button
                onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                className="px-3 py-1.5 rounded-lg bg-gold text-racing-dark font-bold text-xs"
              >
                Connexion
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-racing-card border border-racing-border text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-racing-dark/98 border-b border-racing-border px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-racing-green text-gold border border-gold/30'
                    : 'text-slate-300 hover:bg-racing-card'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {user && (
            <div className="pt-4 border-t border-racing-border space-y-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-racing-card border border-gold/30 text-white"
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gold" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-gold">Mon Espace Membre</p>
                  </div>
                </div>
                <Bookmark className="w-5 h-5 text-gold" />
              </button>

              {user.role === 'ADMIN' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/10 border border-gold/40 text-gold font-bold text-sm"
                >
                  <ShieldAlert className="w-5 h-5" />
                  <span>Tableau de Bord Administrateur</span>
                </button>
              )}

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/40 text-red-400 font-semibold text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
