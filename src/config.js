// Config source for TurfElite PMU PRO
// Editable by admin in database `settings` table, which takes priority when populated.

export const DEFAULT_CONFIG = {
  appName: "TURFELITE-PMU",
  communityName: "TURF PERFORMANCE PRO",
  slogan: "Vivre autrement les pronostics avec l'ère numérique",
  heroSubtitle: "Tiercé • Quarté • Quinté • Trio • PMU • Analyses • Pronostics VIP",
  heroDescription: "Des analyses pensées pour vous aider à mieux lire chaque course.",
  aiBannerText: "Nos analyses combinent l'expertise de pronostiqueurs et des outils d'intelligence artificielle pour mieux repérer les courses à fort potentiel.",

  // Contact details
  whatsappNumber: "+22646553556",
  rawWhatsappNumber: "22646553556",
  contactEmail: "emmabrn888@gmail.com",
  facebookUrl: "https://facebook.com/TODO",
  instagramUrl: "https://instagram.com/TODO",

  // Pricing (in FCFA)
  pricing: {
    weekly: {
      id: "weekly",
      name: "Hebdomadaire",
      price: 25000,
      formattedPrice: "25 000 FCFA",
      period: "7 jours",
      popular: false,
    },
    monthly: {
      id: "monthly",
      name: "Mensuel",
      price: 95000,
      formattedPrice: "95 000 FCFA",
      period: "30 jours",
      popular: false,
    },
    yearly: {
      id: "yearly",
      name: "Annuel",
      price: 250000,
      formattedPrice: "250 000 FCFA / AN",
      period: "365 jours",
      popular: true,
      badge: "⭐ MEILLEURE OFFRE",
    },
  },

  // Prefilled WhatsApp messages
  whatsappMessages: {
    requestCode: "Bonjour TURF PERFORMANCE PRO, je souhaite obtenir mon code d'accès aux pronostics VIP TURFELITE-PMU.",
    assistance: "Bonjour, j'ai besoin d'aide concernant mon accès TURFELITE-PMU.",
    subscription: (planName, userName = "", userCountry = "") => {
      let text = `Bonjour TURF PERFORMANCE PRO, je souhaite m'abonner au plan VIP ${planName} TURFELITE-PMU.`;
      if (userName) text += `\nNom: ${userName}`;
      if (userCountry) text += `\nPays: ${userCountry}`;
      return text;
    }
  },

  // Legal footer disclaimer
  footerCopyright: "© 2026 TurfElite. Tous droits réservés. Nous déclinons toute responsabilité en cas de perte.",
  responsibleGamblingNote: "Les pronostics sont des analyses et ne garantissent aucun gain. Jouez de manière responsable.",

  // Approved slogans and marketing copy
  marketingCopy: {
    tagline1: "Passez au niveau supérieur : analyses d'experts + outils d'intelligence artificielle.",
    tagline2: "Accédez à tous les pronostics complets et aux analyses détaillées.",
    tagline3: "Les favoris gratuits, c'est le début. Le VIP, c'est l'analyse complète.",
    tagline4: "Un accompagnement premium pour mieux lire chaque course.",
    vipCardHeader: "Analyses expertes complètes, chaque jour."
  }
};

export default DEFAULT_CONFIG;
