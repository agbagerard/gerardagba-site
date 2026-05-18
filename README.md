# agbagerard.com

Personal site / YouTube channel landing pages for Gerard Agba — n8n workflows for DTC finance.

**Stack:** Astro 5 + Tailwind CSS 4 + GitHub Pages

## Local dev

```bash
npm install
npm run dev
# → http://localhost:4321
```

## Build

```bash
npm run build      # outputs to ./dist
npm run preview    # preview the built site
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.

## First-time setup steps

### 1. Push to GitHub
```bash
cd C:\Users\agbag\n8n-local\datasets\gerardagba-site
git init
git add .
git commit -m "Initial scaffold"
gh repo create gerardagba-site --public --source=. --remote=origin --push
# or manually create on github.com and `git remote add origin ...`
```

### 2. Enable GitHub Pages
- Repo → Settings → Pages → Source: **GitHub Actions**

### 3. Buy the domain
- Porkbun → search `agbagerard.com` → buy (~$10/yr)

### 4. Wire DNS
At your domain registrar, set these records pointing to GitHub:
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   gerardagba-site.<your-github-username>.github.io.
```
(Replace `<your-github-username>` with yours.)

### 5. Confirm `public/CNAME`
Already contains `agbagerard.com`. GitHub uses this to bind the domain.

### 6. Enable HTTPS
Repo → Settings → Pages → check **Enforce HTTPS** (after DNS propagates, ~10 min to 1 hour).

### 7. Wire Beehiiv
1. Create publication at beehiiv.com → "Gerard Agba"
2. Forms → Create embed form
3. Copy the form action URL
4. Paste into `src/components/EmailCapture.astro` at `BEEHIIV_FORM_ACTION`
5. Set up the 5-email automation in Beehiiv (see `landing_page_ep1.md`)

### 8. Add Cal.com link
1. Cal.com free → create 20-min event
2. Update the link in `src/pages/work-with-me.astro`

## Structure

```
src/
├── layouts/BaseLayout.astro    # html shell, header/footer wrap
├── components/
│   ├── Header.astro            # sticky nav
│   ├── Footer.astro
│   └── EmailCapture.astro      # reusable lead capture form
├── pages/
│   ├── index.astro             # homepage / episode index
│   ├── work-with-me.astro      # services page
│   └── episodes/
│       └── multi-channel-sales-sync.astro    # Episode 01 landing page
└── styles/global.css           # Tailwind v4 + theme tokens
```

## Adding a new episode

1. Duplicate `src/pages/episodes/multi-channel-sales-sync.astro` → `src/pages/episodes/<new-slug>.astro`
2. Update content (hero, video ID, pain bullets, what-you-get)
3. Add an entry to the `episodes` array in `src/pages/index.astro` with `live: true`
4. Commit + push → auto-deploys
