import React from 'react';
import { Home, Calendar, Lock, Crown, User } from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab }) {
  const items = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'pronostics', label: 'Pronostics', icon: Calendar },
    { id: 'acces', label: 'Accès', icon: Lock },
    { id: 'vip', label: 'VIP', icon: Crown },
    { id: 'dashboard', label: 'Compte', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-md border-t border-[var(--border-color)] sm:hidden px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'acces' && activeTab === 'pronostics');

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'acces' || item.id === 'vip') {
                  setActiveTab('pronostics');
                } else {
                  setActiveTab(item.id);
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 min-w-[56px] min-h-[48px] rounded-xl transition-all ${
                isActive
                  ? 'text-gold font-extrabold scale-105'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-gold animate-pulse' : 'text-slate-400'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
