# Deployment Guide

This document explains how to deploy the **Strata OS** project page to production using Vercel.

> **Important:** The deployment is already configured and set up. This document serves as documentation only. Team members do not need to follow these setup steps - the deployment pipeline is already active and will automatically deploy changes when code is pushed to the `main` branch.

## Overview

We use [Vercel](https://vercel.com) for hosting our frontend application. Vercel provides seamless deployment with built-in CI/CD integration through GitHub Actions, making it easy to automatically deploy updates whenever code is pushed to the repository.

**Production Link:** [https://cs-495-project-page.vercel.app/](https://cs-495-project-page.vercel.app/)

## Key Features

- **Automatic Deployments**: Vercel automatically detects and deploys changes when you push to GitHub
- **Built-in CI/CD**: No need to configure GitHub Actions manually - Vercel handles it for you
- **Production Updates**: Pushing to the `main` branch automatically updates the live production version
- **Preview Deployments**: Every pull request gets its own preview URL for testing
- **Zero Configuration**: Vercel automatically detects Vite projects and configures the build settings

## Initial Setup Documentation

> **Note:** The instructions below are for documentation purposes only. The deployment was configured during the initial setup of the repository. Team members do not need to perform these steps.

### 1. Connect Your GitHub Repository

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **"Add New Project"** or **"Import Project"**
3. Select your GitHub repository (`project-page`)
4. Vercel will automatically detect that this is a Vite project

### 2. Configure Project Settings

Vercel should auto-detect the following settings for a Vite project:
- **Framework Preset**: Vite
- **Root Directory**: `frontend` (if your project structure has the frontend in a subdirectory)
- **Build Command**: `npm run build` (runs `tsc -b && vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`

If the root directory is set incorrectly, update it to point to the `frontend` directory.

### 3. Deploy

Click **"Deploy"** and Vercel will:
1. Install dependencies
2. Build your project
3. Deploy it to a production URL (e.g., `your-project.vercel.app`)

## Automatic CI/CD

Once your project is connected to Vercel, the CI/CD pipeline is automatically configured:

### How It Works

1. **Push to `main` branch**: 
   - Vercel automatically detects the push
   - Triggers a new build
   - Deploys the updated version to production
   - Your live site is updated automatically

2. **Pull Requests**:
   - Each PR gets its own preview deployment
   - Preview URLs are automatically added as comments on the PR
   - Team members can test changes before merging

3. **Branch Deployments**:
   - Other branches also get preview deployments
   - Useful for testing features in isolation

### No Manual Configuration Required

Unlike traditional CI/CD setups, you don't need to:
- Create GitHub Actions workflows manually
- Configure build scripts in `.github/workflows`
- Set up deployment secrets or tokens
- Manage deployment infrastructure

Vercel handles all of this automatically through its GitHub integration.

## Deployment Workflow

```
Developer pushes to main branch
         ↓
GitHub webhook notifies Vercel
         ↓
Vercel clones repository
         ↓
Runs: npm install
         ↓
Runs: npm run build
         ↓
Deploys to production
         ↓
Live site is updated
```

## Environment Variables

If your application needs environment variables:

1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables for Production, Preview, and Development environments
4. Redeploy for changes to take effect

## Custom Domain

To use a custom domain:

1. Go to **Settings** → **Domains** in your Vercel project
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS records
4. Vercel will automatically provision SSL certificates

## Monitoring and Logs

- **Deployment Logs**: View build and deployment logs in the Vercel dashboard
- **Analytics**: Enable Vercel Analytics for performance monitoring
- **Error Tracking**: Integrate with error tracking services if needed

## Troubleshooting

### Build Failures

If a deployment fails:
1. Check the build logs in the Vercel dashboard
2. Verify that `npm run build` works locally
3. Ensure all dependencies are listed in `package.json`
4. Check for TypeScript errors: `npm run build` locally should pass

### Root Directory Issues

If Vercel can't find your project:
- Set the **Root Directory** to `frontend` in project settings
- Ensure `package.json` exists in the root directory you specify

## Best Practices

1. **Always test locally**: Run `npm run build` before pushing to ensure builds succeed
2. **Use preview deployments**: Test PRs using Vercel's preview URLs before merging
3. **Monitor deployments**: Check the Vercel dashboard after pushing to verify successful deployments
4. **Keep dependencies updated**: Regularly update npm packages to maintain security and compatibility

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html#vercel)
- [Vercel GitHub Integration](https://vercel.com/docs/concepts/git)

---

**Note**: This deployment setup requires that your repository is connected to GitHub. Vercel's automatic CI/CD features work seamlessly with GitHub repositories.
