import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Plus,
  Edit3,
  Trash2,
  Check,
  Settings,
  Users,
  Newspaper,
  Calendar,
  Award,
  X,
  Save,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  KeyRound,
  Copy,
  Clock,
  MessageSquare,
  FileText,
  Star,
  Eye,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DEFAULT_CONFIG from '../config';

export default function Admin() {
  const {
    user,
    races,
    news,
    settings,
    users,
    saveRace,
    deleteRace,
    updateOfficialResult,
    updateSettings,
    toggleUserRole
  } = useApp();

  const [activeTab, setActiveTab] = useState('codes'); // 'codes', 'results', 'picks', 'races', 'users', 'testimonials', 'settings', 'logs'
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Access Codes Manager State
  const [accessCodes, setAccessCodes] = useState(() => {
    return JSON.parse(localStorage.getItem('turfelite_access_codes') || '[]');
  });
  const [newCodePlan, setNewCodePlan] = useState('monthly');
  const [newCodeUsage, setNewCodeUsage] = useState('single');
  const [generatedPlaintextCode, setGeneratedPlaintextCode] = useState('');

  // 2. VIP Requests State
  const [vipRequests, setVipRequests] = useState(() => {
    return JSON.parse(localStorage.getItem('turfelite_vip_requests') || '[]');
  });

  // 3. Contact Messages State
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem('turfelite_messages') || '[]');
  });

  // 4. Testimonials State
  const [testimonialsList, setTestimonialsList] = useState(() => {
    return JSON.parse(localStorage.getItem('turfelite_testimonials') || '[]');
  });

  // 5. Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  useEffect(() => {
    localStorage.setItem('turfelite_access_codes', JSON.stringify(accessCodes));
  }, [accessCodes]);

  useEffect(() => {
    localStorage.setItem('turfelite_testimonials', JSON.stringify(testimonialsList));
  }, [testimonialsList]);

  if (!user || (user.role !== 'admin' && user.role !== 'ADMIN')) {
    return (
      <div className="glass-panel p-10 rounded-3xl text-center space-y-4 max-w-lg mx-auto border border-red-500/40 my-12">
        <ShieldAlert className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-[var(--text-main)]">Accès Refusé (Espace Administrateur)</h2>
        <p className="text-xs text-[var(--text-muted)]">
          Vous devez disposer du rôle d'administrateur pour accéder au Back-Office.
        </p>
      </div>
    );
  }

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Generate Unique Random VIP Code
  const handleGenerateCode = () => {
    const randomCode = 'TURF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newEntry = {
      id: `code-${Date.now()}`,
      code: randomCode, // Shown ONLY ONCE during creation
      plan: newCodePlan,
      usage: newCodeUsage,
      active: true,
      used_count: 0,
      created_at: new Date().toISOString()
    };

    setAccessCodes(prev => [newEntry, ...prev]);
    setGeneratedPlaintextCode(randomCode);
    showNotification(`Code VIP généré avec succès !`);
  };

  const handleCopyWhatsappMsg = (codeStr, planStr) => {
    const text = `Bonjour, voici votre code d'accès VIP TURFELITE-PMU (${planStr}) : ${codeStr}\nSaisissez-le sur la page Pronostics pour déverrouiller vos contenus.`;
    navigator.clipboard.writeText(text);
    showNotification('Message WhatsApp copié dans le presse-papier !');
  };

  const handleRemoveDemoBadge = (id) => {
    setTestimonialsList(prev => prev.map(t => t.id === id ? { ...t, is_demo: false } : t));
    showNotification('Badge "Exemple" retiré de l\'avis.');
  };

  return (
    <div className="space-y-8 pb-16">

      {/* Admin Top Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/40 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gold-gradient-bg text-racing-dark flex items-center justify-center font-bold shadow-gold-glow">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-[var(--text-main)] font-display">Back-Office Administrateur</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase border border-emerald-500/30">
                  En ligne
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Publication immédiate en direct vers le côté utilisateur, sans modification de code.
              </p>
            </div>
          </div>
        </div>

        {/* Global Notification */}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Module Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-color)] overflow-x-auto">
          {[
            { id: 'codes', label: 'Codes d\'Accès VIP', icon: KeyRound },
            { id: 'results', label: 'Résultats', icon: Award },
            { id: 'races', label: 'Courses & Replays', icon: Calendar },
            { id: 'users', label: 'Membres & VIP', icon: Users },
            { id: 'testimonials', label: 'Avis Clientèle', icon: Star },
            { id: 'settings', label: 'Paramètres Site', icon: Settings },
            { id: 'logs', label: 'Messages & Journal', icon: FileText }
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
                    : 'bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Codes d'accès Module */}
      {activeTab === 'codes' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-gold/40 space-y-4">
            <h2 className="text-lg font-bold text-[var(--text-main)] font-display flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-gold" />
              Générer un Nouveau Code d'Accès VIP
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-[var(--text-main)] block mb-1">Formule / Plan</label>
                <select
                  value={newCodePlan}
                  onChange={(e) => setNewCodePlan(e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-[var(--text-main)]"
                >
                  <option value="weekly">Hebdomadaire (7 jours)</option>
                  <option value="monthly">Mensuel (30 jours)</option>
                  <option value="yearly">Annuel (365 jours)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[var(--text-main)] block mb-1">Type d'Usage</label>
                <select
                  value={newCodeUsage}
                  onChange={(e) => setNewCodeUsage(e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-[var(--text-main)]"
                >
                  <option value="single">Usage Unique (Recommandé)</option>
                  <option value="multi">Usage Multiple</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateCode}
                  className="w-full py-2.5 rounded-xl gold-gradient-bg text-racing-dark font-black text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Générer le Code Unique
                </button>
              </div>
            </div>

            {/* Display code ONCE upon creation */}
            {generatedPlaintextCode && (
              <div className="p-4 rounded-2xl bg-gold/15 border-2 border-gold text-center space-y-2 animate-in fade-in">
                <span className="text-xs font-bold text-gold uppercase">⚠️ Code en Clair (Affiché UNE Seule Fois) :</span>
                <div className="text-2xl font-mono font-black text-[var(--text-main)] tracking-widest">
                  {generatedPlaintextCode}
                </div>
                <button
                  onClick={() => handleCopyWhatsappMsg(generatedPlaintextCode, newCodePlan)}
                  className="px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-xs inline-flex items-center gap-2 shadow-md"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copier le message d'envoi WhatsApp</span>
                </button>
              </div>
            )}
          </div>

          {/* Existing Codes Table */}
          <div className="glass-panel rounded-3xl border border-[var(--border-color)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
              <h3 className="font-bold text-sm text-[var(--text-main)]">Registre des Codes Générés ({accessCodes.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--bg-primary)] text-gold font-bold uppercase border-b border-[var(--border-color)]">
                  <tr>
                    <th className="py-3 px-4">Code / ID</th>
                    <th className="py-3 px-4">Plan</th>
                    <th className="py-3 px-4">Usage</th>
                    <th className="py-3 px-4">Utilisations</th>
                    <th className="py-3 px-4">Statut</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-main)]">
                  {accessCodes.map(c => (
                    <tr key={c.id}>
                      <td className="py-3 px-4 font-mono font-bold">{c.code}</td>
                      <td className="py-3 px-4 uppercase">{c.plan}</td>
                      <td className="py-3 px-4">{c.usage}</td>
                      <td className="py-3 px-4">{c.used_count} fois</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.active ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                          {c.active ? 'Actif' : 'Désactivé'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setAccessCodes(prev => prev.map(x => x.id === c.id ? { ...x, active: !x.active } : x));
                            showNotification('Statut du code mis à jour.');
                          }}
                          className="px-2.5 py-1 rounded bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-gold font-semibold"
                        >
                          {c.active ? 'Désactiver' : 'Activer'}
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

      {/* 2. Results Manager */}
      {activeTab === 'results' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-main)] font-display">Publication des Arrivées Officieuses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {races.map(race => (
              <div key={race.id} className="glass-panel p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
                <span className="text-xs font-bold text-gold">{race.code} - {race.hippodrome}</span>
                <h3 className="font-bold text-[var(--text-main)] text-base">{race.name}</h3>
                <button
                  onClick={() => {
                    const arrival = prompt("Entrez l'arrivée officielle (séparée par des tirets, ex: 3 - 1 - 6 - 9 - 4) :", race.officialArrival?.join(' - ') || '3 - 1 - 6 - 9 - 4');
                    if (arrival) {
                      updateOfficialResult(race.id, arrival.split('-').map(s => s.trim()));
                      showNotification('Arrivée officielle mise à jour en direct !');
                    }
                  }}
                  className="w-full py-2 rounded-xl gold-gradient-bg text-racing-dark font-bold text-xs"
                >
                  Publier Arrivée Officielle
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Testimonials & Demo Badges */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-main)] font-display">Gestion des Avis Clientèle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {testimonialsList.map(item => (
              <div key={item.id} className="glass-panel p-4 rounded-2xl border border-[var(--border-color)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--text-main)]">{item.name} ({item.country})</span>
                  {item.is_demo && (
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">Exemple</span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-muted)]">« {item.comment} »</p>
                {item.is_demo && (
                  <button
                    onClick={() => handleRemoveDemoBadge(item.id)}
                    className="px-3 py-1 rounded bg-gold/20 text-gold text-xs font-bold"
                  >
                    Retirer le badge Exemple
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Settings Form */}
      {activeTab === 'settings' && (
        <div className="glass-panel p-6 rounded-3xl border border-gold/40 max-w-xl space-y-4">
          <h2 className="text-lg font-bold text-[var(--text-main)] font-display">Paramètres de la Plateforme</h2>
          <form onSubmit={(e) => { e.preventDefault(); updateSettings(settingsForm); showNotification('Paramètres sauvegardés.'); }} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-[var(--text-main)] block mb-1">Numéro WhatsApp</label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-[var(--text-main)]"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-xl gold-gradient-bg text-racing-dark font-black uppercase">
              Enregistrer les Modifications
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
