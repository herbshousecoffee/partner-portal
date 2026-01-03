const AUTH_KEY = "hhp_auth";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms

export const checkAuth = () => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;

  const { timestamp } = JSON.parse(stored);
  const elapsed = Date.now() - timestamp;

  if (elapsed > SESSION_DURATION) {
    localStorage.removeItem(AUTH_KEY);
    return false;
  }
  return true;
};

export const login = (passcode) => {
  // Compare against stored passcode (in production, use env variable)
  const VALID_PASSCODE = import.meta.env.VITE_PORTAL_PASSCODE || "PARTNER2026";

  if (passcode === VALID_PASSCODE) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      authenticated: true,
      timestamp: Date.now()
    }));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};
