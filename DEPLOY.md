# Deploy — gnomadstudio.org (production)

> **This repo is the live site.** Firebase App Hosting watches **`master`** on this GitHub repo.

| | |
|---|---|
| **Live** | https://gnomadstudio.org |
| **Firebase project** | `gnomad-studio-client` |
| **Backend** | `gnomad-studio-v2` (us-central1) |
| **Branch** | **`master`** |

## Quick deploy

```bash
git checkout master
git add .
git commit -m "your message"
git push origin master
```

Then open **Firebase Console → App Hosting → gnomad-studio-v2 → Rollouts** and confirm the live rollout matches your commit.

## Full runbook

See workspace doc (canonical):

`ORG_Docs/repos-and-hosting/GNOMADSTUDIO_ORG_DEPLOY.md`

## Common mistake

`01_web_design/gnomadstudio-org/` (GitHub `gnomadstudio.org`, branch `main`) is **not** wired to production. Edits there do not deploy.
