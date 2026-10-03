import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CircleHelp, Mail, X } from "lucide-react";
import { FIRST_STEPS, HELP, helpFor } from "./help-content";

// ----------------------
// BOTÓN Y PANEL DE AYUDA (CONTEXTUAL SEGÚN LA SECCIÓN)
// ----------------------
const HelpPanel = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const current = helpFor(pathname);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button className="help-fab no-print" onClick={() => setOpen(true)} aria-label="Ayuda" title="Ayuda">
        <CircleHelp aria-hidden="true" />
        <span>Ayuda</span>
      </button>

      {open && (
        <div className="help-overlay" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <aside className="help-panel" role="dialog" aria-modal="true" aria-label="Ayuda">
            <header className="help-panel__head">
              <div>
                <span className="eyebrow">Ayuda</span>
                <h2>{current.title}</h2>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar ayuda"><X /></button>
            </header>

            <div className="help-panel__body">
              <p className="muted">{current.intro}</p>
              <ol className="help-steps">
                {current.steps.map((step) => <li key={step}>{step}</li>)}
              </ol>

              <h3 className="help-panel__subtitle">Primeros pasos</h3>
              <ul className="help-list">
                {FIRST_STEPS.map((s) => <li key={s}>{s}</li>)}
              </ul>

              <h3 className="help-panel__subtitle">Otras secciones</h3>
              <div className="faq">
                {HELP.filter((h) => h !== current).map((h) => (
                  <details key={h.path}>
                    <summary>{h.title}</summary>
                    <p>{h.intro}</p>
                    <ol className="help-steps help-steps--small">
                      {h.steps.map((step) => <li key={step}>{step}</li>)}
                    </ol>
                  </details>
                ))}
              </div>

              <div className="notice notice--info" style={{ marginTop: 24 }}>
                <Mail aria-hidden="true" />
                <div>¿Algo no funciona o necesitas una función nueva? Escribe al soporte técnico indicando la sección y lo que intentabas hacer.</div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default HelpPanel;
