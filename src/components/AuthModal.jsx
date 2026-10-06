import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, loginWithGoogle } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'forgot') {
      setResetSent(true);
      return;
    }

    if (!email || !password) {
      setErrorMsg('Veuillez remplir tous les champs.');
      return;
    }

    login(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">

      <div className="relative w-full max-w-md bg-racing-card border border-gold/40 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">

        {/* Glow Decor */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-racing-dark border border-racing-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl gold-gradient-bg text-racing-dark font-bold shadow-gold-glow mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black text-white font-display">
            {authMode === 'login' && 'Connexion Membre'}
            {authMode === 'signup' && 'Créer un Compte TurfElite'}
            {authMode === 'forgot' && 'Réinitialiser le Mot de Passe'}
          </h3>
          <p className="text-xs text-slate-400">
            {authMode === 'forgot' ? 'Saisissez votre email pour recevoir le lien' : 'Accédez aux pronostics exclusifs et vos favoris'}
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
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs">
              Un email de réinitialisation vous a été envoyé. Vérifiez votre boîte de réception.
            </div>
            <button
              onClick={() => { setResetSent(false); setAuthMode('login'); }}
              className="w-full py-3 rounded-xl bg-racing-dark border border-gold/30 text-gold text-xs font-bold"
            >
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Adresse Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="votre.email@exemple.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-racing-dark border border-racing-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password Field (if not forgot mode) */}
            {authMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">Mot de Passe</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-[11px] text-gold hover:underline font-semibold"
                    >
                      Oublié ?
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
                    className="w-full bg-racing-dark border border-racing-border rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold transition-colors"
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
                {authMode === 'forgot' && 'Envoyer le Lien'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Social Google Login Button (1-Click) */}
            {authMode !== 'forgot' && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-racing-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-racing-card text-slate-400 font-semibold">Ou continuer avec</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={loginWithGoogle}
                  className="w-full py-3 rounded-xl bg-racing-dark hover:bg-racing-dark/80 border border-racing-border text-white text-xs font-bold transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.2 9 5 12 5z"/>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.2-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
                  </svg>
                  <span>Connexion 1-Clic Google</span>
                </button>
              </>
            )}

            {/* Toggle Mode Footer */}
            <div className="text-center pt-2 text-xs text-slate-400">
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
