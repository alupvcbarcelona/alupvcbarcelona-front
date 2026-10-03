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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CompanyProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <App />
          </Suspense>
          <ToastContainer position="bottom-right" hideProgressBar autoClose={3500} />
        </AuthProvider>
      </CompanyProvider>
    </BrowserRouter>
  </StrictMode>,
);
