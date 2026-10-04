import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource-variable/inter";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/ui.css";
import "./styles/site.css";
import "./styles/admin.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CompanyProvider } from "./context/CompanyContext";
import { PageLoader } from "./components/ui";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// TRAS UN DESPLIEGUE, LOS ARCHIVOS DE LA VERSIÓN ANTERIOR YA NO EXISTEN: RECARGAR CON LA NUEVA (UNA VEZ)
window.addEventListener("vite:preloadError", (event) => {
  if (sessionStorage.getItem("alupvc_reloaded")) return;
  event.preventDefault();
  sessionStorage.setItem("alupvc_reloaded", "1");
  window.location.reload();
});
// SI LA PÁGINA CARGA BIEN, SE PERMITE VOLVER A RECARGAR EN EL PRÓXIMO DESPLIEGUE
window.addEventListener("load", () => setTimeout(() => sessionStorage.removeItem("alupvc_reloaded"), 10000));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CompanyProvider>
        <AuthProvider>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <App />
            </Suspense>
          </ErrorBoundary>
          <ToastContainer position="bottom-right" hideProgressBar autoClose={3500} />
        </AuthProvider>
      </CompanyProvider>
    </BrowserRouter>
  </StrictMode>,
);
