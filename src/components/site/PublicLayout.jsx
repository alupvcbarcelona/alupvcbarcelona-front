import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import WhatsAppButton from "./WhatsAppButton";
import { PageLoader } from "../ui";
import ErrorBoundary from "../ui/ErrorBoundary";
import { useTrackVisits } from "../../hooks/useTrackVisits";

const PublicLayout = () => {
  const { pathname, hash } = useLocation();
  useTrackVisits();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) return el.scrollIntoView();
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieBanner />
    </>
  );
};

export default PublicLayout;
