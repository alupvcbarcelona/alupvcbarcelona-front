// ----------------------
// CONSENTIMIENTO DE COOKIES
// Se guarda en una cookie propia "alupvc_consent" (12 meses) y en localStorage como respaldo
// ----------------------
const KEY = "alupvc_consent";
export const CONSENT_VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 365;

const readCookie = () => {
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${KEY}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

export const getConsent = () => {
  try {
    const raw = readCookie() || localStorage.getItem(KEY);
    const value = JSON.parse(raw || "null");
    return value?.version === CONSENT_VERSION ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = ({ analytics }) => {
  const value = { version: CONSENT_VERSION, necessary: true, analytics: Boolean(analytics), date: new Date().toISOString() };
  const raw = JSON.stringify(value);
  try {
    const secure = location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${KEY}=${encodeURIComponent(raw)}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    localStorage.setItem(KEY, raw);
  } catch {
    /* almacenamiento no disponible */
  }
  window.dispatchEvent(new CustomEvent("consent:change", { detail: value }));
  return value;
};

export const openCookieSettings = () => window.dispatchEvent(new Event("consent:open"));
