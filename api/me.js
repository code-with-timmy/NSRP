// Returns the signed-in staff member, re-checking the Discord role every few
// minutes. The app calls this on load and in the background while open.

import { getConfig, publicUser, reverify } from "./_lib/discord.js";
import {
  COOKIE_NAME,
  RECHECK_AFTER_MS,
  clearedSessionCookie,
  decryptSession,
  isFresh,
  readCookie,
  sessionCookie,
} from "./_lib/session.js";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ authenticated: false });
  }

  const session = decryptSession(readCookie(req.headers.cookie, COOKIE_NAME));
  if (!session) {
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.status(401).json({ authenticated: false, reason: "signed_out" });
  }

  const recentlyChecked =
    isFresh(session) && Date.now() - (session.verifiedAt || 0) < RECHECK_AFTER_MS;
  if (recentlyChecked) {
    return res.status(200).json({ authenticated: true, user: publicUser(session) });
  }

  const result = await reverify(getConfig(req), session);
  if (!result.session) {
    if (result.reason === "unavailable") {
      return res.status(503).json({ authenticated: false, reason: "unavailable" });
    }
    res.setHeader("Set-Cookie", clearedSessionCookie());
    return res.status(403).json({ authenticated: false, reason: result.reason });
  }

  if (!result.stale) res.setHeader("Set-Cookie", sessionCookie(result.session));
  return res.status(200).json({ authenticated: true, user: publicUser(result.session) });
}
