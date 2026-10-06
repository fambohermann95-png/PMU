export const INITIAL_SETTINGS = {
  whatsappNumber: "+33612345678",
  whatsappMessage: "Bonjour TurfElite, je souhaite obtenir des informations sur vos pronostics hippiques.",
  bannerText: "🚨 PRONOSTICS DISPONIBLES : PRIX DE PARIS (QUINTÉ+) - ÉLECTRODYNAMIQUE & FORMES EN BÉTON !",
  responsibleGamblingText: "Pronostics fournis à titre uniquement indicatif et d'analyse. Aucun pari réel n'est enregistré sur ce site. Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09 74 75 13 13 (appel non surtaxé).",
};

export const INITIAL_RACES = [
  {
    id: "race-101",
    code: "R1C4",
    name: "Prix de Paris - Marathon Race",
    hippodrome: "Vincennes",
    discipline: "Attelé",
    distance: "4150m",
    prize: "400 000 €",
    date: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // dans 45 mins
    isQuinte: true,
    status: "UPCOMING", // UPCOMING, FINISHED, LIVE
    trackCondition: "Bon / Cendrée",
    startersCount: 16,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    synthesis: "Une épreuve mythique au parcours exigeant. La tenue sera décisive. Notre analyste vedette mise sur une course sélective menée à grande allure dès la mi-parcours.",
    favorites: ["5 - IDAHO SPRINGS", "12 - KINGS TROTTER", "3 - EXCELLENCE D'OR"],
    outsiders: ["8 - BARON DU CROT", "14 - QUEEN OF SPEED"],
    sureSelection: "5 - IDAHO SPRINGS (Placé garanti)",
    tokardOfDay: "1 - ZEUS DU MAINE",
    runners: [
      { num: 1, name: "ZEUS DU MAINE", jockey: "F. Nivard", trainer: "P. Levesque", odds: "38/1", form: "5a 8a 1a 0a", weight: "2700m" },
      { num: 2, name: "DIAMANT DU NORD", jockey: "M. Mottier", trainer: "M. Mottier", odds: "22/1", form: "3a 2a 4a 1a", weight: "2700m" },
      { num: 3, name: "EXCELLENCE D'OR", jockey: "E. Raffin", trainer: "J.M. Bazire", odds: "4.5/1", form: "1a 1a 2a 1a", weight: "2700m" },
      { num: 4, name: "TITAN DE LA CÔTE", jockey: "A. Barrier", trainer: "S. Guarato", odds: "18/1", form: "4a 5a 3a 2a", weight: "2700m" },
      { num: 5, name: "IDAHO SPRINGS", jockey: "J.M. Bazire", trainer: "J.M. Bazire", odds: "2.8/1", form: "1a 1a 1a 2a", weight: "2700m" },
      { num: 6, name: "OASIS D'ORIENT", jockey: "D. Thomain", trainer: "C. Clin", odds: "14/1", form: "2a 4a 1a 5a", weight: "2700m" },
      { num: 7, name: "LUNA ROSSA", jockey: "G. Gelormini", trainer: "A. Gocciadoro", odds: "11/1", form: "1a 3a 0a 1a", weight: "2700m" },
      { num: 8, name: "BARON DU CROT", jockey: "A. Abrivard", trainer: "L.Cl. Abrivard", odds: "15/1", form: "2a 1a 6a 3a", weight: "2700m" },
      { num: 9, name: "NEPTUNE DU CHÂTEAU", jockey: "F. Ouvrie", trainer: "S. Ernault", odds: "29/1", form: "0a 5a 8a 4a", weight: "2700m" },
      { num: 10, name: "VICTOIRE ROYAL", jockey: "P.Y. Verva", trainer: "P. Verva", odds: "42/1", form: "7a 8a 9a 0a", weight: "2700m" },
      { num: 11, name: "SOLAR WIND", jockey: "B. Goop", trainer: "B. Goop", odds: "16/1", form: "3a 1a 2a 0a", weight: "2700m" },
      { num: 12, name: "KINGS TROTTER", jockey: "Y. Lebourgeois", trainer: "S. Guarato", odds: "3.9/1", form: "2a 1a 1a 3a", weight: "2700m" },
      { num: 13, name: "FLASH DU MERLE", jockey: "F. Lagadeuc", trainer: "R. Westerink", odds: "25/1", form: "5a 6a 2a 1a", weight: "2700m" },
      { num: 14, name: "QUEEN OF SPEED", jockey: "M. Abrivard", trainer: "M. Abrivard", odds: "12/1", form: "1a 2a 3a 4a", weight: "2700m" },
      { num: 15, name: "PRINCE DU CLOS", jockey: "T. Le Beller", trainer: "T. Le Beller", odds: "33/1", form: "0a 0a 4a 5a", weight: "2700m" },
      { num: 16, name: "AMIRAL DE SARTHE", jockey: "P. Ph. Ploquin", trainer: "P. Ploquin", odds: "20/1", form: "4a 3a 1a 2a", weight: "2700m" }
    ],
    combinations: {
      tierce: ["5", "12", "3"],
      quarte: ["5", "12", "3", "8"],
      quinte: ["5", "12", "3", "8", "14"],
      couple: ["5 - 12", "5 - 3", "12 - 3"],
      multi: ["5", "12", "3", "8", "14", "7", "2"]
    }
  },
  {
    id: "race-102",
    code: "R1C1",
    name: "Prix de la Seine",
    hippodrome: "ParisLongchamp",
    discipline: "Galop",
    distance: "2000m",
    prize: "55 000 €",
    date: new Date(Date.now() + 1000 * 60 * 180).toISOString(), // dans 3h
    isQuinte: false,
    status: "UPCOMING",
    trackCondition: "Souple",
    startersCount: 10,
    image: "https://images.unsplash.com/photo-1508847154043-be5407f30a4e?q=80&w=1200&auto=format&fit=crop",
    synthesis: "Terrain très souple avantagerait les purs stayer. Le 3 Royal Crown a couru en grand progrès dernièrement.",
    favorites: ["3 - ROYAL CROWN", "7 - LORD OF THE DANCE"],
    outsiders: ["2 - SILVER ARROW"],
    sureSelection: "3 - ROYAL CROWN",
    tokardOfDay: "9 - MYSTERY SHADOW",
    runners: [
      { num: 1, name: "DUKE OF SUSSEX", jockey: "C. Soumillon", trainer: "J.C. Rouget", odds: "7.2/1", form: "2p 1p 3p", weight: "58kg" },
      { num: 2, name: "SILVER ARROW", jockey: "M. Guyon", trainer: "A. Fabre", odds: "9.5/1", form: "1p 4p 2p", weight: "57.5kg" },
      { num: 3, name: "ROYAL CROWN", jockey: "P.C. Boudot", trainer: "F. Graffard", odds: "2.5/1", form: "1p 1p 2p", weight: "57kg" },
      { num: 4, name: "GOLDEN EAGLE", jockey: "S. Pasquier", trainer: "N. Clément", odds: "15/1", form: "5p 3p 1p", weight: "56kg" },
      { num: 5, name: "EMERALD BAY", jockey: "I. Mendizabal", trainer: "P. Bary", odds: "18/1", form: "4p 6p 2p", weight: "56kg" },
      { num: 6, name: "STORMY NIGHT", jockey: "T. Bachelot", trainer: "S. Wattel", odds: "21/1", form: "0p 2p 4p", weight: "55.5kg" },
      { num: 7, name: "LORD OF THE DANCE", jockey: "M. Barzalona", trainer: "A. Fabre", odds: "3.8/1", form: "2p 2p 1p", weight: "58kg" },
      { num: 8, name: "SWEET HARMONY", jockey: "C. Demuro", trainer: "H.A. Pantall", odds: "12/1", form: "3p 1p 5p", weight: "54.5kg" },
      { num: 9, name: "MYSTERY SHADOW", jockey: "A. Pouchin", trainer: "Y. Barberot", odds: "31/1", form: "6p 0p 3p", weight: "54kg" },
      { num: 10, name: "VELVET ROSE", jockey: "G. Mosse", trainer: "M. Delcher", odds: "26/1", form: "4p 5p 0p", weight: "54kg" }
    ],
    combinations: {
      tierce: ["3", "7", "2"],
      quarte: ["3", "7", "2", "1"],
      quinte: ["3", "7", "2", "1", "4"],
      couple: ["3 - 7", "3 - 2"],
      multi: ["3", "7", "2", "1", "4", "8"]
    }
  },
  {
    id: "race-100",
    code: "R1C3",
    name: "Grand Critérium de Cagnes",
    hippodrome: "Cagnes-sur-Mer",
    discipline: "Attelé",
    distance: "2925m",
    prize: "90 000 €",
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // Il y a 2h
    isQuinte: true,
    status: "FINISHED",
    trackCondition: "Bon",
    startersCount: 14,
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    synthesis: "Une arrivée spectaculaire. Le favori s'est imposé d'une tête après une ligne droite palpitante.",
    officialArrival: ["7", "12", "3", "9", "2"],
    nonStarters: ["5"],
    favorites: ["7 - KING DE MAYNE", "12 - BELLA VITA"],
    outsiders: ["3 - STAR BUCK"],
    sureSelection: "7 - KING DE MAYNE",
    tokardOfDay: "9 - FLASH D'OR",
    runners: [
      { num: 1, name: "ALEXIS TROT", jockey: "F. Jamard", trainer: "F. Jamard", odds: "45/1", form: "0a 9a", weight: "2925m" },
      { num: 2, name: "CÉSAR D'HERMES", jockey: "M. Izzo", trainer: "M. Izzo", odds: "19/1", form: "5a 2a", weight: "2925m" },
      { num: 3, name: "STAR BUCK", jockey: "S. Cingland", trainer: "S. Cingland", odds: "8.5/1", form: "3a 1a", weight: "2925m" },
      { num: 4, name: "TORNADO D'ESTRUVAL", jockey: "J.Ch. Sorel", trainer: "J. Sorel", odds: "32/1", form: "6a 4a", weight: "2925m" },
      { num: 5, name: "DIABLO DU VERGER", jockey: "NON PARTANT", trainer: "R. Mourice", odds: "NP", form: "NP", weight: "2925m" },
      { num: 6, name: "HERMES CORNER", jockey: "N. Ensch", trainer: "N. Ensch", odds: "14/1", form: "2a 3a", weight: "2925m" },
      { num: 7, name: "KING DE MAYNE", jockey: "R. Mourice", trainer: "R. Mourice", odds: "2.1/1", form: "1a 1a", weight: "2925m" },
      { num: 8, name: "GABRIELLA DU PONT", jockey: "A. FantAUZZI", trainer: "A. Fantauzzi", odds: "28/1", form: "8a 7a", weight: "2925m" },
      { num: 9, name: "FLASH D'OR", jockey: "D. Bekaert", trainer: "D. Bekaert", odds: "24/1", form: "4a 1a", weight: "2925m" },
      { num: 10, name: "JOYEUX DU LANDIER", jockey: "G. Junod", trainer: "G. Junod", odds: "50/1", form: "0a 0a", weight: "2925m" },
      { num: 11, name: "KENTUCKY EXPRESS", jockey: "K. Thonnerieux", trainer: "K. Thonnerieux", odds: "17/1", form: "3a 5a", weight: "2925m" },
      { num: 12, name: "BELLA VITA", jockey: "J.Ch. Feron", trainer: "J. Feron", odds: "4.2/1", form: "1a 2a", weight: "2925m" }
    ],
    combinations: {
      tierce: ["7", "12", "3"],
      quarte: ["7", "12", "3", "9"],
      quinte: ["7", "12", "3", "9", "2"],
      couple: ["7 - 12", "7 - 3"],
      multi: ["7", "12", "3", "9", "2", "6"]
    }
  }
];

