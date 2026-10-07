import React from 'react';

export default function Hero({ onNavigate, openVipModal }) {
  return (
    <div className="relative min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden rounded-3xl my-4 border border-gold/30 shadow-2xl">

      {/* Background Images Crossfade with Ken Burns Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-pulse duration-[8000ms] transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url('/images/harness-racing.jpg')` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-40 hover:opacity-10 scale-105"
          style={{ backgroundImage: `url('/images/galop-racing.jpg')` }}
        />

        {/* Dark Gradient Overlay for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a120e] via-[#0a120e]/80 to-[#0a120e]/60" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-12 sm:px-6 lg:px-8">

        {/* Community Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase mb-6 shadow-gold-glow animate-bounce">
          <span>👑</span>
          <span>TURF PERFORMANCE PRO</span>
        </div>

        {/* Brand Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-white mb-3">
          TURFELITE<span className="text-gold">-PMU</span>
        </h1>

        {/* Slogan */}
        <p className="text-xl sm:text-2xl font-semibold gold-gradient-text italic mb-4">
          « Vivre autrement les pronostics avec l'ère numérique »
        </p>

        {/* Disciplines Tagline */}
        <p className="text-xs sm:text-sm font-bold text-slate-300 tracking-wider uppercase mb-6 bg-racing-dark/60 inline-block px-4 py-2 rounded-xl border border-racing-border">
          Tiercé • Quarté • Quinté • Trio • PMU • Analyses • Pronostics VIP
        </p>

        {/* Descriptive sentence */}
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
          Des analyses pensées pour vous aider à mieux lire chaque course.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button
            onClick={() => onNavigate('pronostics')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl gold-gradient-bg text-racing-dark font-black text-sm uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <span>🔐 ACCÉDER AUX PRONOSTICS</span>
          </button>

          <a
            href="https://wa.me/22646553556?text=Bonjour%20TURF%20PERFORMANCE%20PRO%2C%20j'ai%20besoin%20d'aide%20concernant%20mon%20acc%C3%A8s%20TURFELITE-PMU."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-black text-sm uppercase tracking-wider hover:bg-[#20bd5a] shadow-emerald-glow hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <span>📲 ASSISTANCE WHATSAPP</span>
          </a>

          <button
            onClick={openVipModal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-racing-card border-2 border-gold text-gold font-black text-sm uppercase tracking-wider hover:bg-gold hover:text-racing-dark shadow-gold-glow hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            <span>👑 DEVENIR VIP</span>
          </button>
        </div>

      </div>
    </div>
  );
}
