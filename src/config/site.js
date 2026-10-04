// ----------------------
// DATOS DE LA EMPRESA (VALORES POR DEFECTO)
// Los datos de contacto se sobrescriben con los ajustes guardados en el panel
// ----------------------
export const COMPANY = {
  name: "AluPVC Barcelona",
  owner: "Keiner José Castañeda Navarro",
  nif: "60428129E",
  address: "Calle Bergantí Caupolicán, 30",
  postalCode: "08320",
  city: "El Masnou (Barcelona)",
  phone: "631 95 73 78",
  whatsapp: "34641495199",
  email: "alupvcbarcelona@gmail.com",
  // EMAIL DE LOS TEXTOS LEGALES (EL QUE INDICÓ LA GESTORÍA)
  legalEmail: "keinercastanedanavarro@gmail.com",
  website: "https://alupvcbarcelona.es",
  // FICHA DE GOOGLE (SE CAMBIA EN PANEL > AJUSTES)
  googleMapsUrl: "https://maps.google.com/?cid=10121829245452887915",
  googleReviewUrl: "https://www.google.com/maps/place/Alupvcbarcelona/data=!4m6!3m5!1s0x256bb7d401e104bf:0x8c77f6122c61276b!8m2!3d41.5307212!4d2.4149583!16s%2Fg%2F11zxmz13yp!9m1!1b1",
};

export const SITE_URL = "https://alupvcbarcelona.es";

// ZONA DE SERVICIO (SEGÚN LA WEB ORIGINAL)
export const AREA = "Barcelona y toda la comarca del Maresme";

// TIPOS DE ESPACIO (WEB ORIGINAL)
export const SPACES = [
  { icon: "House", title: "Viviendas particulares" },
  { icon: "Building2", title: "Comunidades de vecinos" },
  { icon: "Warehouse", title: "Locales comerciales" },
  { icon: "Columns3", title: "Oficinas y despachos" },
];

// ¿QUÉ NOS DIFERENCIA? (WEB ORIGINAL)
export const DIFFERENCES = [
  "Instalación personalizada de ventanas de aluminio y PVC.",
  "Reparación de ventanas, persianas y mosquiteras de cualquier instalación.",
  "Técnicos altamente cualificados y materiales de primera calidad.",
  "Excelente aislamiento térmico y acústico para mejorar el confort y la eficiencia energética.",
  "Servicio profesional en Barcelona y toda la comarca del Maresme.",
];

// SERVICIOS POR DEFECTO (LOS DE LA WEB ORIGINAL). SE GESTIONAN DESDE EL PANEL > SERVICIOS
export const SERVICES = [
  {
    slug: "ventanas",
    icon: "AppWindow",
    title: "Ventanas de aluminio y PVC",
    short: "Instalación personalizada de ventanas de aluminio y PVC a medida, con excelente aislamiento térmico y acústico.",
    points: ["Ventanas de aluminio a medida", "Ventanas de PVC personalizadas", "Aislamiento térmico y acústico", "Acabados profesionales con materiales de alta calidad"],
  },
  {
    slug: "persianas",
    icon: "Blinds",
    title: "Persianas y motorización",
    short: "Persianas a medida para todo tipo de ventanas, con opción de motorización.",
    points: ["Persianas a medida", "Motorización de persianas", "Sustitución de cinta de persiana", "Reparación de persianas"],
  },
  {
    slug: "mosquiteras",
    icon: "Grid3x3",
    title: "Mosquiteras",
    short: "Mosquiteras para todo tipo de ventanas, instalación y reparación.",
    points: ["Mosquiteras para todo tipo de ventanas", "Instalación a medida", "Reparación de mosquiteras"],
  },
  {
    slug: "reparacion",
    icon: "Wrench",
    title: "Reparación y mantenimiento",
    short: "Reparamos ventanas, persianas y mosquiteras aunque hayan sido instaladas por otra empresa.",
    points: ["Reparación de ventanas de aluminio y PVC", "Sustitución de herrajes, cierres, ruedas y mecanismos", "Sustitución de cristales", "Mantenimiento preventivo para alargar la vida útil"],
  },
  {
    slug: "cerramientos",
    icon: "PanelsTopLeft",
    title: "Cerramientos",
    short: "Fabricación, suministro e instalación de cerramientos y carpintería de aluminio y PVC.",
    points: ["Cerramientos de aluminio y PVC", "Carpintería metálica a medida", "Instalación profesional"],
  },
  {
    slug: "reformas",
    icon: "Hammer",
    title: "Reformas",
    short: "Reformas en viviendas, oficinas y locales comerciales, con un único interlocutor de principio a fin.",
    points: ["Viviendas particulares", "Comunidades de vecinos", "Locales comerciales", "Oficinas y despachos"],
  },
];

