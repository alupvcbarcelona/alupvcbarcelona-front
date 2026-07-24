import img_1 from "/il-1.svg";
import img_2 from "/il-2.svg";
import img_3 from "/il-3.svg";

export const home_content = {
  body: {
    title: "Bienvenid@ a Packeo.",
    description: "Todas las ofertas en un solo lugar.",
    description_:
      "Encuentra las mejores ofertas y promociones de tus negocios favoritos en Packeo. Tu aliado para ahorrar dinero y fidelizar clientes.",
    helmet: {
      title: "Packeo | Ahorra dinero y fideliza a tus clientes fácilmente",
      description: {
        name: "description",
        content:
          "Descubre Packeo, la solución ideal para fidelizar a tus clientes, aumentar tus ventas y ofrecerles grandes ahorros. Perfecto para restauración, cafeterías, y más.",
      },
      keywords: {
        name: "keywords",
        content:
          "fidelización, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes, packeo",
      },
    },
  },
};

export const home_description = {
  body: [
    {
      title: "¿Qué es Packeo?",
      article: [
        {
          paragraph:
            "Packeo es una innovadora plataforma digital diseñada para gestionar y controlar promociones de manera eficiente. Su objetivo principal es ayudar a fidelizar a tus clientes ofreciendo una solución moderna para el seguimiento de consumos.",
        },
        {
          paragraph:
            "Además, es importante destacar que todas las promociones y ofertas disponibles están sujetas a las políticas de cada establecimiento comercial participante.",
        },
      ],
      img: {
        img: img_2,
        alt: "¿Qué es Packeo?",
        width: 350,
      },
    },
    {
      title: "¿Cómo funciona Packeo?",
      article: [
        {
          paragraph:
            "Usar Packeo es muy sencillo. Sigue estos pasos y comienza a disfrutar de los beneficios de nuestra plataforma:",
          ol: [
            {
              li: "Puedes optar por descargar nuestra aplicación o usar la plataforma sin necesidad de hacerlo, y aún así disfrutar de los beneficios que ofrecen nuestros colaboradores.",
            },
            { li: "Regístrate y crea tu perfil en pocos minutos." },
            {
              li: "Explora promociones exclusivas de tus establecimientos favoritos.",
            },
            {
              li: "Canjea promociones directamente en tu establecimiento de confianza.",
            },
          ],
        },
      ],
      img: {
        img: img_1,
        alt: "¿Cómo funciona Packeo?",
        width: 350,
      },
    },
    {
      title: "Beneficios de usar Packeo",
      article: [
        {
          paragraph:
            "Con Packeo, tanto los negocios como los clientes pueden disfrutar de grandes ventajas:",
          description_: [
            {
              title: "Para negocios:",
              ul: [
                { li: "Aumenta la lealtad de tus clientes." },
                { li: "Mejora el control de promociones y consumos." },
              ],
            },
            {
              title: "Para clientes:",
              ul: [
                { li: "Ahorra dinero con promociones exclusivas." },
                {
                  li: "Consulta y canjea ofertas de forma rápida y sencilla.",
                },
                { li: "Disfruta de una experiencia 100% digital." },
              ],
            },
          ],
        },
      ],
      img: {
        img: img_3,
        alt: "Beneficios de usar Packeo",
        width: 350,
      },
    },
  ],
};
