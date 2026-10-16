# Nevada State Roleplay — Staff Hub

React + Vite site deployed on Vercel. Access is locked to Discord members who
have the staff role: give someone the role and they can sign in right away;
take it away and they lose access within 30 minutes (immediately on their
next page load after 5 minutes).

## How access works

1. Anyone who isn't signed in only ever gets `public/login.html`. The guide's
   JS/CSS files aren't served to them at all (`middleware.js` returns 401), so
   the content can't be read by opening the bundle.
2. "Continue with Discord" → `/api/login` → Discord → `/api/callback`, which
   asks Discord for the person's roles in the NSRP server.
3. If they have one of `DISCORD_STAFF_ROLE_IDS`, they get an encrypted,
   HttpOnly session cookie (7 days max).
4. The role is re-checked with Discord every few minutes while the site is
   open (`/api/me`) and before any page load once the last check is over 30
   minutes old (`/api/refresh`). No role → signed out with a message.

| File | Purpose |
| --- | --- |
| `middleware.js` | Gate in front of every request (Vercel Routing Middleware) |
| `api/login.js`, `api/callback.js` | Discord OAuth sign-in |
| `api/me.js`, `api/refresh.js` | Role re-checks |
| `api/logout.js` | Sign out |
| `api/_lib/` | Shared session + Discord helpers (not endpoints) |
| `public/login.html` | Sign-in page |
| `src/lib/session.jsx` | Keeps the session alive in the app, sign-out |

## Setup

### 1. Discord application

1. <https://discord.com/developers/applications> → your app (or New Application).
2. **OAuth2** → copy the **Client ID** and **Client Secret**.
3. **OAuth2 → Redirects** → add `https://<your-domain>/api/callback`
   (and `http://localhost:3000/api/callback` for local testing).

In Discord (User Settings → Advanced → Developer Mode on):
- Right-click the NSRP server → **Copy Server ID** → `DISCORD_GUILD_ID`.
- Server Settings → Roles → right-click the staff role → **Copy Role ID** →
  `DISCORD_STAFF_ROLE_IDS`. Add more IDs separated by commas if other roles
  should also get in.

**Bot or no bot?** By default no bot is needed — the site reads the person's
roles using their own sign-in (`guilds.members.read`). If you'd rather use a
bot (or already have one in the server), set `DISCORD_BOT_TOKEN` and the site
switches to it automatically. The bot needs no permissions or intents beyond
being in the server.

### 2. Vercel

1. Push this folder to a GitHub repo → Vercel → **Add New Project** → import it.
   Framework preset **Vite** is picked up from `vercel.json`.
2. **Settings → Environment Variables**: add everything from `.env.example`.
3. Deploy. Then set `APP_URL` to the final domain (no trailing slash) and make
   sure the same `<APP_URL>/api/callback` is in Discord's Redirects.
4. Redeploy after changing environment variables.

Preview deployments get their own URLs, which won't match the Discord
redirect, so test sign-in on the production domain.

## Local development

```
npm install
npm run dev          # Vite only: no sign-in, you're "Local Dev" — for editing content
```

To test the real Discord sign-in locally:

```
npm i -g vercel
cp .env.example .env.local   # fill in, with APP_URL=http://localhost:3000
vercel dev
```

## Project layout

- `src/pages/` — one file per page; routes are declared in `src/App.jsx`.
- `src/components/` — shared UI (layout, sidebar, accordions, rule panels).
- `src/data/`, `src/lib/` — local content and helpers.

## Images

The logo, home background, Melonly logo and two fleet images still load from
`media.base44.com`. They're public and work from Vercel, but if the Base44
app is ever deleted they'll break. To self-host, download them into `public/`
and update the URLs in `index.html`, `public/login.html`,
`src/components/layout/Sidebar.jsx`, `src/pages/Home.jsx`,
`src/pages/ServerRules.jsx`, `src/pages/MelonlyGuide.jsx` and
`src/pages/StaffApplication.jsx`.
