import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui";
import { NAV } from "../../config/site";
import { useCompany } from "../../context/CompanyContext";

const Header = () => {
  const [openAt, setOpenAt] = useState(null); // RUTA EN LA QUE SE ABRIÓ: SE CIERRA AL NAVEGAR
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const company = useCompany();
  const open = openAt === location.pathname;
  const setOpen = (value) => setOpenAt(typeof value === "function" ? (value(open) ? location.pathname : null) : value ? location.pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container site-header__inner">
        <Logo />

        <nav className="site-nav" aria-label="Principal">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="site-nav__link">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="site-header__phone">
            <Phone aria-hidden="true" />
            {company.phone}
          </a>
          <Button to="/contacto" size="sm">Pedir presupuesto</Button>
          <button className="site-header__toggle" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${open ? "is-open" : ""}`} hidden={!open}>
        <nav className="container" aria-label="Menú móvil">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="mobile-nav__link">
              {item.label}
            </NavLink>
          ))}
          <div className="mobile-nav__cta">
            <Button to="/contacto" block size="lg">Pedir presupuesto</Button>
            <Button href={`tel:${company.phone.replace(/\s/g, "")}`} variant="secondary" block size="lg" icon={Phone}>
              {company.phone}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
