# Deployment Checklist - React Portfolio

## ✅ Pre-Deployment Checklist

### 1. Domain Configuration ✅
- [x] CNAME file created in `public/CNAME` with `edward-lai.com`
- [x] Domain verified in meta tags: `edward-lai.com`

### 2. Build Configuration ✅
- [x] Vite config set up
- [x] Build command works: `npm run build`
- [x] Output directory: `dist/`

### 3. Router Configuration ✅
- [x] Currently using `HashRouter` (GitHub Pages compatible)
- [ ] **Optional**: Switch to `BrowserRouter` for Vercel/Netlify

### 4. Static Assets ✅
- [x] All images in `public/static/images/`
- [x] manifest.json in `public/`
- [x] robots.txt in `public/`
- [x] sitemap.xml in `public/` (may need URL updates for React routing)

### 5. Environment Variables
- [ ] None required currently
- [ ] Formspree endpoint hardcoded (acceptable for public form)

## 🚀 Deployment Options

### Option A: GitHub Pages (Current Setup)

#### Steps:

1. **Build the project:**
   ```bash
   cd portfolio_2026
   npm run build
   ```

2. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Update package.json scripts:**
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Update vite.config.js** (if using subdirectory):
   ```js
   base: '/portfolio/',  // Only if repo is named 'portfolio', otherwise use '/'
   ```

5. **Deploy:**
   ```bash
   npm run deploy
   ```

6. **Configure GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Custom domain: `edward-lai.com` (should auto-populate from CNAME)
   - Wait for DNS propagation (can take up to 24 hours)

7. **DNS Configuration:**
   - In your domain registrar (where you bought edward-lai.com):
   - Add CNAME record:
     - Name: `@` (or `www`)
     - Value: `edwardl903.github.io` (or `username.github.io`)
   - Or A records pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

#### Important Notes for GitHub Pages:
- ✅ Currently using `HashRouter` - URLs will be like `edward-lai.com/#/about`
- ✅ CNAME file is in `public/` folder - will be copied to dist root
- ⚠️ Sitemap.xml has old HTML URLs - may need updating after deployment
- ⚠️ If you want clean URLs (no #), need to use BrowserRouter + 404.html redirect

---

### Option B: Vercel (Recommended - Clean URLs)

#### Steps:

1. **Switch to BrowserRouter:**
   - Edit `src/main.jsx`
   - Change `HashRouter` to `BrowserRouter`

2. **Deploy via Vercel CLI:**
   ```bash
   npm i -g vercel
   cd portfolio_2026
   vercel
   ```

3. **Or connect GitHub:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Root directory: `portfolio_2026`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

4. **Configure Domain:**
   - In Vercel dashboard: Settings → Domains
   - Add `edward-lai.com`
   - Update DNS as instructed by Vercel

5. **Benefits:**
   - ✅ Clean URLs (no # hash): `edward-lai.com/about`
   - ✅ Automatic deployments on git push
   - ✅ Preview deployments for PRs
   - ✅ Edge network (fast global CDN)
   - ✅ Free SSL certificates

---

### Option C: Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create `_redirects` file in `public/` folder:**
   ```
   /*    /index.html   200
   ```

3. **Deploy:**
   - Drag and drop `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:
     ```bash
     npm i -g netlify-cli
     netlify deploy --prod
     ```

4. **Switch to BrowserRouter** in `src/main.jsx`

5. **Configure domain in Netlify dashboard**

---

## 📝 Post-Deployment Tasks

### 1. Verify Domain
- [ ] Visit `https://edward-lai.com` (HTTPS should work automatically)
- [ ] Test all routes
- [ ] Verify images load correctly
- [ ] Test contact form submission

### 2. Update Sitemap (if needed)
- [ ] Update sitemap.xml URLs for React routing
- [ ] For HashRouter: URLs will have `#` (e.g., `/#/about`)
- [ ] For BrowserRouter: Clean URLs (e.g., `/about`)

### 3. SEO
- [ ] Verify meta tags are correct
- [ ] Test Open Graph previews (Facebook, LinkedIn, Twitter)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt is accessible

### 4. Performance
- [ ] Test page load speeds
- [ ] Verify images are optimized
- [ ] Check Lighthouse scores

---

## 🔧 Current Configuration Status

### ✅ Ready for Deployment:
- ✅ All components built and tested
- ✅ Build succeeds without errors
- ✅ CNAME file in place (`edward-lai.com`)
- ✅ All assets in public folder
- ✅ Routing configured (HashRouter for GitHub Pages)

### ⚠️ Notes:
- Using `HashRouter` - URLs will have `#` (e.g., `/#/about`)
- For clean URLs, switch to `BrowserRouter` and use Vercel/Netlify
- Sitemap.xml may need URL updates after deployment
- Project detail pages still have placeholder content (but routing works)

---

## 🚨 Important: Routing Note

**Current Setup (HashRouter):**
- URLs: `edward-lai.com/#/about`
- Works with GitHub Pages without configuration
- No server-side redirects needed

**Alternative (BrowserRouter):**
- URLs: `edward-lai.com/about`
- Requires server configuration (404.html redirect for GitHub Pages)
- Works out-of-the-box with Vercel/Netlify
- Requires updating `src/main.jsx` to use `BrowserRouter`

---

## 📦 Quick Deploy Commands

### GitHub Pages:
```bash
cd portfolio_2026
npm install --save-dev gh-pages
# Update package.json scripts (see above)
npm run deploy
```

### Vercel:
```bash
cd portfolio_2026
# Update src/main.jsx to use BrowserRouter
npm i -g vercel
vercel
```

---

**Ready to deploy!** 🚀

