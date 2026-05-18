# Beehiiv — Welcome Email Copy

Paste into Beehiiv → **Settings** → **Emails** → **Welcome Email**.

---

## Subject line (try both, A/B if you can)

- **A:** Here's the multi-channel sales sync workflow you asked for
- **B:** Your free n8n workflow + 4-step setup guide

## Preview text

The JSON + 1-page setup guide are below. Imports into n8n in under 60 seconds.

---

## Body content

Hey there,

Welcome — and thanks for grabbing the workflow.

Two downloads for you:

- **Workflow JSON** → [https://agbagerard.com/downloads/multi-channel-sales-sync.json](https://agbagerard.com/downloads/multi-channel-sales-sync.json)
- **Setup guide (1-page PDF)** → [https://agbagerard.com/downloads/multi-channel-sales-sync-setup-guide.pdf](https://agbagerard.com/downloads/multi-channel-sales-sync-setup-guide.pdf)

### Quick start (4 steps, ~10 minutes)

1. **Import the JSON** into n8n (menu → Import from File)
2. **Drop your channel CSVs** into a folder n8n can read — `/files/data/` by default
3. **Point the Read CSV nodes** at your files (open each one, update the path)
4. **Click Execute** — you get four output CSVs and a one-page month-end summary

If you self-host n8n with Docker and don't have `/files/data/` mounted yet, the setup guide PDF walks through the bind-mount fix.

### What's next on the channel

Every couple weeks I ship a new free workflow that fixes something expensive and annoying in DTC finance:

- **Episode 02:** Amazon FBA Fee Auditor — catching the misbilled fees Amazon hopes you never notice
- **Episode 03:** Payment Processor Audit — Stripe/PayPal payouts vs. your bank, dollar for dollar
- **Episode 04:** Chargeback Response Builder — auto-PDF evidence packets

You'll get one email when each one drops. Nothing else.

### Want this set up on your actual data?

If you'd rather skip the import and have me wire it into your real Shopify/Amazon/Faire/Stripe accounts, I do that. Fixed-scope, fixed-price, 2 weeks: [agbagerard.com/work-with-me](https://agbagerard.com/work-with-me).

Reply to this email if anything breaks or if you'd like a workflow built for a problem I haven't covered yet. I read every reply.

— Gerard

P.S. If a friend's DTC books are a mess, forward them this email. Their bookkeeper will thank you.

---

## Beehiiv UI checklist (where to click)

1. Sidebar → **Settings** → **Emails** (or `app.beehiiv.com/settings/publication/emails`)
2. Find the **Welcome Email** card → click **Edit** or the toggle
3. Paste:
   - Subject line (Subject A or B above)
   - Preview text
   - Body content (the markdown above renders to rich text in Beehiiv's editor — you'll need to paste section by section, then format links)
4. Set **From name:** `Gerard Agba`
5. Set **From email:** the verified address on your publication (use your default for now; switch to `hello@agbagerard.com` once you set up email forwarding + DNS verification at Porkbun)
6. Toggle the welcome email **ON**
7. Click **Save**

## Sanity check after save

- Submit a test signup at `https://agbagerard.com` with a fresh email
- Within 1-2 minutes you should receive the welcome email
- Click both download links — both files should serve from `agbagerard.com/downloads/`
- If a link 404s, the `public/downloads/` folder hasn't been pushed yet (run `git add . && git commit -m "Add lead magnet files" && git push`)