export const INITIAL_NEWS = [
  {
    id: "news-1",
    title: "Prix de Paris 2025 : Décryptage des forces en présence et de l'état de la piste",
    category: "Analyses",
    date: "Aujourd'hui à 09:30",
    author: "Marc de la Riva - Expert Turf",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    summary: "Le Prix de Paris reste le grand marathon incontournable de Vincennes. Analyse complète des 16 engagés et de leurs tactiques de course.",
    content: `Le Prix de Paris réclame une résistance hors du commun avec sa distance de 4150 mètres. Les entraîneurs adaptent les entrainements depuis des semaines pour cette échéance.

    Nos repérages du matin confirment la grande forme d'Idaho Springs (5), impressionnant sur la grande piste de Vincennes lors des derniers heats de chauffe. Sa capacité à suivre tous les rythmes sans puiser dans ses réserves en fait le favori logique de ce Quinté+.

    Attention toutefois à Kings Trotter (12) qui sera pieds nus pour la première fois cette saison. Son entourage affiche une confiance sans faille.`
  },
  {
    id: "news-2",
    title: "Méthode Turf : Comment exploiter au mieux la musique des chevaux ?",
    category: "Conseils & Stratégie",
    date: "Hier à 16:45",
    author: "Sophie Laurent - Statis'Turf",
    image: "https://images.unsplash.com/photo-1508847154043-be5407f30a4e?q=80&w=1200&auto=format&fit=crop",
    summary: "Comprendre les codes de la musique (1a, 2p, Da) est la première étape pour repérer les vrais tuyaux et éliminer les faux favoris.",
    content: `Pour devenir un turfiste avisé, la lecture fine de la 'musique' (l'historique des résultats) est primordiale.

    - "a" désigne l'Attelé
    - "p" désigne le Plat / Galop
    - "m" désigne le Monté
    - "h" désigne les Haies
    - "Da" ou "Dai" indique une disqualification pour allures irrégulières.

    Un cheval affichant '1a Da 1a 1a' montre un potentiel victorieux immense malgré une saute de concentration ponctuelle.`
  }
];

