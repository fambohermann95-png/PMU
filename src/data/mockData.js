export const INITIAL_SETTINGS = {
  whatsappNumber: "+22646553556",
  whatsappMessage: "Bonjour TURF PERFORMANCE PRO, je souhaite obtenir mon code d'accès aux pronostics VIP TURFELITE-PMU.",
  bannerText: "🚨 PRONOSTICS DISPONIBLES : PRIX DE PARIS (QUINTÉ+) - ÉLECTRODYNAMIQUE & FORMES EN BÉTON !",
  responsibleGamblingText: "Les pronostics sont des analyses et ne garantissent aucun gain. Jouez de manière responsable.",
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
    date: new Date(Date.now() + 1000 * 60 * 45).toISOString(),
    isQuinte: true,
    status: "UPCOMING",
    trackCondition: "Bon / Cendrée",
    startersCount: 16,
    image: "/images/harness-racing.jpg",
    synthesis: "Une épreuve mythique au parcours exigeant. La tenue sera décisive. Notre analyste vedette mise sur une course sélective menée à grande allure dès la mi-parcours.",
    favorites: ["5 - IDAHO SPRINGS", "12 - KINGS TROTTER", "3 - EXCELLENCE D'OR"],
    outsiders: ["8 - BARON DU CROT", "14 - QUEEN OF SPEED"],
    sureSelection: "5 - IDAHO SPRINGS (Base solide)",
    tokardOfDay: "1 - ZEUS DU MAINE",
    runners: [
      { num: 1, name: "ZEUS DU MAINE", jockey: "F. Nivard", trainer: "P. Levesque", odds: "38/1", form: "5a 8a 1a 0a", weight: "2700m" },
      { num: 2, name: "DIAMANT DU NORD", jockey: "M. Mottier", trainer: "M. Mottier", odds: "22/1", form: "3a 2a 4a 1a", weight: "2700m" },
      { num: 3, name: "EXCELLENCE D'OR", jockey: "E. Raffin", trainer: "J.M. Bazire", odds: "4.5/1", form: "1a 1a 2a 1a", weight: "2700m" },
      { num: 4, name: "TITAN DE LA CÔTE", jockey: "A. Barrier", trainer: "S. Guarato", odds: "18/1", form: "4a 5a 3a 2a", weight: "2700m" },
      { num: 5, name: "IDAHO SPRINGS", jockey: "J.M. Bazire", trainer: "J.M. Bazire", odds: "2.8/1", form: "1a 1a 1a 2a", weight: "2700m" },
      { num: 6, name: "OASIS D'ORIENT", jockey: "D. Thomain", trainer: "C. Clin", odds: "14/1", form: "2a 4a 1a 5a", weight: "2700m" },
      { num: 7, name: "LUNA ROSSA", jockey: "G. Gelormini", trainer: "A. Gocciadoro", odds: "11/1", form: "1a 3a 0a 1a", weight: "2700m" },
      { num: 8, name: "BARON DU CROT", jockey: "A. Abrivard", trainer: "L.Cl. Abrivard", odds: "15/1", form: "2a 1a 6a 3a", weight: "2700m" }
    ],
    combinations: {
      tierce: ["5", "12", "3"],
      quarte: ["5", "12", "3", "8"],
      quinte: ["5", "12", "3", "8", "14"],
      couple: ["5 - 12", "5 - 3"],
      multi: ["5", "12", "3", "8", "14"]
    }
  }
];

export const INITIAL_NEWS = [
  {
    id: "news-1",
    title: "Analyse Tactique : Comment aborder la grande piste de Vincennes en hiver",
    summary: "Découvrez les secrets de nos pronostiqueurs pour repérer les jockeys en grande forme et éviter les pièges du terrain lourd.",
    content: "Sur la grande piste de Vincennes, l'effort dans la montée est souvent décisif...",
    category: "Analyse Tactique",
    author: "Équipe TurfElite",
    date: "Aujourd'hui",
    image: "/images/galop-racing.jpg"
  }
];

export const INITIAL_MEDIA = [];
export const INITIAL_USERS = [
  {
    id: "usr-admin-1",
    email: "emmabrn888@gmail.com",
    name: "Admin TurfElite",
    role: "ADMIN",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
  }
];
