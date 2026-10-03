// ----------------------
// GUÍAS DE AYUDA DEL PANEL (UNA POR SECCIÓN)
// ----------------------
export const HELP = [
  {
    path: "/admin",
    exact: true,
    title: "Inicio del panel",
    intro: "Resumen de tu negocio de un vistazo.",
    steps: [
      "Las tarjetas de arriba muestran las solicitudes sin leer, las visitas a la web, el importe de los presupuestos abiertos y lo pendiente de cobro. Pulsa en cualquiera para ir a su sección.",
      "«Próximas citas» muestra lo que tienes en Google Calendar en los próximos 14 días.",
      "«Facturación» compara lo facturado y lo cobrado cada mes (sin IVA). Pasa el ratón por las barras para ver los importes.",
      "Usa «Nuevo presupuesto» o «Nueva cita» para empezar rápido.",
    ],
  },
  {
    path: "/admin/agenda",
    title: "Agenda (Google Calendar)",
    intro: "Tus citas se guardan directamente en el Google Calendar de la empresa, así que también las ves en el móvil.",
    steps: [
      "Pulsa «Nueva cita» o haz clic en un día del calendario para crear una cita en esa fecha.",
      "Elige el tipo (visita, medición, instalación, reparación u otro): cada uno tiene un color.",
      "Si añades el email del cliente y activas «Enviar invitación», el cliente recibe la cita en su correo y puede añadirla a su calendario.",
      "Pulsa una cita para modificarla, abrirla en Google o eliminarla.",
      "Atajo: desde una solicitud o un presupuesto puedes pulsar «Agendar visita» y los datos del cliente se rellenan solos.",
    ],
  },
  {
    path: "/admin/analitica",
    title: "Analítica de visitas",
    intro: "Cuánta gente visita la web, desde dónde y qué páginas ve.",
    steps: [
      "Elige el periodo arriba a la derecha (7 días, 30 días, 90 días o 12 meses). El porcentaje compara con el periodo anterior.",
      "Países y ciudades se obtienen de la dirección IP de la visita (ubicación aproximada).",
      "En «Últimas visitas», la IP aparece completa solo si el visitante aceptó las cookies analíticas; si no, aparece anonimizada (terminada en 0).",
      "Tus propias visitas al panel no se cuentan. Los registros se borran solos a los 13 meses.",
    ],
  },
  {
    path: "/admin/solicitudes",
    title: "Solicitudes de contacto",
    intro: "Aquí llegan los mensajes del formulario de la web. También recibes un aviso por email y el cliente recibe una confirmación automática.",
    steps: [
      "Las solicitudes nuevas tienen un punto azul. Al abrirlas pasan a «Leídas».",
      "Escribe en «Responder por email» y pulsa «Enviar respuesta»: el cliente lo recibe desde el Gmail de la empresa y la solicitud pasa a «Respondida».",
      "«Crear presupuesto» abre un presupuesto nuevo con el nombre, email y teléfono del cliente ya rellenados.",
      "«Agendar visita» crea una cita en Google Calendar con los datos del cliente.",
      "Las «Notas internas» solo las ves tú. Archiva las solicitudes terminadas para mantener la bandeja limpia.",
    ],
  },
  {
    path: "/admin/correo",
    title: "Correo (Gmail)",
    intro: "La bandeja de Gmail de la empresa, sin salir del panel.",
    steps: [
      "Cambia de carpeta con los botones de arriba: recibidos, no leídos, destacados o enviados. Usa el buscador igual que en Gmail.",
      "Abre una conversación para leerla. Puedes responder abajo: la respuesta se envía en el mismo hilo y con tu firma.",
      "Usa la estrella para destacar, el archivador para archivar y la papelera para eliminar.",
      "«Redactar» envía un email nuevo a cualquier dirección.",
      "Todo lo que hagas aquí se ve igual en Gmail (web o móvil).",
    ],
  },
  {
    path: "/admin/resenas",
    title: "Reseñas",
    intro: "Las opiniones que dejan los clientes en la web no se publican hasta que tú las apruebas.",
    steps: [
      "En «Pendientes» verás las opiniones nuevas. Pulsa «Publicar» para que aparezcan en la web.",
      "Puedes ocultar una reseña publicada en cualquier momento o eliminarla definitivamente.",
      "Para pedir una opinión a un cliente, envíale este enlace: alupvcbarcelona.es/opiniones",
    ],
  },
  {
    path: "/admin/presupuestos",
    title: "Presupuestos",
    intro: "Crea presupuestos profesionales, envíalos por email y conviértelos en factura cuando el cliente los acepte.",
    steps: [
      "Pulsa «Nuevo presupuesto». El número (P-año-0001) se asigna solo.",
      "Rellena el cliente y añade una línea por cada concepto: cantidad, unidad (ud, m, m², h, partida), precio sin IVA, descuento e IVA.",
      "IVA: 21% general. En reformas de vivienda particular puede aplicarse el 10% si se cumplen los requisitos (consúltalo con la gestoría). Puedes mezclar tipos de IVA en el mismo presupuesto.",
      "Activa «Enviar al cliente al guardar» para mandarlo por email directamente, o guárdalo y envíalo después con el botón «Enviar».",
      "En la vista del presupuesto: «Imprimir / PDF» para descargarlo (elige «Guardar como PDF» en la ventana de impresión), «Modificar», «Cancelar» o «Convertir en factura».",
      "Cambia el estado (enviado, aceptado, rechazado…) desde el selector para llevar el seguimiento.",
    ],
  },
  {
    path: "/admin/facturas",
    title: "Facturas",
    intro: "Facturas emitidas y control de cobros.",
    steps: [
      "Crea una factura desde cero con «Nueva factura» o, mejor, desde un presupuesto aceptado con «Convertir en factura» (copia todas las líneas).",
      "La numeración (F-año-0001) es correlativa y automática. El NIF del cliente es obligatorio.",
      "Para corregir una factura pulsa «Modificar». Si ya está pagada, avisa al cliente y a la gestoría del cambio.",
      "Para cancelar una factura pulsa «Anular factura». No se borra: conserva su número, deja de contar como pendiente y queda marcada como ANULADA. Puedes reactivarla si te equivocas.",
      "Cuando el cliente pague, cambia el estado a «Pagada». El inicio del panel te muestra lo pendiente de cobro.",
      "Añade tu IBAN en Ajustes para que aparezca en las facturas.",
    ],
  },
  {
    path: "/admin/documentos",
    title: "Presupuesto o factura",
    intro: "Desde aquí ves el documento tal y como lo recibirá el cliente.",
    steps: [
      "«Enviar» lo manda por email al cliente (recibes una copia en el correo de la empresa).",
      "«Imprimir / PDF» abre la impresión: elige «Guardar como PDF» para descargarlo.",
      "«Modificar» permite cambiar cualquier dato o línea. «Anular factura» / «Cancelar» lo deja sin efecto conservando el número.",
      "«Agendar» crea una cita en Google Calendar con la dirección y el teléfono del cliente.",
      "El selector de estado te permite marcarlo como enviado, aceptado, pagado, etc.",
    ],
  },
  {
    path: "/admin/servicios",
    title: "Servicios",
    intro: "Los servicios que ofreces y que se muestran en la web.",
    steps: [
      "Pulsa «Nuevo servicio» para añadir uno: nombre, descripción breve, qué incluye (una línea por punto), un icono y, si quieres, una foto.",
      "Usa las flechas para cambiar el orden en el que aparecen en la web.",
      "El interruptor oculta o muestra el servicio sin borrarlo.",
      "Los servicios aparecen en la página de inicio, en «Servicios», en el pie de página y en el desplegable del formulario de contacto.",
    ],
  },
  {
    path: "/admin/trabajos",
    title: "Trabajos",
    intro: "Publica los trabajos que realizas con sus fotos. Es la mejor carta de presentación.",
    steps: [
      "Pulsa «Nuevo trabajo», escribe un título (por ejemplo «Ventanas de PVC en un ático de Badalona»), la categoría y la ubicación.",
      "Arrastra las fotos al recuadro o haz clic para elegirlas desde el móvil o el ordenador. Se suben directamente a Cloudinary.",
      "La primera foto es la portada. Usa las flechas o la estrella para cambiar el orden y la portada. Añade una breve descripción a cada foto.",
      "Activa «Publicado» para que aparezca en la web y «Destacado» para que salga primero en la página de inicio.",
      "Al eliminar un trabajo puedes elegir si borrar también sus fotos de Cloudinary.",
    ],
  },
  {
    path: "/admin/fotos",
    title: "Fotos (Cloudinary)",
    intro: "Todas las fotos de la web en un solo sitio.",
    steps: [
      "Sube fotos arrastrándolas al recuadro. Después podrás usarlas en trabajos y servicios desde «Desde la biblioteca».",
      "«Carpeta de la web» muestra las fotos subidas desde el panel. «Toda la cuenta» muestra también las fotos antiguas de Cloudinary.",
      "Debajo de cada foto se indica el trabajo que la usa. Si borras una foto se elimina de Cloudinary y de ese trabajo.",
      "Usa el botón de copiar para obtener el enlace de una foto.",
    ],
  },
  {
    path: "/admin/ajustes",
    title: "Ajustes",
    intro: "Los datos de tu empresa y tu cuenta.",
    steps: [
      "Los datos de la empresa (nombre, NIF, dirección, teléfono, email) aparecen en la web, en los emails y en los nuevos presupuestos y facturas. Los documentos ya creados conservan los datos que tenían.",
      "Añade el IBAN para que se muestre en las facturas.",
      "Elige el IVA por defecto y escribe las condiciones que quieres que aparezcan en cada presupuesto (validez, forma de pago…).",
      "Cambia tu contraseña regularmente. Cada vez que alguien inicia sesión recibes un email de aviso con la ubicación y el dispositivo.",
    ],
  },
];

export const FIRST_STEPS = [
  "Revisa en Ajustes que los datos de la empresa y el IBAN son correctos.",
  "Revisa en Servicios que los servicios y sus textos son los que ofreces.",
  "Publica tus primeros trabajos con fotos en Trabajos.",
  "Prueba a crear un presupuesto y envíatelo a tu propio email para ver cómo lo recibe el cliente.",
];

export const helpFor = (pathname) =>
  HELP.find((h) => (h.exact ? pathname === h.path : pathname.startsWith(h.path) && h.path !== "/admin")) || HELP[0];
