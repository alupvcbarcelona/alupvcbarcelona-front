export const year = () => {
  const date = new Date();
  const year = date.getFullYear();
  return year;
};

export const handleEmail = () => {
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

export const handleWhatsapp = () => {
    const phone = "34641495199"; // 34 = España
    const message =
      "Buenos días, me interesan tus servicios. ¿Podrías contactarme? Gracias.";

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  export const handleCallPhone = () => {
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