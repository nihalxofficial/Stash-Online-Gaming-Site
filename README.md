<div align="center">

# 🎮 Stash — Client

### *Your Games. Your Vault. Your Stash.*

**The frontend for Stash — a full-stack game discovery & downloading platform.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-2ea44f?style=for-the-badge)](https://stash-pied-chi.vercel.app)
[![Server Repo](https://img.shields.io/badge/Server-Repository-blue?style=for-the-badge&logo=github)](https://github.com/nihalxofficial/Stash-Server)

</div>

<!-- 📸 Add a banner screenshot or GIF of the app here -->

---

## 📑 Table of Contents

- [About](#-about)
- [Project Overview](#-project-overview)
  - [Objective](#objective)
  - [Target Audience](#target-audience)
  - [Deployments](#deployments)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Notes on Auth Architecture](#-notes-on-auth-architecture)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 📖 About

Stash's client is a Next.js application responsible for the entire user-facing experience — browsing and searching games, authentication (including Google social login), an admin dashboard for deploying new game listings, and the download flow itself.

Authentication lives entirely on this side of the stack: **better-auth** issues sessions and signs JWTs here, which are then sent to a completely separate Express backend for verification on every protected request. The client never assumes the backend trusts it implicitly — every write operation carries a signed token that the backend independently validates.

**What makes it different from a typical CRUD frontend:**
- **Owns the entire auth lifecycle** — email/password and Google social login, session persistence, and JWT issuance for cross-service requests all live here via better-auth's JWT plugin.
- **Popup-blocker-safe downloads** — the download button opens a blank tab synchronously on click (before any async auth check), then redirects that tab once the token is ready — avoiding the silent, unexplained download failures that async-first `window.open()` patterns cause in production.
- **Server Actions as the API layer** — all backend communication is routed through typed Server Actions (`serverFetch` / `serverMutation`) rather than ad-hoc client-side fetch calls, keeping tokens and headers out of the browser's network tab.
- **Cyberpunk-themed, animation-forward UI** — Framer Motion, Embla Carousel, and a consistent "terminal/vault" visual language throughout, rather than a generic dashboard look.

---

## 🎯 Project Overview

### Objective
To build a complete, polished game-browsing and downloading interface — from public discovery, through authenticated actions (uploading, downloading, reviewing), to an admin dashboard — while practicing real-world concerns like cross-service JWT issuance, Server Action-based API communication, and production-safe browser behaviors (like popup-blocker timing).

### Target Audience
- **Gamers** browsing, searching, and downloading games by title, genre, or platform.
- **Uploaders/Admins** deploying new game listings through a dedicated dashboard form.
- **Developers/Recruiters** reviewing this repo as a demonstration of a Next.js frontend cleanly decoupled from its backend via signed JWTs rather than shared sessions.

### Deployments
| Component | Link |
|---|---|
| 🌐 Live App | [stash-pied-chi.vercel.app](https://stash-pied-chi.vercel.app) |
| 📁 Server Repo | [Stash-Server](https://github.com/nihalxofficial/Stash-Server) |

---

## ✨ Key Features

- **Better-auth powered sessions + Google social login** — email/password and one-click Google sign-in, backed by better-auth's JWT plugin so sessions can be verified by an entirely separate backend service.
- **Admin game deployment dashboard** — a dedicated form for uploading game metadata, thumbnails, gallery images, and the installer file itself, submitted as `multipart/form-data` directly to the backend's upload endpoint.
- **Popup-blocker-resilient download flow** — `window.open('', '_blank')` fires immediately on click; the resulting tab's location is only set once the session/token check resolves, keeping the download working reliably even with real network latency in production.
- **Server Action API layer** — `serverFetch` (reads) and `serverMutation` (writes) wrap every backend call, automatically attaching the `Authorization: Bearer <token>` header and handling `401`/`403` redirects centrally.
- **Dynamic, backend-driven search** — genre/platform/title filters are sent as query params and resolved server-side, not filtered client-side from a pre-fetched list.
- **Animated, cohesive UI** — Framer Motion section reveals, Embla Carousel showcases, and React Fast Marquee ticker sections tie the whole interface together.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** (App Router) | React framework — SSR, Server Actions, routing |
| **TypeScript** | Static typing across the entire client |
| **HeroUI** | Primary component library |
| **Tailwind CSS** | Utility-first styling |
| **Embla Carousel React** | Game showcase / featured carousels |
| **React Icons** | Icon set used throughout the UI |
| **React Toast** | Toast notifications for user feedback |
| **better-auth** | Authentication — email/password + Google social login, JWT plugin for cross-service token issuance |
| **MongoDB Atlas** | Cloud-hosted database (shared connection for user/session data) |
| **Framer Motion** | Section reveals and UI animation |
| **React Fast Marquee** | Marquee/ticker-style scrolling sections |
| **Recharts** | Dashboard analytics charts |

**Social Login:** Google OAuth, handled entirely through better-auth's social provider integration.

---

## 📁 Project Structure

```
src/
├── app/                     # Next.js App Router pages & layouts
│   ├── (public)/            # Home, Browse, Game Details
│   ├── auth/                # Login, Register
│   └── dashboard/           # Admin — Add Games, manage listings
├── components/              # Reusable UI components
│   ├── Games/                # DownloadButtonContainer, cards, etc.
│   └── ui/                   # Buttons, Modals, Forms
├── lib/
│   ├── auth.ts               # better-auth config (JWT plugin, social login)
│   ├── auth-client.ts        # better-auth client instance
│   ├── core/                 # serverFetch / serverMutation wrappers, session helpers
│   └── action/               # Server Actions (addGame, getGames, etc.)
└── assets/
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Reachable from the browser — used in client components
NEXT_PUBLIC_API_URL=https://your-deployed-backend-url.vercel.app/api

BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=https://your-deployed-frontend-url.vercel.app

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

MONGO_URI=your_mongodb_atlas_connection_string
```

> Never commit `.env.local` to version control.
>
> ⚠️ `NEXT_PUBLIC_*` variables are baked into the JavaScript bundle at **build time** — if you change one, rebuild rather than just restart.
>
> ⚠️ `BETTER_AUTH_URL` here must exactly match `AUTH_SERVER_URL` on the **backend** — that's the URL the server fetches `/api/auth/jwks` from to verify every token this client issues.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/nihalxofficial/Stash-Online-Gaming-Site.git
cd Stash-Online-Gaming-Site

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The [Stash-Server](https://github.com/nihalxofficial/Stash-Server) backend must also be running for any data-driven pages (browsing, uploading, downloading) to function — this client only handles UI and auth issuance; all persistence and file delivery happens on the server.

---

## 🔐 Notes on Auth Architecture

This client and its backend counterpart do **not** share a session store or database connection for auth purposes. Instead:

1. The user signs in here via better-auth (email/password or Google).
2. better-auth's JWT plugin issues a signed token, retrievable via `getToken()`.
3. Every Server Action that needs to call the backend attaches that token as `Authorization: Bearer <token>`.
4. The backend independently verifies the token by fetching this app's public signing keys from `/api/auth/jwks` — it never queries this app's database or session store directly.

This means both services can be deployed, scaled, and even rewritten independently, as long as the JWKS contract between them stays intact.

---

## 🗺️ Roadmap

- [ ] Wishlist / favorites UI
- [ ] Signed, short-lived download links instead of query-string tokens
- [ ] Comment system on individual game pages
- [ ] User profile / download history page

---

## 📄 License

This project is licensed under the MIT License.
