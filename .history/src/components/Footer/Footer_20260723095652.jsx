import React from "react";
import packageJson from "../../../package.json";
import { year } from "./utils";
import AluPVCLogo from "../Logo/AluPVCLogo";
import Button from "../Button/Button";

import "./Footer.css";

const Footer = () => {
  const handleWhatsapp = () => {
    const phone = "34722650507"; // 34 = España
    const message =
      "Buenos días, me interesan tus servicios. ¿Podrías contactarme? Gracias.";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

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
          <Button
            ariaLabel="Whatsapp"
            p="5px 15px"
            br="5px"
            children="Escribeme por Whatsapp"
            onClick={handleWhatsapp}
          />
          <Button
            ariaLabel="Teléfono"
            p="5px 15px"
            br="5px"
            children="¿Urgente? Llamame"
            onClick={handleWhatsapp}
          />
          <Button
            ariaLabel="Email"
            p="5px 15px"
            br="5px"
            children="¿Presupuesto? envíame correo"
            onClick={handleWhatsapp}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
