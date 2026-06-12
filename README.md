# gnomad-studio-v2 — gnomadstudio.org (production)

Next.js agency site for **[gnomadstudio.org](https://gnomadstudio.org)** — marketing, demo portal, client portal, Vapi webhooks, Supabase auth.

## Deploy

**Firebase App Hosting** · project `gnomad-studio-client` · backend `gnomad-studio-v2` · branch **`master`**

```bash
git push origin master   # then verify rollout in Firebase Console
```

→ **[DEPLOY.md](./DEPLOY.md)** (quick) · **[GNOMADSTUDIO_ORG_DEPLOY.md](../../ORG_Docs/repos-and-hosting/GNOMADSTUDIO_ORG_DEPLOY.md)** (full runbook)

> Do not deploy from `gnomadstudio-org/` — that repo is not connected to App Hosting.

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Config

- `apphosting.yaml` — Firebase App Hosting env secrets + runtime
- `firebase.json` — hosting / firestore rules
- `next.config.ts` — Next.js config
