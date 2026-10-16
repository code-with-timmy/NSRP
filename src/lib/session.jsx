import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// The server (middleware.js) already refuses to serve this app to anyone
// without a verified staff session. This keeps the session alive while the
// tab is open and sends the user to sign in again if their role is removed.

const SessionContext = createContext(null);
const PING_INTERVAL_MS = 10 * 60 * 1000;

const DEV_USER = { id: 'dev', username: 'dev', name: 'Local Dev', avatar: null };

function goToSignIn(reason) {
  const query = reason && reason !== 'signed_out' ? `?error=${reason}` : '';
  window.location.replace(`/${query}`);
}

async function fetchMe() {
  const response = await fetch('/api/me', { credentials: 'same-origin', cache: 'no-store' });
  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }
  return { status: response.status, data };
}

export function SessionProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  const check = useCallback(async () => {
    try {
      const { status, data } = await fetchMe();
      if (status === 200 && data?.authenticated) {
        setUser(data.user);
        return;
      }
      // `npm run dev` (plain Vite) has no /api — let local editing work.
      if (import.meta.env.DEV && (status === 404 || data === null)) {
        setUser(DEV_USER);
        return;
      }
      if (status === 503) return; // Discord hiccup — keep the current view.
      goToSignIn(data?.reason);
    } catch {
      if (import.meta.env.DEV) setUser(DEV_USER);
      // Network error in production: keep what's on screen; next ping retries.
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    check();
    const timer = setInterval(check, PING_INTERVAL_MS);
    const onFocus = () => {
      if (document.visibilityState === 'visible') check();
    };
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, [check]);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
    } finally {
      window.location.replace('/');
    }
  }, []);

  return (
    <SessionContext.Provider value={{ user, checking, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession must be used inside SessionProvider');
  return context;
}
