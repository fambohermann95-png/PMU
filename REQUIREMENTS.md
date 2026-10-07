# REQUIREMENTS CHECKLIST - TURFELITE-PMU (TURF PERFORMANCE PRO)

This document serves as the master checklist for all project requirements. Items are marked `[x]` as they are implemented and verified.

## 1. Core Architecture & Configuration
- [x] 1.1 Vite + React ES6+ + Tailwind CSS frontend architecture.
- [x] 1.2 `src/config.js` with default fallback configuration values:
  - [x] WhatsApp: `+22646553556`
  - [x] Email: `emmabrn888@gmail.com`
  - [x] FB & IG links default marked `TODO`
  - [x] VIP Subscription prices (Weekly: 25 000 FCFA, Monthly: 95 000 FCFA, Yearly: 250 000 FCFA)
  - [x] Hero headlines, slogans, prefilled WhatsApp messages.
- [x] 1.3 Hash routing / fallback compatibility for GitHub Pages.
- [x] 1.4 Supabase database schema in `supabase/migrations/` with tables: `profiles`, `access_codes`, `subscriptions`, `meetings`, `races`, `free_picks`, `vip_picks`, `results`, `testimonials`, `faq`, `site_content`, `settings`, `access_logs`, `messages`, `vip_requests`.

## 2. Security & VIP Access Rules
- [x] 2.1 Server-side code validation via SQL RPC function (`SECURITY DEFINER`, SHA-256 with server salt/pepper).
- [x] 2.2 Access codes in plaintext displayed ONCE to admin upon creation; never saved in plaintext or outputted in client JS/HTML/localStorage.
- [x] 2.3 RLS Policies on `vip_picks`: readable ONLY by authenticated users with valid non-expired/non-revoked VIP access.
- [x] 2.4 Server-side check for admin actions (RLS + SECURITY DEFINER RPCs), not merely hidden UI buttons.
- [x] 2.5 Only anon public key in frontend; `.env.example` provided and `.env` gitignored.
- [x] 2.6 Rate limiting on access code attempts (max 5 failed attempts before temporary block) logged in `access_logs`.
- [x] 2.7 XSS protection and input sanitization on all user-submitted content.

