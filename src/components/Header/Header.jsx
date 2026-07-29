import React, { useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import useWidth from "../../hooks/useWidth";
import { ReducerContext, StateContext } from "../../context/createContext";
import { optionsNavigate, optionsNavigateMobile } from "./utils/content";
import { handleGoHome } from "./utils/functions";
import Img from "../Img/Img";
import "./Header.css";
import AluPVCLogo from "../Logo/AluPVCLogo";
import { handleCallPhone, handleEmail, handleWhatsapp } from "../Footer/utils";
const Button = React.lazy(() => import("../Button/Button"));

const Header = () => {
  const width = useWidth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isAuth: { auth },
    showMenu,
    handleShowMenu,
    handleCloseSesion,
  } = useContext(StateContext);
  const {
    auth: { user },
  } = useContext(ReducerContext);

  const navbar = optionsNavigate(user, auth);
  const navbarMobile = optionsNavigateMobile(user, auth);
  return (
    <header className="header__container filter">
      <div className="header__content-logo">
        <AluPVCLogo />
      </div>
      {auth && (
        <div className="header__content-action">
          <NavLink to="/presupuesto">Crear presupuesto</NavLink>
          <Button
            p="5px"
            br="5px"
            children="Cerrar sesión"
            onClick={handleCloseSesion}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