export const INITIAL_MEDIA = [
  {
    id: "media-1",
    title: "Replay & Débrief : Quinté+ du Critérium de Cagnes",
    type: "video",
    category: "Grand Prix",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Embed URL placeholder
    thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop",
    duration: "08:45"
  },
  {
    id: "media-2",
    title: "Immersion aux Écuries de Grosbois avec Jean-Michel Bazire",
    type: "video",
    category: "Analyses",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
    duration: "12:20"
  },
  {
    id: "media-3",
    title: "Hippodrome de ParisLongchamp - Ambiance des Grands Prix",
    type: "photo",
    category: "Hippodromes",
    thumbnail: "https://images.unsplash.com/photo-1508847154043-be5407f30a4e?q=80&w=800&auto=format&fit=crop"
  }
];

export const INITIAL_USERS = [
  {
    id: "usr-admin",
    email: "admin@turfelite.fr",
    name: "Alexandre V. (Lead Pronostiqueur)",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    createdAt: "2024-01-15"
  },
  {
    id: "usr-101",
    email: "membre@gmail.com",
    name: "Jean Dupont",
    role: "USER",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    createdAt: "2024-02-01"
  }
];

export const FAQ_ITEMS = [
  {
    question: "TurfElite est-il un site de pari en ligne ?",
    answer: "Non. TurfElite est une plateforme 100% d'information, d'analyse sportive et de pronostics hippiques. Aucun système de pari réel, de dépôt ou de retrait d'argent n'est proposé sur le site. Les pronostics sont donnés à titre strictement indicatif."
  },
  {
    question: "Comment sont établis vos pronostics hippiques ?",
    answer: "Nos pronostics sont rédigés par une équipe d'experts hippiques forts de plus de 15 ans d'expérience. Nous croisons les données statistiques, la forme des drivers/jockeys, l'état de la piste, la météo et les bruits d'écurie."
  },
  {
    question: "À quelle heure sont publiés les pronostics Quinté+ ?",
    answer: "Le pronostic Quinté+ de la course du lendemain est publié tous les soirs dès 19h00 et réactualisé le matin même à 09h00 selon les dernières infos d'écurie et les éventuels non-partants."
  },
  {
    question: "Comment recevoir les alertes WhatsApp de dernière minute ?",
    answer: "Vous pouvez cliquer sur le bouton flottant WhatsApp en bas à droite de votre écran ou contacter directement notre service abonné pour recevoir les 'Tuyaux de dernière minute' directement sur votre smartphone."
  }
];
