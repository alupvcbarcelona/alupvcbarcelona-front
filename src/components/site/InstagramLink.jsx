import { useCompany } from "../../context/CompanyContext";

// ICONO DE INSTAGRAM (LUCIDE YA NO INCLUYE ICONOS DE MARCAS)
export const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

// @usuario A PARTIR DEL ENLACE
export const instagramHandle = (url = "") => {
  const match = String(url).match(/instagram\.com\/([^/?#]+)/i);
  return match ? `@${match[1]}` : "Instagram";
};

// ----------------------
// ENLACE A INSTAGRAM: SOLO SE MUESTRA SI HAY UN ENLACE EN AJUSTES
// ----------------------
const InstagramLink = ({ variant = "button", size }) => {
  const { instagramUrl } = useCompany();
  if (!instagramUrl) return null;

  if (variant === "text") {
    return (
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="instagram-text">
        <InstagramIcon size={16} /> {instagramHandle(instagramUrl)}
      </a>
    );
  }

  return (
    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={`btn btn--secondary instagram-btn ${size ? `btn--${size}` : ""}`}>
      <InstagramIcon />
      Síguenos en Instagram
    </a>
  );
};

export default InstagramLink;