## 3. Visual Identity & UI/UX
- [x] 3.1 Dark / Light theme toggle button (☀️/🌙) in header top-left. Dark theme default with persisted user preference.
- [x] 3.2 Dynamic Hero with smooth fade transition between `harness-racing.jpg` and `galop-racing.jpg`, slow Ken Burns zoom, and dark gradient overlay.
- [x] 3.3 Gold (#D4AF37) accent color reserved for VIP badges, subscription pricing, and key call-to-actions. Green (#25D366) reserved for WhatsApp buttons.
- [x] 3.4 Responsive mobile drawer menu and fixed mobile bottom bar (`🏠 Accueil`, `🏇 Pronostics`, `🔐 Accès`, `👑 VIP`, `👤 Compte`) with `env(safe-area-inset-bottom)` padding.
- [x] 3.5 Floating WhatsApp button on bottom-right (≥ 56px, icon only, no label/badge) linking to `https://wa.me/22646553556?text=...`.
- [x] 3.6 Micro-animations (fade-in, slide-up, card hover, countdown timer) capped at 60fps with `prefers-reduced-motion` support.

## 4. Guest & Free Member Rules
- [x] 4.1 Guests (non-logged-in visitors) CANNOT see any betting numbers. Clicking discipline buttons (Quinté, Quarté, PMU, Trio) opens Auth Modal.
- [x] 4.2 Logged-in Free Members see ONLY 3 to 4 free favorites published by admin.
- [x] 4.3 Logged-in Free Members see a blurred preview card for VIP predictions with fake placeholders (`① •••• ② •••• ③ ••••`). Real VIP numbers are NEVER sent in API payloads to non-VIPs.
- [x] 4.4 Intrusive popup offering VIP membership shown once upon account creation/login.

## 5. VIP Predictions Page & Code System
- [x] 5.1 Connection required to view `/pronostics`. Non-connected users redirected to login.
- [x] 5.2 Non-VIP logged-in users see:
  - Premium header & subscription plans.
  - VIP request form (Name, Country, Plan, Phone) opening prefilled WhatsApp message and saving request to `vip_requests`.
  - Exactly ONE preview analysis marked "Exemple" (Prix Ganay - Qatar).
  - VIP Code Entry Box ("Entrer un Code d'Accès VIP").
- [x] 5.3 Instant unlock of VIP interface upon entering a valid access code without manual page reloads.
- [x] 5.4 Error feedback for code validation states: ✅ Allowed, ❌ Incorrect, ⏳ Expired, 🚫 Disabled, 🔁 Already used, ⚠️ Too many attempts.
- [x] 5.5 Unlocked VIP view features gold/black styling, daily expert picks, Chart.js statistics, performance history, and active subscription countdown.

## 6. Homepage Layout & Order
- [x] 6.1 Hero with dynamic backgrounds, slogan « Vivre autrement les pronostics avec l'ère numérique », and call-to-action buttons.
- [x] 6.2 AI Banner highlighting AI tools + expert analysis.
- [x] 6.3 Real-time countdown timer for next race (hidden if no upcoming race).
- [x] 6.4 4 Discipline buttons (Quinté, Quarté, PMU, Trio).
- [x] 6.5 Free Analysis of the Day + Free Favorites.
- [x] 6.6 Daily Official Results published by admin.
- [x] 6.7 "Why Us?" section (Analyse, Accès privé, 100% mobile, Ère numérique).
- [x] 6.8 Marketing banner "VIVRE AUTREMENT LES PRONOSTICS" + "DÉCOUVRIR TURFELITE-PMU".
- [x] 6.9 VIP Subscriptions pricing summary.
- [x] 6.10 Testimonials Swiper carousel with country flags. Initial demo items carry "Exemple" badge (`is_demo = true`).
- [x] 6.11 FAQ Accordion and Detailed "Why Us".
- [x] 6.12 Contact & Assistance section (Email + Form, WhatsApp number kept hidden from plain view in contact forms).
- [x] 6.13 Cookie Consent banner with Accept / Reject / Customize, choice persisted.

## 7. Results Page
- [x] 7.1 Filter by date, hippodrome, and discipline.
- [x] 7.2 Displays starters, finishing numbers, non-starters.
- [x] 7.3 Shows "En attente d'arrivée officielle" if unannounced. No mock results.

## 8. Admin Back-Office (/admin)
- [x] 8.1 Server-verified admin role check (`admin`).
- [x] 8.2 Access Codes Manager: generate long unique codes, plaintext shown ONCE, select plan/expiration/usage, copy WhatsApp message button.
- [x] 8.3 Results Publisher: edit starters, arrival numbers, non-runners.
- [x] 8.4 VIP & Free Picks Editor: draft / publish / schedule picks.
- [x] 8.5 Races & Meetings Editor.
- [x] 8.6 Users & Subscriptions Manager: promote/revoke/suspend users, grant/revoke VIP.
- [x] 8.7 Testimonials Editor: add/edit/delete testimonials, remove "Exemple" badge.
- [x] 8.8 Site Content & FAQ Editor.
- [x] 8.9 Settings Manager: edit WhatsApp number, email, prices, hero text.
- [x] 8.10 Messages & Access Logs Viewer.

## 9. Content Phrasing & Legal Rules
- [x] 9.1 ABSOLUTELY ZERO occurrences of prohibited terms ("100 % fiable", "100 % sûr", "95 % de chance", "garanti", "gain assuré", etc.).
- [x] 9.2 Approved responsible phrasing used instead: "Passez au niveau supérieur", "analyses d'experts + outils d'intelligence artificielle", "Pronostics fournis à titre indicatif".
- [x] 9.3 Footer text EXACT match: « © 2026 TurfElite. Tous droits réservés. Nous déclinons toute responsabilité en cas de perte. »
- [x] 9.4 Footer responsible gambling note: « Les pronostics sont des analyses et ne garantissent aucun gain. Jouez de manière responsable. »

## 10. Verification & Pre-Commit Audit
- [x] 10.1 Responsive testing from 320px to 430px and desktop, capturing Playwright screenshots.
- [x] 10.2 Security network check confirming zero VIP data in API responses to free users.
- [x] 10.3 README with complete setup, env variables, GitHub Pages & Supabase deployment, and admin SQL script.
