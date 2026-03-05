# Next Steps: Gnomad Studio v2 Backend & Deployment

## 1. Domain Connection (Hostinger to Firebase App Hosting)

To get `www.gnomadstudio.org` pointing to your live Firebase app, follow these steps:

1. **Log into Google Cloud / Firebase Console.**
2. Go to **App Hosting**, find the `gnomad-studio-v2` app, and click **Add Custom Domain** (or similar).
3. Enter `gnomadstudio.org` and `www.gnomadstudio.org`. Firebase will give you some DNS records (likely A records or TXT records). Keep this page open.
4. **Log into Hostinger.**
5. Go to **Domains**, select `gnomadstudio.org`, and go to the **DNS / Nameservers** section.
6. **Delete** any existing A records that point the root `@` or `www` to a Hostinger IP address.
7. **Add** the new records exactly as Firebase provided them (Type, Name exactly as `@` or `www`, and the Value).
8. Save and wait. Firebase will automatically provision your SSL certificate once the DNS routing propagates across the internet.

## 2. Supabase Migration (Re-architecting the Backend)

We need to securely migrate the database and authentication off of Firebase and over to the Supabase URL and Anon Key you provided (`https://aemdvddajrxhwwgiqnjs.supabase.co`).

**What we will do:**

1. Setup the Supabase client inside the Next.js app (`src/lib/supabase/config.ts`).
2. Replace all Firebase Authentication logic (login, signup, session checking) with Supabase Auth.
3. Migrate the Firestore Database to the Supabase Postgres Database (re-creating tables for `ClientProfile`, `Chatbot` histories, etc.).
4. Migrate Firebase Storage to Supabase Storage (for the `DocumentVault`).
5. Completely remove all Firebase dependencies, configs, and environment variables from the project and GitHub Actions.

**What you need to do tomorrow to help with this:**
If there is *any* real data in the current Firebase Firestore database (like actual client profiles or chat histories) that you absolutely need to keep, let me know, and we will do a manual data export/import. If it's just test data, we will start perfectly fresh on Supabase.
