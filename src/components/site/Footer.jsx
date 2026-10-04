import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { GoogleG } from "./GoogleLinks";
import { InstagramIcon, instagramHandle } from "./InstagramLink";
import { useCompany, useServices } from "../../context/CompanyContext";
import { AREA, COMPANY } from "../../config/site";
import { openCookieSettings } from "../../lib/consent";

const Footer = () => {
  const company = useCompany();
  const services = useServices();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo light />
          <p>
            Instalación, reparación y mantenimiento de ventanas de aluminio y PVC, persianas y mosquiteras en Barcelona y
            el Maresme, incluso si fueron instaladas por otra empresa.
          </p>
        </div>

        <div>
          <h3 className="site-footer__title">Servicios</h3>
          <ul className="site-footer__list">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/servicios#${s.slug}`}>{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="site-footer__title">Empresa</h3>
          <ul className="site-footer__list">
            <li><Link to="/trabajos">Trabajos realizados</Link></li>
            <li><Link to="/opiniones">Opiniones</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/opiniones#escribir">Dejar una opinión</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="site-footer__title">Contacto</h3>
          <ul className="site-footer__list site-footer__contact">
            <li>
              <Phone aria-hidden="true" />
              <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
            </li>
            <li>
              <Mail aria-hidden="true" />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>{company.city}</span>
            </li>
          </ul>
          <p className="site-footer__areas">Trabajamos en {AREA}.</p>
          <div className="site-footer__google">
            {company.instagramUrl && (
              <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer"><InstagramIcon size={16} /> {instagramHandle(company.instagramUrl)} en Instagram</a>
            )}
            {company.googleMapsUrl && (
              <a href={company.googleMapsUrl} target="_blank" rel="noopener noreferrer"><MapPin aria-hidden="true" /> Cómo llegar (Google Maps)</a>
            )}
            {company.googleReviewUrl && (
              <a href={company.googleReviewUrl} target="_blank" rel="noopener noreferrer"><GoogleG size={16} /> Déjanos una reseña en Google</a>
            )}
          </div>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>© {new Date().getFullYear()} {company.name || COMPANY.name}. Todos los derechos reservados.</span>
        <nav aria-label="Legal">
          <Link to="/aviso-legal">Aviso legal</Link>
          <Link to="/politicas-privacidad">Privacidad</Link>
          <Link to="/politicas-cookies">Cookies</Link>
          <button type="button" onClick={openCookieSettings}>Configurar cookies</button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
