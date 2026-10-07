# TURFELITE-PMU (TURF PERFORMANCE PRO)

> Slogan : « Vivre autrement les pronostics avec l'ère numérique »

 TURFELITE-PMU est une plateforme d'analyses et de pronostics hippiques premium optimisée pour mobile et Android, combinant l'expertise de pronostiqueurs chevronnés et des outils d'intelligence artificielle.

---

## 🚀 Architecture & Stack Technique

- **Frontend** : React + Vite + Tailwind CSS + Lucide Icons + Hash Routing (`#/...`).
- **Backend** : Supabase (PostgreSQL, Auth, Row Level Security, Edge Functions, SQL RPC).
- **Hébergement** : GitHub Pages (compatible Hash Router & SPA fallback).

---

## 🔒 Sécurité & Validation des Codes VIP

1. **Validation Serveur** : Les codes d'accès sont vérifiés côté serveur par la fonction SQL RPC `verify_access_code` (`SECURITY DEFINER`). Aucun code ou condensat n'est exposé au frontend.
2. **Stockage Haché** : Tous les codes d'accès VIP sont stockés sous forme de condensat cryptographique SHA-256 avec sel/pepper côté serveur.
3. **Protection RLS** : Les tables `vip_picks` et `access_codes` sont protégées par Row Level Security. Un membre gratuit effectuant une requête API ne reçoit aucune donnée VIP.
4. **Limitation des Tentatives** : Blocage temporaire de 15 minutes après 5 essais consécutifs ratés, journalisé dans `access_logs`.

---

## ⚙️ Variables d'Environnement (.env.example)

Créez un fichier `.env` à la racine de votre projet :

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

*Remarque : Seule la clé publique anonyme est incluse côté client. Les clés de service backend et secrets d'API ne sont jamais exposés.*

---

## 📦 Installation & Déploiement Local

```bash
# 1. Cloner le dépôt et installer les dépendances
npm install

# 2. Lancer le serveur de développement Vite
npm run dev

# 3. Compiler la build de production
npm run build
```

---

## 👑 Promouvoir le Premier Compte Administrateur (SQL Supabase)

Pour promouvoir un utilisateur existant en Administrateur, exécutez la requête SQL suivante dans la console SQL de votre projet Supabase :

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'emmabrn888@gmail.com';
```

---

## 📜 Déclaration de Jeu Responsable & Clause Backend

- **Bandeau de Décharge** : « Les pronostics sont des analyses et ne garantissent aucun gain. Jouez de manière responsable. »
- **Information Backend** : Si Supabase Deno Edge Functions n'est pas configuré avec une clé Resend active, les formulaires de contact sont sauvegardés localement et enregistrés en base sans simulation de faux emails.

---

© 2026 TurfElite. Tous droits réservés. Nous déclinons toute responsabilité en cas de perte.
