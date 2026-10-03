import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Switch } from "../ui";
import { getConsent, setConsent } from "../../lib/consent";

// ----------------------
// BANNER Y PANEL DE CONFIGURACIÓN DE COOKIES
// ----------------------
const CookieBanner = () => {
  const [visible, setVisible] = useState(() => !getConsent());
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(() => Boolean(getConsent()?.analytics));

  useEffect(() => {
    const open = () => {
      setAnalytics(Boolean(getConsent()?.analytics));
      setSettingsOpen(true);
    };
    window.addEventListener("consent:open", open);
    return () => window.removeEventListener("consent:open", open);
  }, []);

  const save = (value) => {
    setConsent({ analytics: value });
    setVisible(false);
    setSettingsOpen(false);
  };

  return (
    <>
      {visible && !settingsOpen && (
        <div className="cookie-banner" role="region" aria-label="Aviso de cookies">
          <div className="cookie-banner__text">
            <strong>Tu privacidad</strong>
            <p>
              Usamos almacenamiento técnico necesario y, si lo aceptas, medición de visitas para mejorar la web. Puedes
              cambiarlo cuando quieras. <Link to="/politicas-cookies">Más información</Link>
            </p>
          </div>
          <div className="cookie-banner__actions">
            <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(true)}>Configurar</Button>
            <Button variant="secondary" size="sm" onClick={() => save(false)}>Rechazar</Button>
            <Button size="sm" onClick={() => save(true)}>Aceptar</Button>
          </div>
        </div>
      )}

      <Modal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Configuración de cookies"
        footer={
          <>
            <Button variant="secondary" onClick={() => save(false)}>Rechazar opcionales</Button>
            <Button onClick={() => save(analytics)}>Guardar preferencias</Button>
          </>
        }
      >
        <div className="cookie-option">
          <div>
            <strong>Técnicas (necesarias)</strong>
            <p className="small muted">
              Guardan tus preferencias de privacidad y, en el área de administración, la sesión iniciada. No se pueden
              desactivar.
            </p>
          </div>
          <Switch checked disabled readOnly aria-label="Técnicas, siempre activas" />
        </div>
        <div className="cookie-option">
          <div>
            <strong>Analíticas</strong>
            <p className="small muted">
              Nos permiten registrar la dirección IP completa de la visita para obtener estadísticas más precisas.
              Si las rechazas, solo guardamos la IP anonimizada y la ubicación aproximada (país y ciudad).
            </p>
          </div>
          <Switch checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} aria-label="Analíticas" />
        </div>
        <p className="small muted">
          No usamos cookies publicitarias ni de terceros. <Link to="/politicas-cookies" onClick={() => setSettingsOpen(false)} style={{ textDecoration: "underline" }}>Política de cookies</Link>
        </p>
      </Modal>
    </>
  );
};

export default CookieBanner;
