// Vercel Routing Middleware — runs before every request, including the built
// JS/CSS files. Without a valid staff session nobody can download the guide's
// code or content; they only ever get the sign-in page.

import { next, rewrite } from "@vercel/functions";
import {
  COOKIE_NAME,
  decryptSession,
  isFresh,
  readCookie,
} from "./api/_lib/session.js";

export const config = {
  runtime: "nodejs",
};

const PUBLIC_PREFIXES = ["/api/", "/fonts/"];
const PUBLIC_FILES = new Set(["/login.html", "/favicon.ico", "/favicon.png", "/robots.txt"]);

function isPageRequest(pathname) {
  const last = pathname.split("/").pop() || "";
  return !last.includes(".") || last.endsWith(".html");
}

export default function middleware(request) {
  const url = new URL(request.url);
  const { pathname } = url;

  if (PUBLIC_FILES.has(pathname) || PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) {
    return next();
  }

  let session = null;
  try {
    session = decryptSession(readCookie(request.headers.get("cookie"), COOKIE_NAME));
  } catch (err) {
    // SESSION_SECRET missing — fall through to the sign-in page, which will
    // show the configuration error after the login attempt.
    console.error(err.message);
  }

  if (isFresh(session)) return next();

  if (!isPageRequest(pathname)) {
    return new Response("Sign in required.", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  // Signed in, but the last role check is old: confirm with Discord first.
  if (session) {
    const back = encodeURIComponent(pathname + url.search);
    return new Response(null, {
      status: 302,
      headers: { Location: `/api/refresh?next=${back}`, "Cache-Control": "no-store" },
    });
  }

  // Not signed in: show the sign-in page at the requested URL.
  return rewrite(new URL("/login.html", request.url), {
    headers: { "Cache-Control": "no-store" },
  });
}
