import { Suspense, useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3, CalendarDays, ExternalLink, FileText, Images, Inbox, LayoutDashboard,
  LogOut, Mail, Menu, MessageSquareQuote, Receipt, Settings, Hammer, Wrench, X,
} from "lucide-react";
import { LogoMark } from "../site/Logo";
import { PageLoader } from "../ui";
import ErrorBoundary from "../ui/ErrorBoundary";
import HelpPanel from "./HelpPanel";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";

const NAV = [
  { group: "General", items: [
    { to: "/admin", label: "Inicio", icon: LayoutDashboard, end: true },
    { to: "/admin/agenda", label: "Agenda", icon: CalendarDays },
    { to: "/admin/analitica", label: "Analítica", icon: BarChart3 },
  ] },
  { group: "Clientes", items: [
    { to: "/admin/solicitudes", label: "Solicitudes", icon: Inbox, badge: "messages" },
    { to: "/admin/correo", label: "Correo", icon: Mail },
    { to: "/admin/resenas", label: "Reseñas", icon: MessageSquareQuote, badge: "reviews" },
  ] },
  { group: "Facturación", items: [
    { to: "/admin/presupuestos", label: "Presupuestos", icon: FileText },
    { to: "/admin/facturas", label: "Facturas", icon: Receipt },
  ] },
  { group: "Web", items: [
    { to: "/admin/servicios", label: "Servicios", icon: Wrench },
    { to: "/admin/trabajos", label: "Trabajos", icon: Hammer },
    { to: "/admin/fotos", label: "Fotos", icon: Images },
    { to: "/admin/ajustes", label: "Ajustes", icon: Settings },
  ] },
];

const AdminLayout = () => {
  const { status, user, logout } = useAuth();
  const location = useLocation();
  const [openAt, setOpenAt] = useState(null); // RUTA EN LA QUE SE ABRIÓ: SE CIERRA AL NAVEGAR
  const [badges, setBadges] = useState({});

  const open = openAt === location.pathname;
  const setOpen = (value) => setOpenAt(typeof value === "function" ? (value(open) ? location.pathname : null) : value ? location.pathname : null);

  useEffect(() => {
    if (status !== "auth") return;
    api("/settings/dashboard")
      .then(({ data }) => setBadges({ messages: data.messages.unread, reviews: data.reviews.pending }))
      .catch(() => {});
  }, [status, location.pathname]);

  if (status === "loading") return <PageLoader />;
  if (status !== "auth") return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;

  return (
    <div className={`admin ${open ? "is-nav-open" : ""}`}>
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <LogoMark className="admin-sidebar__logo" />
          <span className="admin-sidebar__name"><strong>AluPVC</strong> Panel</span>
          <button className="admin-sidebar__close" onClick={() => setOpen(false)} aria-label="Cerrar menú"><X /></button>
        </div>
        <nav className="admin-nav" aria-label="Panel de administración">
          {NAV.map((group) => (
            <div key={group.group} className="admin-nav__group">
              <span className="admin-nav__label">{group.group}</span>
              {group.items.map(({ to, label, icon: Icon, end, badge }) => (
                <NavLink key={to} to={to} end={end} className="admin-nav__link">
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                  {badge && badges[badge] > 0 && <span className="admin-nav__badge">{badges[badge]}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer" className="admin-nav__link">
            <ExternalLink aria-hidden="true" /> <span>Ver la web</span>
          </a>
          <div className="admin-user">
            <span className="admin-user__avatar">{user?.name?.[0] || "A"}</span>
            <div>
              <strong>{user?.name} {user?.lastname}</strong>
              <span>{user?.email}</span>
            </div>
            <button onClick={logout} aria-label="Cerrar sesión" title="Cerrar sesión"><LogOut /></button>
          </div>
        </div>
      </aside>
      <div className="admin-backdrop" onClick={() => setOpen(false)} />

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-topbar__menu" onClick={() => setOpen(true)} aria-label="Abrir menú"><Menu /></button>
          <LogoMark className="admin-topbar__logo" />
        </header>
        <div className="admin-content">
          <ErrorBoundary key={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <HelpPanel />
    </div>
  );
};

export default AdminLayout;
