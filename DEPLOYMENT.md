# Deployment Guide - Herb's House Partner Portal

## GitHub Pages Deployment

This portal is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup (One-Time)

1. **Enable GitHub Pages** in repository settings:
   - Go to: https://github.com/herbshousecoffee/partner-portal/settings/pages
   - Under "Build and deployment":
     - **Source**: GitHub Actions
   - Save changes

2. **Verify GitHub Actions permissions**:
   - Go to: https://github.com/herbshousecoffee/partner-portal/settings/actions
   - Ensure "Read and write permissions" is enabled for workflows

### Automatic Deployment

The site automatically deploys when you push to the `main` branch:

```bash
git push origin main
```

The GitHub Action workflow will:
1. ✅ Install dependencies
2. ✅ Build the production bundle
3. ✅ Deploy to GitHub Pages

### Manual Deployment

You can also trigger deployment manually:

1. Go to: https://github.com/herbshousecoffee/partner-portal/actions
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### Production URL

Once deployed, the portal will be available at:

**https://herbshousecoffee.github.io/partner-portal/**

### Local Production Preview

Test the production build locally before deploying:

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

This will serve the production build at `http://localhost:4173`

### Environment Variables

The portal uses a default passcode defined in `src/utils/auth.js`:

```javascript
const VALID_PASSCODE = import.meta.env.VITE_PORTAL_PASSCODE || "PARTNER2026";
```

To set a custom passcode for production:

1. Go to repository settings → Secrets and variables → Actions
2. Add a new repository secret:
   - **Name**: `VITE_PORTAL_PASSCODE`
   - **Value**: Your production passcode
3. The GitHub Action will use this during build

### Troubleshooting

**Issue: 404 errors on page refresh**

This is normal for SPAs on GitHub Pages. The app handles routing client-side, so direct navigation to routes works correctly.

**Issue: Assets not loading**

Ensure `base: '/partner-portal/'` is set in `vite.config.js` to match the repository name.

**Issue: Build fails**

Check the Actions tab for detailed error logs:
https://github.com/herbshousecoffee/partner-portal/actions

Common fixes:
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (20+)
- Check for TypeScript or linting errors

### Custom Domain (Optional)

To use a custom domain like `partners.herbshousecoffee.com`:

1. Add a `CNAME` file to the `public/` directory:
   ```
   partners.herbshousecoffee.com
   ```

2. Configure DNS with your domain provider:
   - Type: `CNAME`
   - Name: `partners`
   - Value: `herbshousecoffee.github.io`

3. Enable "Enforce HTTPS" in GitHub Pages settings

---

*For more information on GitHub Pages deployment, see: https://vitejs.dev/guide/static-deploy.html#github-pages*
