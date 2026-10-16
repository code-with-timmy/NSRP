// Discord OAuth + role checking.
//
// Two ways to read someone's roles, picked automatically:
//   • No DISCORD_BOT_TOKEN set  → uses the signed-in user's own OAuth token
//     (scope guilds.members.read). No bot needed.
//   • DISCORD_BOT_TOKEN set     → asks Discord as your bot. The bot must be in
//     the server. More tolerant of Discord's per-user rate limits.

import { VERIFY_TTL_MS } from "./session.js";

const API = "https://discord.com/api/v10";

export function getConfig(req) {
  const env = process.env;
  const roleIds = (env.DISCORD_STAFF_ROLE_IDS || env.DISCORD_STAFF_ROLE_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const host = req?.headers?.["x-forwarded-host"] || req?.headers?.host;
  const proto = req?.headers?.["x-forwarded-proto"] || "https";
  const appUrl = (env.APP_URL || (host ? `${proto}://${host}` : "")).replace(/\/+$/, "");

  const missing = [];
  if (!env.DISCORD_CLIENT_ID) missing.push("DISCORD_CLIENT_ID");
  if (!env.DISCORD_CLIENT_SECRET) missing.push("DISCORD_CLIENT_SECRET");
  if (!env.DISCORD_GUILD_ID) missing.push("DISCORD_GUILD_ID");
  if (roleIds.length === 0) missing.push("DISCORD_STAFF_ROLE_IDS");
  if (!env.SESSION_SECRET || env.SESSION_SECRET.length < 32) missing.push("SESSION_SECRET (32+ chars)");
  if (!appUrl) missing.push("APP_URL");

  return {
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    guildId: env.DISCORD_GUILD_ID,
    botToken: env.DISCORD_BOT_TOKEN || "",
    roleIds,
    appUrl,
    redirectUri: `${appUrl}/api/callback`,
    scope: env.DISCORD_BOT_TOKEN ? "identify" : "identify guilds.members.read",
    missing,
  };
}

export async function exchangeCode(config, code) {
  const response = await fetch(`${API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: config.redirectUri,
    }),
  });
  if (!response.ok) return null;
  return response.json();
}

export async function fetchUser(accessToken) {
  const response = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) return null;
  return response.json();
}

// Returns { ok: true, member } or { ok: false, reason } where reason is one of
//   not_member | missing_role | relogin | unavailable
export async function checkStaffRole(config, { userId, accessToken }) {
  let response;
  try {
    response = config.botToken
      ? await fetch(`${API}/guilds/${config.guildId}/members/${userId}`, {
          headers: { Authorization: `Bot ${config.botToken}` },
        })
      : await fetch(`${API}/users/@me/guilds/${config.guildId}/member`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  if (response.status === 404) return { ok: false, reason: "not_member" };
  if (response.status === 401) {
    // User token expired/revoked, or the bot token is wrong.
    return { ok: false, reason: config.botToken ? "unavailable" : "relogin" };
  }
  if (response.status === 403 && !config.botToken) {
    // Token is missing the guilds.members.read scope (e.g. an old login).
    return { ok: false, reason: "relogin" };
  }
  if (!response.ok) return { ok: false, reason: "unavailable" };

  const member = await response.json();
  const roles = Array.isArray(member.roles) ? member.roles : [];
  const hasRole = config.roleIds.some((id) => roles.includes(id));
  return hasRole ? { ok: true, member } : { ok: false, reason: "missing_role" };
}

export function displayName(user, member) {
  return member?.nick || user?.global_name || user?.username || "Staff Member";
}

export function avatarUrl(user) {
  if (!user?.avatar) return null;
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;
}

// Re-asks Discord whether an existing session still has the role.
// Returns { session } with a refreshed verifiedUntil, or { reason } on failure.
// If Discord is temporarily unreachable, an unexpired check is kept as-is.
export async function reverify(config, session) {
  const result = await checkStaffRole(config, {
    userId: session.id,
    accessToken: session.at,
  });
  if (result.ok) {
    return {
      session: {
        ...session,
        name: result.member?.nick || session.baseName || session.name,
        verifiedAt: Date.now(),
        verifiedUntil: Date.now() + VERIFY_TTL_MS,
      },
    };
  }
  if (result.reason === "unavailable" && session.verifiedUntil > Date.now()) {
    return { session, stale: true };
  }
  return { reason: result.reason };
}

export function publicUser(session) {
  return {
    id: session.id,
    username: session.username,
    name: session.name,
    avatar: session.avatar,
  };
}
