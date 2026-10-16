// Encrypted session cookie shared by the API routes and middleware.js.
// Files under api/_lib are not exposed as endpoints (Vercel skips "_" paths).

import crypto from "node:crypto";

export const COOKIE_NAME = "nsrp_staff_session";
export const STATE_COOKIE = "nsrp_oauth_state";

// How long a role check stays valid. After this, the next page load (or the
// app's background ping) asks Discord again, so removing the role locks the
// person out within this window even if they never reload.
export const VERIFY_TTL_MS = 30 * 60 * 1000;

// How often /api/me goes back to Discord while the app is open.
export const RECHECK_AFTER_MS = 5 * 60 * 1000;

// Hard cap on a login before Discord sign-in is required again.
export const MAX_SESSION_MS = 7 * 24 * 60 * 60 * 1000;

function getKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be at least 32 characters.");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

export function encryptSession(data) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final(),
  ]);
  return [iv, cipher.getAuthTag(), encrypted]
    .map((b) => b.toString("base64url"))
    .join(".");
}

// Returns the session if the cookie is genuine and the login has not expired.
// It does NOT check verifiedUntil — callers decide whether a stale role check
// is acceptable.
export function decryptSession(token) {
  if (!token) return null;
  try {
    const [ivText, tagText, encryptedText] = token.split(".");
    if (!ivText || !tagText || !encryptedText) return null;
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      getKey(),
      Buffer.from(ivText, "base64url")
    );
    decipher.setAuthTag(Buffer.from(tagText, "base64url"));
    const json = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, "base64url")),
      decipher.final(),
    ]).toString("utf8");
    const session = JSON.parse(json);
    if (!session.id || !session.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function isFresh(session) {
  return Boolean(session && session.verifiedUntil > Date.now());
}

export function readCookie(cookieHeader, name) {
  for (const item of (cookieHeader || "").split(";")) {
    const index = item.indexOf("=");
    if (index < 0) continue;
    if (item.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(item.slice(index + 1).trim());
      } catch {
        return null;
      }
    }
  }
  return null;
}

function secureFlag() {
  // Browsers drop Secure cookies on plain http://localhost, so relax it only
  // for local `vercel dev`.
  return process.env.VERCEL_ENV === "development" || !process.env.VERCEL
    ? ""
    : " Secure;";
}

export function sessionCookie(session) {
  const maxAge = Math.max(0, Math.floor((session.exp - Date.now()) / 1000));
  return `${COOKIE_NAME}=${encodeURIComponent(encryptSession(session))}; HttpOnly;${secureFlag()} SameSite=Lax; Path=/; Max-Age=${maxAge}`;
}

export function clearedSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly;${secureFlag()} SameSite=Lax; Path=/; Max-Age=0`;
}

export function stateCookie(value) {
  return `${STATE_COOKIE}=${encodeURIComponent(value)}; HttpOnly;${secureFlag()} SameSite=Lax; Path=/api; Max-Age=600`;
}

export function clearedStateCookie() {
  return `${STATE_COOKIE}=; HttpOnly;${secureFlag()} SameSite=Lax; Path=/api; Max-Age=0`;
}

// Only allow same-site relative paths as post-login destinations.
export function safeNext(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  if (value.startsWith("/api/")) return "/";
  return value.slice(0, 512);
}
