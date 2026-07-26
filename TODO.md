# Portfolio - Auto-Deployment Setup

## ✅ Completed
- [x] Full analysis of the portfolio project
- [x] Created GitHub Actions workflow (`.github/workflows/deploy.yml`) for auto-deployment to Vercel on every push to `main`
- [x] Responsive design fix push triggered deployment workflow
- [x] Workflow updated with hardcoded VERCEL_ORG_ID and VERCEL_PROJECT_ID

## ⏳ Last Step: Add VERCEL_TOKEN Secret

The workflow is ready. It only needs one secret on GitHub:

### VERCEL_TOKEN
1. Go to https://vercel.com/account/tokens
2. Create a new token (name it e.g. "GitHub Actions")
3. Copy the token value
4. Go to https://github.com/st00pid-sn00per-j0e/Portfolio/settings/secrets/actions
5. Click "New repository secret"
6. Name: `VERCEL_TOKEN`, Value: (paste the token you just created)

> **Note:** VERCEL_ORG_ID and VERCEL_PROJECT_ID are already hardcoded in the workflow file, so you only need VERCEL_TOKEN.

## ✅ Once VERCEL_TOKEN is added
Every time you push to `main`, the workflow will:
1. ✅ Checkout the code
2. ✅ Install dependencies (`npm ci`)
3. ✅ Pull Vercel environment
4. ✅ Build the project
5. ✅ Deploy to Vercel production

### To test it immediately:
```bash
git add -A && git commit -m "test deployment" && git push
```

