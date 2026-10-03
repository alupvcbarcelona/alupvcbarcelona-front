import { Link } from "react-router-dom";

// ----------------------
// LOGO ALUPVC BARCELONA
// Una ventana (marco de aluminio/PVC) con su maneta: la hoja derecha se abre al cargar
// y la maneta gira al pasar el ratón, como al ajustar una ventana.
// ----------------------
export const LogoMark = ({ className = "", animated = true }) => (
  <svg viewBox="0 0 48 48" className={`logo-mark ${animated ? "logo-mark--animated" : ""} ${className}`} aria-hidden="true">
    {/* MARCO */}
    <rect x="4" y="4" width="40" height="40" rx="7" fill="none" stroke="currentColor" strokeWidth="3.5" />
    {/* HOJA IZQUIERDA (FIJA) */}
    <rect x="10" y="10" width="12" height="28" rx="2.5" fill="currentColor" opacity="0.16" />
    {/* HOJA DERECHA (SE ABRE) */}
    <g className="logo-mark__sash">
      <rect x="26" y="10" width="12" height="28" rx="2.5" fill="currentColor" opacity="0.16" />
      <rect x="26" y="10" width="12" height="28" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </g>
    {/* PARTELUZ */}
    <line x1="24" y1="8" x2="24" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* MANETA */}
    <g className="logo-mark__handle">
      <circle cx="29.5" cy="24" r="2.2" fill="currentColor" />
      <rect x="28.4" y="24" width="2.2" height="8" rx="1.1" fill="currentColor" />
    </g>
  </svg>
);

const Logo = ({ to = "/", light }) => (
  <Link to={to} className={`logo ${light ? "logo--light" : ""}`} aria-label="AluPVC Barcelona, inicio">
    <LogoMark className="logo__mark" />
    <span className="logo__text">
      <strong>AluPVC</strong>
      <span>Barcelona</span>
    </span>
  </Link>
);

export default Logo;
