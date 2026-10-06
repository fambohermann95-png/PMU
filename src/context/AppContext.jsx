import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_RACES,
  INITIAL_NEWS,
  INITIAL_MEDIA,
  INITIAL_SETTINGS,
  INITIAL_USERS
} from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Application Data States
  const [races, setRaces] = useState(() => {
    const saved = localStorage.getItem('turfelite_races');
    return saved ? JSON.parse(saved) : INITIAL_RACES;
  });

  const [news, setNews] = useState(() => {
    const saved = localStorage.getItem('turfelite_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [media, setMedia] = useState(() => {
    const saved = localStorage.getItem('turfelite_media');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA;
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('turfelite_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('turfelite_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Current Auth User
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('turfelite_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // User Bookmarks (array of race IDs)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('turfelite_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // In-app Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Pronostic Quinté+ Disponible !',
      message: 'Le Prix de Paris (R1C4) est en ligne. Découvrez le tuyau de l\'expert.',
      date: 'Il y a 10 min',
      read: false
    },
    {
      id: 'notif-2',
      title: 'Non-Partant Signalé',
      message: 'Le N°5 Diablo du Verger est non-partant dans la R1C3.',
      date: 'Il y a 1 heure',
      read: true
    }
  ]);

  // Auth & UI Modal States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('turfelite_races', JSON.stringify(races));
  }, [races]);

  useEffect(() => {
    localStorage.setItem('turfelite_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('turfelite_media', JSON.stringify(media));
  }, [media]);

  useEffect(() => {
    localStorage.setItem('turfelite_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('turfelite_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('turfelite_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('turfelite_current_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('turfelite_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Auth Actions
  const login = (email, password) => {
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      setAuthModalOpen(false);
      return { success: true };
    }
    // Default fallback demo login
    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role: email.toLowerCase().includes('admin') ? 'ADMIN' : 'USER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setUsers(prev => [...prev, newUser]);
    setAuthModalOpen(false);
    return { success: true };
  };

  const loginWithGoogle = () => {
    const googleUser = {
      id: `usr-google-${Date.now()}`,
      email: 'alex.turf.google@gmail.com',
      name: 'Alex Google User',
      role: 'USER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(googleUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleBookmark = (raceId) => {
    setBookmarks(prev =>
      prev.includes(raceId) ? prev.filter(id => id !== raceId) : [...prev, raceId]
    );
  };

  const markNotificationAsRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notifId ? { ...n, read: true } : n)
    );
  };

  // CRUD Actions for Admin
  const saveRace = (raceData) => {
    setRaces(prev => {
      const exists = prev.some(r => r.id === raceData.id);
      if (exists) {
        return prev.map(r => r.id === raceData.id ? raceData : r);
      }
      return [raceData, ...prev];
    });
  };

  const deleteRace = (raceId) => {
    setRaces(prev => prev.filter(r => r.id !== raceId));
  };

  const updateOfficialResult = (raceId, officialArrival, nonStarters = []) => {
    setRaces(prev => prev.map(race => {
      if (race.id === raceId) {
        return {
          ...race,
          status: 'FINISHED',
          officialArrival,
          nonStarters
        };
      }
      return race;
    }));
  };

  const saveNews = (newsData) => {
    setNews(prev => {
      const exists = prev.some(n => n.id === newsData.id);
      if (exists) {
        return prev.map(n => n.id === newsData.id ? newsData : n);
      }
      return [newsData, ...prev];
    });
  };

  const deleteNews = (newsId) => {
    setNews(prev => prev.filter(n => n.id !== newsId));
  };

  const saveMedia = (mediaData) => {
    setMedia(prev => {
      const exists = prev.some(m => m.id === mediaData.id);
      if (exists) {
        return prev.map(m => m.id === mediaData.id ? mediaData : m);
      }
      return [mediaData, ...prev];
    });
  };

  const deleteMedia = (mediaId) => {
    setMedia(prev => prev.filter(m => m.id !== mediaId));
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleUserRole = (userId) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, role: u.role === 'ADMIN' ? 'USER' : 'ADMIN' };
      }
      return u;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        races,
        news,
        media,
        settings,
        users,
        user,
        bookmarks,
        notifications,
        authModalOpen,
        authMode,
        setAuthModalOpen,
        setAuthMode,
        login,
        loginWithGoogle,
        logout,
        toggleBookmark,
        markNotificationAsRead,
        saveRace,
        deleteRace,
        updateOfficialResult,
        saveNews,
        deleteNews,
        saveMedia,
        deleteMedia,
        updateSettings,
        toggleUserRole
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
