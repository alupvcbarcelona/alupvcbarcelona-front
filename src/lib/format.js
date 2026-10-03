const MONEY = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const NUMBER = new Intl.NumberFormat("es-ES");
const COUNTRY = new Intl.DisplayNames(["es"], { type: "region" });

export const money = (value) => MONEY.format(Number(value) || 0);
export const number = (value) => NUMBER.format(Number(value) || 0);

export const date = (value, options = { day: "2-digit", month: "short", year: "numeric" }) =>
  value ? new Date(value).toLocaleDateString("es-ES", options) : "—";

export const dateTime = (value) =>
  value
    ? new Date(value).toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
    : "—";

export const time = (value) =>
  new Date(value).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });

export const relative = (value) => {
  if (!value) return "";
  const diff = (Date.now() - new Date(value).getTime()) / 1000;
  if (diff < 60) return "ahora";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  if (diff < 86400 * 7) return `hace ${Math.floor(diff / 86400)} d`;
  return date(value);
};

export const country = (code) => {
  if (!code) return "Desconocido";
  try {
    return COUNTRY.of(code) || code;
  } catch {
    return code;
  }
};

// "Nombre <email@x.com>" -> { name, email }
export const parseAddress = (value = "") => {
  const match = value.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>/);
  if (match) return { name: match[1].trim() || match[2], email: match[2].trim() };
  return { name: value.trim(), email: value.trim() };
};

export const toInputDate = (value) => (value ? new Date(value).toISOString().slice(0, 10) : "");

export const percentChange = (current, previous) => {
  if (!previous) return current ? null : 0;
  return Math.round(((current - previous) / previous) * 100);
};

export const DEVICE_LABEL = { desktop: "Ordenador", mobile: "Móvil", tablet: "Tablet" };
