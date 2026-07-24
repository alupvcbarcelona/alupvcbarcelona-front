import img_1 from "/il-1.svg";
import img_2 from "/il-2.svg";
import img_3 from "/il-3.svg";

export const home_content = {
  body: {
    title: "Si estás en Barcelona o alrededores.",
    description: "Y necesitas:",
    description_:
      "Instalació, reparación, mantenimiento.",
    helmet: {
      title: "Instalación de persianas, cortinas y estores en Barcelona | AluPVC Barcelona",
      description: {
        name: "description",
        content:
          "Instalamos todo tipo de persianas, cortinas y estores en Barcelona y alrededores. Contamos con un equipo de profesionales altamente capacitados para ofrecerte un servicio de calidad y garantizar tu satisfacción.",
      },
      keywords: {
        name: "keywords",
        content:
          "fTodo lo relacionado con persianas, cortinas y estores, instalación de persianas, reparación de persianas, mantenimiento de persianas, instalación de cortinas, reparación de cortinas, mantenimiento de cortinas, instalación de estores, reparación de estores, mantenimiento de estores",
      },
    },
  },
};

export const home_description = {
  body: [
    {
      title: "Y necesitas el servicio para tu",
      article: [
        {
          paragraph:
            "Vivienda",
        },
        {
          paragraph:
            "Local comercial,",
        },
        {
          paragraph:
            "Oficina,",
        },
      ],
      img: {
        img: img_2,
        alt: "Instalación y reparacion de persianas, cortinas y estores en Barcelona",
        width: 350,
      },
    },
    {
      title: "Soy el especialista que necesitas",
      article: [
        {
          paragraph:
            "Con más de 5 años de EXPERIENCIA:",
          ol: [
            {
              li: "Ofrecemos soluciones totalmente personalizadas.",
            },
            { li: "Nos adaptamos a tus necesidades específicas." },
            {
              li: "Garantizamos la calidad en todos nuestros trabajos.",
            },
            {
              li: "Utilizamos materiales de primera calidad para asegurar la durabilidad y el buen funcionamiento de tus persianas, cortinas y estores.",
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
