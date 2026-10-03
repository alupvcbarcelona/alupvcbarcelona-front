import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "./components/site/PublicLayout";
import Home from "./pages/public/Home";

// PÁGINAS PÚBLICAS
const Services = lazy(() => import("./pages/public/Services"));
const Works = lazy(() => import("./pages/public/Works"));
const WorkDetail = lazy(() => import("./pages/public/WorkDetail"));
const Reviews = lazy(() => import("./pages/public/Reviews"));
const Contact = lazy(() => import("./pages/public/Contact"));
const Legal = lazy(() => import("./pages/public/Legal"));
const NotFound = lazy(() => import("./pages/public/NotFound"));

// PANEL DE ADMINISTRACIÓN
const Login = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Agenda = lazy(() => import("./pages/admin/Agenda"));
const Requests = lazy(() => import("./pages/admin/Requests"));
const MailPage = lazy(() => import("./pages/admin/MailPage"));
const Documents = lazy(() => import("./pages/admin/Documents"));
const DocumentEditor = lazy(() => import("./pages/admin/DocumentEditor"));
const DocumentView = lazy(() => import("./pages/admin/DocumentView"));
const AdminWorks = lazy(() => import("./pages/admin/Works"));
const WorkEditor = lazy(() => import("./pages/admin/WorkEditor"));
const Media = lazy(() => import("./pages/admin/Media"));
const ReviewsAdmin = lazy(() => import("./pages/admin/ReviewsAdmin"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const ServicesAdmin = lazy(() => import("./pages/admin/ServicesAdmin"));

const App = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route index element={<Home />} />
      <Route path="servicios" element={<Services />} />
      <Route path="trabajos" element={<Works />} />
      <Route path="trabajos/:slug" element={<WorkDetail />} />
      <Route path="opiniones" element={<Reviews />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="aviso-legal" element={<Legal />} />
      <Route path="politicas-privacidad" element={<Legal />} />
      <Route path="politicas-cookies" element={<Legal />} />
      {/* RUTAS ANTIGUAS */}
      <Route path="envia-resena" element={<Navigate to="/opiniones#escribir" replace />} />
      <Route path="login" element={<Navigate to="/admin/login" replace />} />
      <Route path="presupuesto" element={<Navigate to="/admin/documentos/nuevo?tipo=presupuesto" replace />} />
      <Route path="*" element={<NotFound />} />
    </Route>

    <Route path="admin/login" element={<Login />} />
    <Route path="admin" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="analitica" element={<Analytics />} />
      <Route path="agenda" element={<Agenda />} />
      <Route path="solicitudes" element={<Requests />} />
      <Route path="solicitudes/:id" element={<Requests />} />
      <Route path="correo" element={<MailPage />} />
      <Route path="correo/:id" element={<MailPage />} />
      <Route path="mensajes/:id" element={<Navigate to="/admin/solicitudes" replace />} />
      <Route path="presupuestos" element={<Documents type="presupuesto" />} />
      <Route path="facturas" element={<Documents type="factura" />} />
      <Route path="documentos/nuevo" element={<DocumentEditor />} />
      <Route path="documentos/:id" element={<DocumentView />} />
      <Route path="documentos/:id/editar" element={<DocumentEditor />} />
      <Route path="trabajos" element={<AdminWorks />} />
      <Route path="trabajos/:id" element={<WorkEditor />} />
      <Route path="fotos" element={<Media />} />
      <Route path="servicios" element={<ServicesAdmin />} />
      <Route path="resenas" element={<ReviewsAdmin />} />
      <Route path="ajustes" element={<Settings />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Route>
  </Routes>
);

export default App;
