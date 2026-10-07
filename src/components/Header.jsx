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
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Header({ activeTab, setActiveTab }) {
  const { user, logout, setAuthModalOpen, setAuthMode, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Trophy },
    { id: 'pronostics', label: 'Pronostics', icon: Calendar },
    { id: 'results', label: 'Résultats', icon: Award },
    { id: 'vip', label: 'Abonnements VIP', icon: Sparkles },
    { id: 'news', label: 'Analyses', icon: Newspaper },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact', icon: User },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Theme Switcher Button ☀️/🌙 */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Changer de thème"
              className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-gold hover:scale-105 transition-all shadow-sm"
              title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            {/* Logo Brand */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="w-10 h-10 rounded-xl gold-gradient-bg p-0.5 shadow-gold-glow flex items-center justify-center">
                <div className="w-full h-full bg-[var(--bg-primary)] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-extrabold font-display gold-gradient-text tracking-wide">TURFELITE</span>
                  <span className="text-[9px] font-bold bg-gold/20 text-gold border border-gold/40 px-1 py-0.5 rounded uppercase">PRO</span>
                </div>
                <p className="text-[9px] text-[var(--text-muted)] tracking-wider uppercase font-semibold">TURF PERFORMANCE PRO</p>
              </div>
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
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-950/40 text-gold border border-gold/30 shadow-emerald-glow'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions (Auth / Admin) */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-gold/30 hover:border-gold/60 transition-all"
                >
                  <div className="w-7 h-7 rounded-full gold-gradient-bg flex items-center justify-center font-bold text-racing-dark text-xs">
                    {user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[var(--text-main)] leading-tight">{user.nom || user.email}</p>
                    <p className="text-[10px] text-gold font-medium">{user.role === 'admin' ? 'Administrateur' : 'Mon Compte'}</p>
                  </div>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="p-2.5 rounded-xl bg-gold/10 border border-gold/40 text-gold hover:bg-gold hover:text-racing-dark font-bold transition-all text-xs flex items-center gap-1.5"
                    title="Panneau Administrateur"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span className="hidden xl:inline">Admin</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-red-950/50 hover:text-red-400 text-[var(--text-muted)] transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); }}
                  className="px-4 py-2 text-sm font-semibold text-[var(--text-main)] hover:text-gold transition-colors"
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

          {/* Mobile Drawer Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-primary)] border-b border-[var(--border-color)] px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-950/40 text-gold border border-gold/30'
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-gold' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-gold/30 text-[var(--text-main)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center font-bold text-racing-dark text-xs">
                      {user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-[var(--text-main)]">{user.nom || user.email}</p>
                      <p className="text-xs text-gold">Mon Espace Membre</p>
                    </div>
                  </div>
                </button>

                {user.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gold/10 border border-gold/40 text-gold font-bold text-sm"
                  >
                    <ShieldAlert className="w-5 h-5" />
                    <span>Back-Office Administration</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-950/40 text-red-400 font-semibold text-sm"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Se déconnecter</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => { setAuthMode('login'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl bg-[var(--bg-card)] text-[var(--text-main)] font-semibold text-sm text-center border border-[var(--border-color)]"
                >
                  Connexion
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
                  className="w-full py-2.5 rounded-xl gold-gradient-bg text-racing-dark font-bold text-sm text-center"
                >
                  S'inscrire
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
