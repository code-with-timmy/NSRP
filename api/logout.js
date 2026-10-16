import { clearedSessionCookie } from "./_lib/session.js";

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).send("Method not allowed.");
  }

  res.setHeader("Set-Cookie", clearedSessionCookie());
  return res.status(200).json({ success: true });
}
