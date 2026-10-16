import crypto from "node:crypto";
import {
  avatarUrl,
  checkStaffRole,
  displayName,
  exchangeCode,
  fetchUser,
  getConfig,
} from "./_lib/discord.js";
import {
  MAX_SESSION_MS,
  STATE_COOKIE,
  VERIFY_TTL_MS,
  clearedStateCookie,
  readCookie,
  safeNext,
  sessionCookie,
} from "./_lib/session.js";

function fail(res, code) {
  res.setHeader("Set-Cookie", clearedStateCookie());
  return res.redirect(302, `/?error=${code}`);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const { code, state, error } = req.query;
  if (error) return fail(res, "cancelled");

  let saved = null;
  try {
    saved = JSON.parse(readCookie(req.headers.cookie, STATE_COOKIE) || "null");
  } catch {
    saved = null;
  }

  if (
    !code || !state || !saved?.state ||
    typeof state !== "string" ||
    state.length !== saved.state.length ||
    !crypto.timingSafeEqual(Buffer.from(state), Buffer.from(saved.state))
  ) {
    return fail(res, "expired");
  }

  const config = getConfig(req);
  if (config.missing.length) {
    console.error("Missing environment variables:", config.missing.join(", "));
    return fail(res, "config");
  }

  try {
    const token = await exchangeCode(config, code);
    if (!token?.access_token) return fail(res, "expired");

    const user = await fetchUser(token.access_token);
    if (!user?.id) return fail(res, "discord");

    const result = await checkStaffRole(config, {
      userId: user.id,
      accessToken: token.access_token,
    });
    if (!result.ok) {
      return fail(res, result.reason === "unavailable" ? "discord" : result.reason);
    }

    const now = Date.now();
    const tokenLifetime = (Number(token.expires_in) || 604800) * 1000;
    const session = {
      id: user.id,
      username: user.username,
      baseName: user.global_name || user.username,
      name: displayName(user, result.member),
      avatar: avatarUrl(user),
      // Only needed when roles are read with the user's own token.
      at: config.botToken ? undefined : token.access_token,
      exp: now + Math.min(MAX_SESSION_MS, tokenLifetime - 60_000),
      verifiedAt: now,
      verifiedUntil: now + VERIFY_TTL_MS,
    };

    res.setHeader("Set-Cookie", [clearedStateCookie(), sessionCookie(session)]);
    return res.redirect(302, safeNext(saved.next));
  } catch (err) {
    console.error("Discord callback failed:", err);
    return fail(res, "discord");
  }
}
