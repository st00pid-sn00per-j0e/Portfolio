# Portfolio - Auto-Deployment Setup

## ✅ Completed
- [x] Full analysis of the portfolio project
- [x] Created GitHub Actions workflow (`.github/workflows/deploy.yml`) for auto-deployment to Vercel on every push to `main`

## ⏳ Required: GitHub Secrets Setup

The workflow needs 3 secrets added to your GitHub repository. You'll need to get these from Vercel:

### 1. VERCEL_TOKEN
1. Go to https://vercel.com/account/tokens
2. Create a new token (name it e.g. "GitHub Actions")
3. Copy the token

### 2. VERCEL_ORG_ID
1. Go to https://vercel.com, open your team/account
2. Run: `npx vercel whoami` or check your Vercel dashboard URL for the team slug

### 3. VERCEL_PROJECT_ID
1. Go to your Vercel project dashboard
2. The Project ID is in the project settings page

### How to add secrets to GitHub:
1. Go to https://github.com/st00pid-sn00per-j0e/Portfolio/settings/secrets/actions
2. Click "New repository secret"
3. Add each of the three secrets above

## ✅ Once secrets are added
Every time you push to `main`, the GitHub Actions workflow will:
1. Checkout the code
2. Install dependencies
3. Build the project
4. Deploy to Vercel

