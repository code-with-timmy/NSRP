// middleware.js sends page loads here when the last role check is older than
// VERIFY_TTL_MS. Re-checks the role, then bounces back to the page.

import { getConfig, reverify } from "./_lib/discord.js";
import {
  COOKIE_NAME,
  clearedSessionCookie,
  decryptSession,
  readCookie,
  safeNext,
  sessionCookie,
} from "./_lib/session.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const next = safeNext(req.query.next);

  const session = decryptSession(readCookie(req.headers.cookie, COOKIE_NAME));
  if (!session) {
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.redirect(302, next);
  }

  const result = await reverify(getConfig(req), session);
  if (!result.session) {
    if (result.reason === "unavailable") {
      return res
        .status(503)
        .send("Couldn't reach Discord to confirm your staff role. Refresh in a minute.");
    }
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.redirect(302, `/?error=${result.reason}`);
  }

  res.setHeader("Set-Cookie", sessionCookie(result.session));
  return res.redirect(302, next);
}
