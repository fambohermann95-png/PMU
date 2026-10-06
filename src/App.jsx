import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import LegalBanner from './components/LegalBanner';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AuthModal from './components/AuthModal';

import Home from './components/Home';
import Predictions from './components/Predictions';
import Results from './components/Results';
import News from './components/News';
import Media from './components/Media';
import FAQ from './components/FAQ';
import Dashboard from './components/Dashboard';
import Admin from './components/Admin';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRaceId, setSelectedRaceId] = useState(null);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  return (
    <div className="min-h-screen bg-racing-dark text-slate-100 flex flex-col font-sans selection:bg-gold selection:text-racing-dark">

      {/* Permanent Responsible Gambling Disclaimer Banner */}
      <LegalBanner />

      {/* Main Header with Drawer Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Dynamic Views */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
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
            setActiveTab={setActiveTab}
            setSelectedRaceId={setSelectedRaceId}
          />
        )}

        {activeTab === 'admin' && (
          <Admin />
        )}
      </main>

      {/* Permanent Footer */}
      <Footer setActiveTab={setActiveTab} />

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
