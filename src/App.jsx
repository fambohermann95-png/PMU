import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBottomNav from './components/MobileBottomNav';
import AuthModal from './components/AuthModal';

import Home from './components/Home';
import Predictions from './components/Predictions';
import Results from './components/Results';
import News from './components/News';
import Media from './components/Media';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';
import { LegalTerms, PrivacyPolicy, NotFound } from './components/LegalPages';

function MainLayout() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#/', '');
    return hash || 'home';
  });

  const [selectedRaceId, setSelectedRaceId] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      const route = window.location.hash.replace('#/', '');
      if (route) setActiveTab(route);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = `#/${tabId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col font-sans selection:bg-gold selection:text-racing-dark pb-safe-bottom">

      {/* Main Header with Drawer Navigation */}
      <Header activeTab={activeTab} setActiveTab={changeTab} />

      {/* Main Content Dynamic Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <Home
            setActiveTab={changeTab}
            setSelectedRaceId={setSelectedRaceId}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}

        {activeTab === 'pronostics' && (
          <Predictions
            selectedRaceId={selectedRaceId}
            setSelectedRaceId={setSelectedRaceId}
          />
        )}

        {activeTab === 'results' && (
          <Results />
        )}

        {activeTab === 'vip' && (
          <Predictions
            selectedRaceId={selectedRaceId}
            setSelectedRaceId={setSelectedRaceId}
          />
        )}

        {activeTab === 'news' && (
          <News
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
          />
        )}

        {activeTab === 'media' && (
          <Media />
        )}

        {activeTab === 'faq' && (
          <FAQ />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={changeTab}
            setSelectedRaceId={setSelectedRaceId}
          />
        )}

        {activeTab === 'admin' && (
          <Admin />
        )}

        {activeTab === 'terms' && <LegalTerms />}
        {activeTab === 'privacy' && <PrivacyPolicy />}

        {!['home', 'pronostics', 'results', 'vip', 'news', 'media', 'faq', 'dashboard', 'admin', 'terms', 'privacy'].includes(activeTab) && (
          <NotFound />
        )}
      </main>

      {/* Permanent Footer */}
      <Footer setActiveTab={changeTab} />

      {/* Fixed Mobile Bottom Navigation */}
      <MobileBottomNav activeTab={activeTab} setActiveTab={changeTab} />

      {/* Floating Interactive WhatsApp Widget */}
      <WhatsAppButton />

      {/* Authentication Modal */}
      <AuthModal />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
