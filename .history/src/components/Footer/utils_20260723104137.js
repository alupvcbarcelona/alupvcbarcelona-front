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
