import React, { useState } from 'react';
import { Newspaper, Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function News({ selectedArticleId, setSelectedArticleId }) {
  const { news } = useApp();
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = Array.from(new Set(news.map(n => n.category)));

  const filteredNews = news.filter(article =>
    activeCategory === 'ALL' || article.category === activeCategory
  );

  const articleModal = news.find(n => n.id === selectedArticleId);

  return (
    <div className="space-y-10 pb-12">

      {/* Header Banner */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-gold/30 shadow-2xl space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white font-display flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-gold" />
            <span>Actualités & Chroniques Hippiques</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Décryptages, interviews d'entraîneurs, conseils stratégiques et bruits d'écurie.
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
            Toutes les Actualités
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

      {/* News Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticleId(article.id)}
            className="glass-panel-hover rounded-3xl overflow-hidden border border-racing-border cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-racing-dark/90 text-gold px-3 py-1 rounded-full text-xs font-bold uppercase border border-gold/30">
                {article.category}
              </div>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold" /> {article.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold" /> {article.author}</span>
                </div>
                <h3 className="font-bold text-white text-lg hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-racing-border flex items-center justify-between text-xs font-bold text-gold">
                <span>Consulter l'analyse complète</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {articleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-racing-card border border-gold/40 rounded-3xl p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">

            <button
              onClick={() => setSelectedArticleId(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full bg-racing-dark border border-racing-border transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <img src={articleModal.image} alt={articleModal.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-racing-dark via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase border border-gold/30">
                  {articleModal.category}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white font-display leading-tight">{articleModal.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 border-b border-racing-border pb-4">
              <span>Publié : {articleModal.date}</span>
              <span>•</span>
              <span>Auteur : <strong className="text-white">{articleModal.author}</strong></span>
            </div>

            <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-4 font-sans">
              {articleModal.content}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
