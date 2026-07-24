import img_1 from "/il-1.svg";
import img_2 from "/il-2.svg";
import img_3 from "/il-3.svg";

export const home_content = {
  body: {
    title: "Especialistas en persianas, cortinas y estores en Barcelona.",
    description: "Instalación, reparación y mantenimiento.",
    description_:
      "Servicio rápido, profesional y con materiales de primera calidad para viviendas, oficinas y locales comerciales.",
    helmet: {
      title:
        "Ventanas de Aluminio y PVC en Barcelona y Maresme | Instalación, Reparación y Mantenimiento | AluPVC Barcelona",
      description: {
        name: "description",
        content:
          "Especialistas en instalación, reparación y mantenimiento de ventanas de aluminio y PVC en Barcelona y el Maresme. También instalamos y reparamos persianas y mosquiteras a medida. Materiales de primera calidad, excelente aislamiento térmico y acústico, soluciones personalizadas y servicio profesional para viviendas, oficinas y locales comerciales.",
      },
      keywords: {
        name: "keywords",
        content:
          "ventanas aluminio Barcelona, ventanas PVC Barcelona, ventanas aluminio Maresme, ventanas PVC Maresme, instalación ventanas aluminio, instalación ventanas PVC, reparación ventanas aluminio, reparación ventanas PVC, mantenimiento ventanas aluminio, mantenimiento ventanas PVC, persianas Barcelona, reparación persianas Barcelona, mosquiteras Barcelona, instalación mosquiteras, reparación mosquiteras, cerramientos aluminio, carpintería aluminio Barcelona, AluPVC Barcelona",
      },
    },
  },
};

export const home_description = {
  body: [
    {
      title: "Trabajamos para todo tipo de espacios",
      article: [
        {
          paragraph:
            "Ofrecemos nuestros servicios tanto para particulares como para empresas.",
        },
        {
          paragraph: "- Viviendas.",
        },
        {
          paragraph: "- Locales comerciales.",
        },
        {
          paragraph: "- Oficinas.",
        },
      ],
      img: {
        img: img_2,
        alt: "Instalación y reparación de persianas, cortinas y estores en Barcelona",
        width: 350,
      },
    },
    {
      title: "¿Por qué elegir AluPVC Barcelona?",
      article: [
        {
          paragraph:
            "Más de 5 años ofreciendo soluciones profesionales para persianas, cortinas y estores en Barcelona y alrededores.",
          ol: [
            {
              li: "Asesoramiento personalizado para cada proyecto.",
            },
            {
              li: "Instalaciones y reparaciones rápidas, eficaces y con acabados de calidad.",
            },
            {
              li: "Materiales resistentes y de primeras marcas para una mayor durabilidad.",
            },
            {
              li: "Compromiso con la satisfacción del cliente y un servicio profesional.",
            },
          ],
        },
      ],
      img: {
        img: img_1,
        alt: "Especialistas en instalación y reparación de persianas en Barcelona",
        width: 350,
      },
    },
    {
      title: "Nuestros servicios",
      article: [
        {
          paragraph:
            "Realizamos todo tipo de trabajos relacionados con persianas, cortinas y estores para viviendas, oficinas y locales comerciales.",
          description_: [
            {
              title: "Instalación",
              ul: [
                {
                  li: "Montaje de persianas, cortinas y estores nuevos.",
                },
                {
                  li: "Instalación adaptada a cualquier tipo de vivienda o negocio.",
                },
              ],
            },
            {
              title: "Reparación y mantenimiento",
              ul: [
                {
                  li: "Cambio de cintas, lamas, ejes, motores y mecanismos.",
                },
                {
                  li: "Mantenimiento preventivo para prolongar la vida útil de las instalaciones.",
                },
                {
                  li: "Servicio rápido y profesional en Barcelona y alrededores.",
                },
              ],
            },
          ],
        },
      ],
      img: {
        img: img_3,
        alt: "Servicios de instalación y reparación de persianas en Barcelona",
        width: 350,
      },
    },
  ],
};
