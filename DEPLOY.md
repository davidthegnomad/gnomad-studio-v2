# Deploy — gnomadstudio.org (production)

> **Firebase App Hosting builds from branch `main`** (not `master`).

| | |
|---|---|
| **Live** | https://gnomadstudio.org |
| **Firebase project** | `gnomad-studio-client` |
| **Backend** | `gnomad-studio-v2` (us-central1) |
| **Deploy branch** | **`main`** |

## Quick deploy

```bash
# After committing on master:
git push origin master
git checkout main && git cherry-pick <sha> && git push origin main

# Then: Firebase Console → Create rollout → main
```

**Verify:** https://gnomadstudio.org/sitemap.xml should reflect your change.

## Full runbook

`ORG_Docs/repos-and-hosting/GNOMADSTUDIO_ORG_DEPLOY.md`

## Common mistakes

- Pushing only to **`master`** — does not deploy
- Rolling out **`main`** when the commit is only on **`master`**
