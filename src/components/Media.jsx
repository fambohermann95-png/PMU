import React, { useState } from 'react';
import { Film, Play, Image as ImageIcon, X, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Media() {
  const { media } = useApp();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  const categories = Array.from(new Set(media.map(m => m.category)));

  const filteredMedia = media.filter(m =>
    activeCategory === 'ALL' || m.category === activeCategory
  );

  return (
    <div className="space-y-10 pb-12">

      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-3">
            <Film className="w-8 h-8 text-gold" />
            <span>Médiathèque & Replays Hippiques</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Vidéos d'analyses, replays de grands prix, galeries photos des hippodromes et reportages.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-racing-border">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === 'ALL'
                ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                : 'bg-racing-dark text-slate-400 hover:text-white'
            }`}
          >
            Tous les Médias
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'gold-gradient-bg text-racing-dark shadow-gold-glow'
                  : 'bg-racing-dark text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.type === 'video') setActiveVideoModal(item);
            }}
            className="glass-panel-hover rounded-3xl overflow-hidden border border-racing-border cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

              <div className="absolute top-3 left-3 bg-racing-dark/90 text-gold px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-gold/30">
                {item.category}
              </div>

              {item.type === 'video' ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full gold-gradient-bg text-racing-dark flex items-center justify-center shadow-gold-glow transform group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
              ) : (
                <div className="absolute top-3 right-3 p-2 rounded-full bg-racing-dark/80 text-white">
                  <ImageIcon className="w-4 h-4" />
                </div>
              )}

              {item.duration && (
                <div className="absolute bottom-3 right-3 bg-racing-dark/90 text-white text-[10px] font-mono px-2 py-0.5 rounded border border-racing-border">
                  {item.duration}
                </div>
              )}
            </div>

            <div className="p-4 bg-racing-card/60">
              <h3 className="font-bold text-white text-sm group-hover:text-gold transition-colors line-clamp-2">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-racing-card border border-gold/40 rounded-3xl p-6 shadow-2xl space-y-4">

            <div className="flex items-center justify-between border-b border-racing-border pb-3">
              <h3 className="font-bold text-white text-base font-display">{activeVideoModal.title}</h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full bg-racing-dark border border-racing-border transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-racing-border">
              <iframe
                className="w-full h-full"
                src={activeVideoModal.url}
                title={activeVideoModal.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
