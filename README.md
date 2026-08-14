# DevTinder — Frontend

A React + Tailwind CSS frontend built to match your existing DevTinder backend
exactly (cookie-based JWT auth, `/feed`, `/request/send`, `/request/review`,
`/user/requests/received`, `/user/connections`, `/profile*`).

## Design

- **Type system:** Space Grotesk (display), Inter (body), JetBrains Mono (data/labels).
- **Palette:** cool paper background (`#F5F7FA`) with a dark IDE-style titlebar
  nav (`#14151F`), indigo primary (`#6366F1`), emerald "approve" (`#10B981`),
  rose "reject" (`#F43F5E`).
- **Signature element:** the swipe card is styled like a pull-request review —
  "Approve" / "Request changes" instead of a heart/x — with skill chips as
  GitHub-style labels. Feed, Requests, and the Profile preview all reuse it.
- Keyboard shortcuts on the feed: `←` = request changes, `→` = approve.

## Run locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. Make sure your backend is running at
`http://localhost:7000` (or update `VITE_API_URL` in `.env`) and that
`src/app.js` in the backend has:

```js
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
```

so the browser is allowed to send/receive the `token` cookie.

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `VITE_API_URL` | `http://localhost:7000` | Base URL the frontend calls |

Copy `.env` and point it at your deployed backend URL before building for
production.

## Build & deploy

```bash
npm run build
```

Outputs static files to `dist/`. Deploy `dist/` to Vercel, Netlify, or any
static host. Two things to set on the host:

1. **`VITE_API_URL`** env var → your deployed backend's HTTPS URL.
2. Your backend's CORS `origin` must be updated to your deployed frontend's
   URL (it's currently hardcoded to `http://localhost:5173` in `app.js`), and
   the cookie needs `secure: true` + `sameSite: "none"` set on `res.cookie(...)`
   in `routes/auth.js` for cross-site cookies to work over HTTPS once frontend
   and backend live on different domains.

## Known backend issue (not fixed here, per your request)

`routes/request.js` registers `POST /request/review/:status/:requestId`
**twice**. The first (broken) handler always wins — it checks for a typo'd
status (`"intrested"` instead of `"interested"`) and will 404 on every real
request, so Accept/Reject on the Requests page will fail until that route is
fixed on the backend. The frontend code here is already correct for the
intended behavior — nothing to change on this side once you fix that route.

## Project structure

```
src/
  api/        axios instance + error-message normalizer
  context/    AuthContext (cookie session bootstrap via GET /profile)
  components/ DevCard, Navbar, ProtectedRoute, Loader, EmptyState
  pages/      Login, Signup, Feed, Requests, Connections, Profile
```
