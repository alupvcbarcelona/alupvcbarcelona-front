import React from "react";
import packageJson from "../../../package.json";
import { year } from "./utils";
import AluPVCLogo from "../Logo/AluPVCLogo";
import Button from "../Button/Button";

import "./Footer.css";

const Footer = () => {
  const handleWhatsapp = () => {
    const phone = "34641495199"; // 34 = España
    const message =
      "Buenos días, me interesan tus servicios. ¿Podrías contactarme? Gracias.";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const handleCallPhone = () => {
    const phone = "+34641495199";
    const isMobile =
      window.innerWidth < 500 ||
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent,
      );

    if (isMobile) {
      window.location.href = `tel:${phone.replace(/\s/g, "")}`;
    } else {
      alert(`Llámanos al ${phone}`);
    }
  };

  const handleEmail = () => {
    const isMobile =
      window.innerWidth < 500 ||
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent,
      );

    const email = "alupvcbarcelona@gmail.com";
    const subject = "Solicitud de presupuesto";
    const body = `Buenos días,

Me gustaría solicitar un presupuesto.

══════════════════════════════
        DATOS DEL CLIENTE
══════════════════════════════

☐ Nombre:
☐ Teléfono:
☐ Ciudad:

══════════════════════════════
    DESCRIPCIÓN DEL TRABAJO
══════════════════════════════






══════════════════════════════

Muchas gracias.

Un cordial saludo,
`;

    if (isMobile) {
      const url = `mailto:${email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      window.open(url, "_self");
    } else {
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email,
      )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(gmailUrl, "_blank");
    }
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
            onClick={handleCallPhone}
          />
          <Button
            ariaLabel="Email"
            p="5px 15px"
            br="5px"
            children="¿Presupuesto? envíame correo"
            onClick={handleEmail}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
