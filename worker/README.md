# Beehiiv Subscribe Proxy — Cloudflare Worker

A tiny Worker that takes a POST `{ email }` from the website and creates a Beehiiv subscription on your behalf. Keeps the Beehiiv API key off the static site.

## One-time setup

```bash
cd worker
npm install
npx wrangler login                     # opens browser, log into Cloudflare
```

## Set secrets

```bash
npx wrangler secret put BEEHIIV_API_KEY
# paste the key from Beehiiv → Settings → API

npx wrangler secret put BEEHIIV_PUB_ID
# paste: pub_1e631b9a-da53-4911-b698-4ef1d7bc42c3
```

## Local dev

```bash
npm run dev
# → http://localhost:8787
```

Test it:

```bash
curl -X POST http://localhost:8787 \
  -H "Content-Type: application/json" \
  -d '{"email":"test+1@example.com","tag":"ep01"}'
# expect: {"success":true}

curl http://localhost:8787/healthz
# expect: {"ok":true}
```

## Deploy

```bash
npm run deploy
# Worker is now live at: https://gerardagba-beehiiv-proxy.<your-cf-subdomain>.workers.dev
```

Copy that URL and paste it into `src/components/EmailCapture.astro` as `WORKER_URL`.

## Tail logs (debug live errors)

```bash
npm run tail
```

## Custom domain (optional)

Bind the Worker to `forms.gerardagba.com` (or similar) in the Cloudflare dashboard → Workers & Pages → your worker → Settings → Triggers → Custom domains. Then update `WORKER_URL` in the site to the friendlier URL.
