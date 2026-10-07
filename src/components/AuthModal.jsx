import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Globe,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login } = useApp();

  const [nom, setNom] = useState('');
  const [pays, setPays] = useState('Bénin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'forgot') {
      if (!email) {
        setErrorMsg('Veuillez saisir votre adresse email.');
        return;
      }
      setResetSent(true);
      return;
    }

    if (!email || !password) {
      setErrorMsg('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const res = await login(email, password, nom, pays);
    if (!res.success) {
      setErrorMsg(res.error || 'Erreur lors de la connexion.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">

      <div className="relative w-full max-w-md bg-[var(--bg-card)] border border-gold/40 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">

        {/* Glow Decor */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-[var(--text-muted)] hover:text-[var(--text-main)] p-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gold-gradient-bg text-racing-dark font-bold shadow-gold-glow mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-[var(--text-main)] font-display">
            {authMode === 'login' && 'Connexion Membre'}
            {authMode === 'signup' && 'Créer un Compte TurfElite'}
            {authMode === 'forgot' && 'Réinitialiser le Mot de Passe'}
          </h3>
          <p className="text-xs text-[var(--text-muted)]">
            {authMode === 'forgot' ? 'Saisissez votre email pour recevoir le lien' : 'Accédez aux favoris gratuits et à votre espace VIP'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Reset Confirmation */}
        {resetSent ? (
          <div className="text-center space-y-4 py-4">
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>Un email de réinitialisation vous a été envoyé. Vérifiez votre boîte de réception.</span>
            </div>
            <button
              onClick={() => { setResetSent(false); setAuthMode('login'); }}
              className="w-full py-3 rounded-xl bg-[var(--bg-primary)] border border-gold/30 text-gold text-xs font-bold"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {authMode === 'signup' && (
              <>
                <div>
                  <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Nom / Prénom</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-main)] placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Pays</label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={pays}
                      onChange={(e) => setPays(e.target.value)}
                      className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-main)] focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="Bénin">🇧🇯 Bénin</option>
                      <option value="Burkina Faso">🇧🇫 Burkina Faso</option>
                      <option value="Cameroun">🇨🇲 Cameroun</option>
                      <option value="Côte d'Ivoire">🇨🇮 Côte d'Ivoire</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Gabon">🇬🇦 Gabon</option>
                      <option value="Sénégal">🇸🇳 Sénégal</option>
                      <option value="Togo">🇹🇬 Togo</option>
                      <option value="Autre">🌍 Autre pays</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-[var(--text-main)] block mb-1">Adresse Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-main)] placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Field (if not forgot mode) */}
            {authMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[var(--text-main)]">Mot de Passe</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-gold hover:underline font-semibold"
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[var(--input-bg)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-xs text-[var(--text-main)] placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Main Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-racing-dark font-extrabold text-sm shadow-gold-glow hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <span>
                {authMode === 'login' && 'Se Connecter'}
                {authMode === 'signup' && 'Créer Mon Compte'}
                {authMode === 'forgot' && 'Envoyer le Lien de Réinitialisation'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Toggle Mode Footer */}
            <div className="text-center pt-2 text-xs text-[var(--text-muted)]">
              {authMode === 'login' ? (
                <p>
                  Pas encore de compte ?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-gold font-bold hover:underline"
                  >
                    S'inscrire gratuitement
                  </button>
                </p>
              ) : (
                <p>
                  Déjà membre ?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-gold font-bold hover:underline"
                  >
                    Se connecter
                  </button>
                </p>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
