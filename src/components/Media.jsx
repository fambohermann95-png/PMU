import React from 'react';
import { Youtube, Play, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export default function Media() {
  const videoList = [
    {
      id: 'vid-1',
      title: 'Analyse & Débriefing Quinté+ - Épreuve de Vincennes',
      youtubeId: 'dQw4w9WgXcQ', // Demo placeholder ID
      description: 'Débrief tactique des derniers 500 mètres et analyse des parcours des favoris.',
      date: 'Édition 2026'
    },
    {
      id: 'vid-2',
      title: 'Technique hippique : Comment mieux lire le papier et la musique',
      youtubeId: 'dQw4w9WgXcQ',
      description: 'Tutoriel complet sur la lecture des performances passées pour les courses d\'attelé.',
      date: 'Tutoriel TurfElite'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gold/30 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold border border-gold/30">
          <Youtube className="w-4 h-4 text-red-500" />
          <span>REPLAYS & ANALYSES VIDÉO</span>
        </div>
        <h1 className="text-3xl font-black text-[var(--text-main)] font-display">
          Vidéos & Analyses Complémentaires
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          Visionnez les replays et les débriefings experts de nos analystes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videoList.map((vid) => (
          <div key={vid.id} className="glass-panel rounded-3xl overflow-hidden border border-[var(--border-color)] space-y-4">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}`}
                title={vid.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold text-gold uppercase tracking-wider">{vid.date}</span>
              <h3 className="font-bold text-base text-[var(--text-main)]">{vid.title}</h3>
              <p className="text-xs text-[var(--text-muted)]">{vid.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
