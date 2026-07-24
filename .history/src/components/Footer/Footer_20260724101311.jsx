import React from "react";
import packageJson from "../../../package.json";
import { year, LINKS_FOOTER, handleEmail, handleWhatsapp, handleCallPhone } from "./utils";
import AluPVCLogo from "../Logo/AluPVCLogo";
import Button from "../Button/Button";

import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container filter">
        <div className="footer_content-logo">
          <AluPVCLogo />
          <div className="footer_content-version">
            <span>All Rights Reserved &#174;​ {year()}</span>
            <i>version {packageJson.version}</i>
          </div>
        </div>
        <div className="footer_content-action">
        <div className='footer_content-links'>
          {LINKS_FOOTER?.map((path, index) => (
            <NavLink
              to={path.path}
              key={index}
              className={({ isActive }) =>
                `${isActive ? 'header__link-active' : ''}`
              }
            >
              {path.text}
            </NavLink>
          ))}
          </div>
          {/* <Button
            ariaLabel="Whatsapp"
            p="5px"
            br="5px"
            children="Escribeme por Whatsapp"
            onClick={handleWhatsapp}
          />
          <Button
            ariaLabel="Teléfono"
            p="5px"
            br="5px"
            children="¿Urgente? Llamame"
            onClick={handleCallPhone}
          />
          <Button
            ariaLabel="Email"
            p="5px"
            br="5px"
            children="¿Presupuesto? envíame correo"
            onClick={handleEmail}
          /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
