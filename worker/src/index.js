/**
 * Cloudflare Worker — subscribes an email to Beehiiv via the v2 API.
 *
 * Env vars (set as Worker secrets via `wrangler secret put`):
 *   BEEHIIV_API_KEY  — your Beehiiv API key
 *   BEEHIIV_PUB_ID   — your publication id (e.g. pub_xxxxxxxx-xxxx-...)
 *
 * Vars (set in wrangler.toml [vars]):
 *   ALLOWED_ORIGINS  — comma-separated origins allowed by CORS
 *
 * Endpoints:
 *   POST /          — subscribe; expects JSON or form data with `email`
 *   GET  /healthz   — returns 200 OK
 */

const JSON_HEADERS = { "Content-Type": "application/json" };

function buildCorsHeaders(request, env) {
  const origin = request.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "*").split(",").map((s) => s.trim());
  const ok = allowed.includes("*") || allowed.includes(origin);
  return {
    "Access-Control-Allow-Origin": ok ? origin || "*" : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

async function parseBody(request) {
  const ct = (request.headers.get("Content-Type") || "").toLowerCase();
  if (ct.includes("application/json")) {
    return request.json();
  }
  const fd = await request.formData();
  const out = {};
  for (const [k, v] of fd.entries()) out[k] = v;
  return out;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const cors = buildCorsHeaders(request, env);

    if (url.pathname === "/healthz") {
      return jsonResponse({ ok: true }, 200, cors);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors);
    }

    let body;
    try {
      body = await parseBody(request);
    } catch (e) {
      return jsonResponse({ error: "Invalid body" }, 400, cors);
    }

    // Honeypot — bots fill this; humans don't see it
    if (body.website && String(body.website).trim().length > 0) {
      return jsonResponse({ success: true }, 200, cors); // silently accept and drop
    }

    const email = (body.email || "").toString().trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ error: "Invalid email" }, 400, cors);
    }

    const tag = (body.tag || "newsletter").toString();

    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${env.BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: tag,
          utm_medium: "web",
          utm_campaign: tag,
          referring_site: request.headers.get("Referer") || undefined,
        }),
      }
    );

    if (!beehiivRes.ok) {
      const errText = await beehiivRes.text();
      console.error("Beehiiv error", beehiivRes.status, errText);
      return jsonResponse(
        { error: "Subscribe failed", status: beehiivRes.status },
        502,
        cors
      );
    }

    return jsonResponse({ success: true }, 200, cors);
  },
};
