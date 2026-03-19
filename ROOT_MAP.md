# 🗺️ Gnomad Studio Root Map & Guardrails

This file serves as a quick reference for the project structure. **DO NOT generate new files in the root directory.** All active development should occur within `src/` or specialized directories like `supabase/`.

---

## 🏗️ Structured Reference

- `/src` - Core application logic (Next.js App Router, components, lib).
- `/public` - Static assets, images, and live demos (under `/public/DEMO`).
- `/supabase` - Database migrations and configuration.
- `apphosting.yaml` - Environment & Secret mappings for Firebase App Hosting.
- `firebase.json` - Firebase Hosting, Firestore, and Storage config.
- `package.json` - Node dependencies and build scripts.
- `TODO.md` - Active roadmap and pending tasks.

---

## 🛡️ Guardrails (SOP)

1. **No New Root Files**: All new `.ts`, `.tsx`, or `.css` files must be placed in `src/`.
2. **Cleanup Temp Files**: Files like `curl_out.txt` or `test_ls.txt` are for debugging and should be deleted once the task is complete.
3. **Map Updates**: This file (`ROOT_MAP.md`) should be updated whenever a legitimate architectural change occurs to the root (e.g., adding a new config directory).
4. **Secret Management**: Never commit `.env` files. Ensure new secrets are added to `apphosting.yaml` and the Firebase Console.

---

## 📂 Current Root Snapshot

- `apphosting.yaml`
- `DEMO/`
- `DEMO_MAPPING.md`
- `eslint.config.mjs`
- `firebase.json`
- `firestore.rules`
- `Gnomad_Studio_Master_Project.code-workspace`
- `next.config.ts`
- `next-env.d.ts`
- `package.json`
- `package-lock.json`
- `postcss.config.mjs`
- `public/`
- `README.md`
- `ROOT_MAP.md`
- `src/`
- `storage.rules`
- `supabase/`
- `TODO.md`
- `tsconfig.json`
- `vercel.json`

*(Note: Temporary diagnostic logs are omitted from this core list)*

**Last Updated:** Wed Mar 18 10:00:00 PM CDT 2026
