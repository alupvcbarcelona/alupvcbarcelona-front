import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import useWidth from "../hooks/useWidth";
import "./Layout.css";
import { ScrollContext } from "../context/createContext";

const AluPVCLogo = React.lazy(() => import("../components/Logo/AluPVCLogo"));
const Header = React.lazy(() => import("../components/Header/Header"));
const Footer = React.lazy(() => import("../components/Footer/Footer"));

const Layout = () => {
  const [google, setGoogle] = useState(import.meta.env.VITE_GOOGLE_ADSENSE);
  const { useScroll, refTop } = useContext(ScrollContext);
  const location = useLocation();
  const width = useWidth();
  useEffect(() => {
    useScroll(refTop);
  }, [location]);

  return (
    <>
      <Footer />
      <div className="layout__toast">
        <ToastContainer position="bottom-center" hideProgressBar />
      </div>
      <section
        ref={refTop}
        className={`outlet__container ${
          width >= 510 ? "outlet__children" : "outlet__children-mobile"
        }`}
      >
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default Layout;
