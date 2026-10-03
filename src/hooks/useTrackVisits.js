import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../services/api";
import { getConsent } from "../lib/consent";

// REGISTRA CADA PÁGINA VISTA (NO SE USAN COOKIES; LA IP COMPLETA SOLO CON CONSENTIMIENTO)
export const useTrackVisits = () => {
  const location = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    const referrer = first.current ? document.referrer : "";
    first.current = false;
    api("/visits", {
      method: "POST",
      auth: false,
      body: { path: location.pathname, referrer, consent: Boolean(getConsent()?.analytics) },
    }).catch(() => {});
  }, [location.pathname]);
};