// CÓMO SE TRABAJA (SEGÚN EL AVISO LEGAL: PRESUPUESTO CON LA INFORMACIÓN DEL CLIENTE Y, SI HACE FALTA, VISITA)
export const PROCESS = [
  { title: "Solicitud", text: "Nos cuentas qué necesitas por el formulario, por teléfono, por email o por WhatsApp." },
  { title: "Visita y medición", text: "Cuando es necesario, revisamos el lugar del trabajo y tomamos medidas." },
  { title: "Presupuesto detallado", text: "Te enviamos el presupuesto por email con materiales, plazos, precio e impuestos." },
  { title: "Instalación o reparación", text: "Una vez aceptado el presupuesto, realizamos el trabajo con materiales de primera calidad." },
];

export const FAQS = [
  {
    q: "¿Reparáis ventanas que instaló otra empresa?",
    a: "Sí. Reparamos y realizamos el mantenimiento de ventanas de aluminio y PVC, persianas y mosquiteras aunque hayan sido instaladas por otra empresa.",
  },
  {
    q: "¿En qué zona trabajáis?",
    a: "En Barcelona y en toda la comarca del Maresme.",
  },
  {
    q: "¿Para qué tipo de espacios trabajáis?",
    a: "Viviendas particulares, comunidades de vecinos, locales comerciales y oficinas o despachos.",
  },
  {
    q: "¿Cómo se prepara el presupuesto?",
    a: "Con la información que nos facilitas y, cuando es necesario, con una visita y medición en el lugar del trabajo. El presupuesto indica precios, materiales, plazos, impuestos y forma de pago.",
  },
  {
    q: "¿Qué ventajas tienen las ventanas de aluminio y PVC?",
    a: "Trabajamos con materiales de primera calidad para conseguir instalaciones duraderas, seguras y con un excelente aislamiento térmico y acústico.",
  },
];

// IMÁGENES DE RESPALDO (SE USAN SI AÚN NO HAY TRABAJOS PUBLICADOS)
export const FALLBACK_IMAGES = [
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924894/IMG_3963_rooz5w.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924894/IMG_4602_i8wiy1.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924892/WhatsApp_Image_2026-07-24_at_22.25.35_ibsnoy.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924896/IMG_9805_ybdf2a.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924893/IMG_6234_xt06f6.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924893/IMG_5280_q8wocc.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924893/IMG_5283_hlo6ya.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924894/IMG_4599_cw9re7.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924895/IMG_0677_zt87oc.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924895/IMG_3890_sd8slo.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924895/IMG_3915_alyf8t.jpg",
  "https://res.cloudinary.com/bunzti4y/image/upload/v1784924896/IMG_9806_ial0od.jpg",
];

export const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Servicios" },
  { to: "/trabajos", label: "Trabajos" },
  { to: "/opiniones", label: "Opiniones" },
  { to: "/contacto", label: "Contacto" },
];

export const WORK_CATEGORIES = ["Ventanas", "Persianas", "Mosquiteras", "Reparación", "Cerramientos", "Reformas"];
