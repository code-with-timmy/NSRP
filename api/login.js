import crypto from "node:crypto";
import { getConfig } from "./_lib/discord.js";
import { safeNext, stateCookie } from "./_lib/session.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method not allowed.");
  }

  const config = getConfig(req);
  if (config.missing.length) {
    return res.redirect(302, "/?error=config");
  }

  const state = crypto.randomBytes(24).toString("base64url");
  const next = safeNext(req.query.next);

  res.setHeader("Set-Cookie", stateCookie(JSON.stringify({ state, next })));

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scope,
    state,
    prompt: "none",
  });

  return res.redirect(302, `https://discord.com/oauth2/authorize?${params}`);
}
