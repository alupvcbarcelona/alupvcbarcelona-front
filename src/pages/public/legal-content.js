// ----------------------
// TEXTOS LEGALES (SE RELLENAN CON LOS DATOS DE LA EMPRESA)
// Revisión recomendada por la gestoría antes de publicar cambios
// ----------------------
export const UPDATED = "3 de octubre de 2026";

const holder = (c) => `Titular: ${c.owner}
NIF: ${c.nif}
Domicilio profesional: ${c.address}, ${c.postalCode} ${c.city}
Teléfono: ${c.phone}
Correo electrónico: ${c.legalEmail || c.email}
Sitio web: ${c.website}`;

export const LEGAL = (c) => ({
  title: "Aviso legal",
  intro: "Información general del sitio web en cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).",
  sections: [
    { title: "1. Identificación del titular", body: `${holder(c)}\nActividad: fabricación, suministro e instalación de ventanas, cerramientos y demás elementos de carpintería metálica, aluminio y PVC, así como su reparación y mantenimiento.` },
    { title: "2. Finalidad del sitio web", body: "Informar sobre los servicios profesionales del titular y permitir que los usuarios realicen consultas o soliciten presupuestos. La solicitud de información o de un presupuesto no implica la contratación del servicio, que solo se formaliza cuando el cliente acepta expresamente el presupuesto y sus condiciones." },
    { title: "3. Condiciones de uso", body: "El usuario se compromete a utilizar el sitio web de forma lícita y conforme a la buena fe. Queda prohibido:\n- Utilizar la web para actividades ilícitas.\n- Introducir virus o código malicioso.\n- Intentar acceder sin autorización a zonas restringidas, como el área de administración.\n- Facilitar datos falsos o de terceros sin autorización." },
    { title: "4. Propiedad intelectual e industrial", body: "Los textos, fotografías, diseños, logotipos y demás contenidos pertenecen al titular o se usan con autorización. No se permite su reproducción, distribución o transformación con fines comerciales sin autorización previa y por escrito." },
    { title: "5. Responsabilidad", body: "El titular procura que la información sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni la disponibilidad ininterrumpida de la web. Los enlaces a sitios de terceros se ofrecen con carácter informativo y el titular no se responsabiliza de sus contenidos." },
    { title: "6. Presupuestos", body: "Los presupuestos se elaboran con la información facilitada por el interesado y, cuando sea necesario, tras una visita o medición. Los precios, materiales, plazos, impuestos y forma de pago serán los indicados en cada presupuesto." },
    { title: "7. Protección de datos y cookies", body: "El tratamiento de datos personales se rige por la Política de privacidad y el uso de cookies y tecnologías similares por la Política de cookies." },
    { title: "8. Legislación aplicable", body: "Estas condiciones se rigen por la legislación española. Cuando el usuario tenga la condición de consumidor se respetarán las normas imperativas de protección de consumidores y competencia territorial." },
  ],
});

export const PRIVACY = (c) => ({
  title: "Política de privacidad",
  intro: "Cómo tratamos los datos personales que nos facilitas, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).",
  sections: [
    { title: "1. Responsable del tratamiento", body: holder(c) },
    {
      title: "2. Qué datos tratamos",
      body: `- Formulario de contacto: nombre, email, teléfono, localidad, servicio de interés y el contenido del mensaje.
- Presupuestos y facturas: datos identificativos y de facturación (nombre, NIF, dirección, email, teléfono) y los datos del trabajo.
- Citas: fecha, dirección de la visita y email si se envía invitación de calendario.
- Opiniones: nombre, localidad y el texto de la opinión que decidas publicar.
- Medición de visitas: página visitada, origen de la visita, tipo de dispositivo, navegador, sistema operativo, país y ciudad aproximados obtenidos de la dirección IP, y la dirección IP anonimizada (o completa solo si aceptas las cookies analíticas).
- Por seguridad, también registramos la IP, dispositivo y ubicación aproximada de los envíos del formulario.`,
    },
    {
      title: "3. Finalidades",
      body: `- Atender consultas, concertar visitas y elaborar, enviar y gestionar presupuestos.
- Prestar los servicios contratados, emitir facturas y cumplir obligaciones fiscales y contables.
- Publicar opiniones de clientes, previa revisión.
- Obtener estadísticas de uso de la web para mejorarla y proteger el formulario frente a abusos.
No enviamos publicidad ni comunicaciones comerciales y no elaboramos perfiles.`,
    },
    {
      title: "4. Base jurídica",
      body: `- Aplicación de medidas precontractuales a petición del interesado (consultas y presupuestos).
- Ejecución del contrato (servicios aceptados).
- Cumplimiento de obligaciones legales (facturación y contabilidad).
- Consentimiento (publicación de opiniones y registro de la IP completa con fines analíticos).
- Interés legítimo en conocer el uso agregado de la web con datos anonimizados y en la seguridad del sitio.`,
    },
    {
      title: "5. Conservación",
      body: `- Consultas no convertidas en encargo: hasta 1 año.
- Presupuestos y facturas: durante la relación contractual y los plazos legales (6 años según el Código de Comercio y 4 años según la normativa tributaria).
- Registros de visitas: se eliminan automáticamente a los 13 meses.
- Opiniones: mientras estén publicadas o hasta que solicites su retirada.`,
    },
    {
      title: "6. Destinatarios y encargados del tratamiento",
      body: `No vendemos ni cedemos tus datos. Solo acceden a ellos, cuando es necesario, la gestoría (obligaciones fiscales y contables), las administraciones públicas cuando lo exige la ley y los siguientes proveedores tecnológicos que actúan como encargados del tratamiento:
- Google Ireland Ltd. (Gmail y Google Calendar): envío y recepción de correos y gestión de citas.
- MongoDB Inc. (base de datos en la nube): almacenamiento de solicitudes, presupuestos, facturas y estadísticas.
- Vercel Inc. (alojamiento web).
- Cloudinary Ltd. (alojamiento de las fotografías de trabajos).
Algunos de estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese caso lo hacen con garantías adecuadas: Marco de Privacidad de Datos UE-EE. UU. o cláusulas contractuales tipo de la Comisión Europea.`,
    },
    {
      title: "7. Tus derechos",
      body: `Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${c.legalEmail || c.email} o por correo postal a ${c.address}, ${c.postalCode} ${c.city}, indicando el derecho que deseas ejercer. También puedes retirar tu consentimiento en cualquier momento y presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).`,
    },
    { title: "8. Seguridad", body: "Aplicamos medidas técnicas y organizativas adecuadas: conexión cifrada (HTTPS), acceso al área de administración protegido por contraseña y limitación de intentos, y proveedores con garantías de seguridad." },
    { title: "9. Cambios en esta política", body: "Podemos actualizar esta política cuando cambien los servicios, los proveedores o la normativa. La versión vigente es la publicada en esta página." },
  ],
});

export const COOKIES = (c) => ({
  title: "Política de cookies",
  intro: "Qué cookies y tecnologías de almacenamiento similares utiliza esta web, para qué sirven y cómo puedes configurarlas.",
  sections: [
    { title: "1. Responsable", body: holder(c) },
    { title: "2. ¿Qué son las cookies?", body: "Son pequeños archivos o datos que un sitio web guarda en tu dispositivo (cookies, almacenamiento local u otras tecnologías similares) para recordar información sobre tu visita." },
    { title: "3. Qué utilizamos", table: true },
    {
      title: "4. Medición de visitas",
      body: `Para conocer cuántas personas visitan la web y desde dónde, nuestro servidor registra cada página vista sin instalar cookies en tu navegador. Guardamos la página, el origen de la visita, el tipo de dispositivo y navegador, y el país y la ciudad aproximados obtenidos de tu IP.
- Si rechazas las cookies analíticas, la IP se guarda anonimizada (se elimina su último bloque) y no permite identificarte.
- Si las aceptas, guardamos la IP completa para obtener estadísticas más precisas.
Estos registros se borran automáticamente a los 13 meses y solo los ve el administrador de la web.`,
    },
    { title: "5. Servicios de terceros", body: "No utilizamos cookies publicitarias ni redes sociales integradas. Las fotografías se sirven desde Cloudinary, que no instala cookies. Si pulsas el botón de WhatsApp, se abrirá la web o la aplicación de WhatsApp, que tiene su propia política de privacidad." },
    { title: "6. Cómo configurarlas", body: "Puedes aceptar, rechazar o cambiar tus preferencias en cualquier momento desde el enlace «Configurar cookies» del pie de página. También puedes borrar los datos almacenados desde la configuración de tu navegador." },
    { title: "7. Actualizaciones", body: "Esta política se actualizará si cambian las tecnologías utilizadas. La versión vigente es la publicada en esta página." },
  ],
});

export const COOKIE_TABLE = [
  { name: "alupvc_consent", type: "Cookie técnica", purpose: "Recordar si aceptas o rechazas las cookies analíticas.", duration: "12 meses", owner: "Propia" },
  { name: "AUTH_VALIDATE_USER_TOKEN", type: "Técnica (almacenamiento local)", purpose: "Mantener la sesión del administrador. No se usa con visitantes.", duration: "30 días o hasta cerrar sesión", owner: "Propia" },
  { name: "Registro de visitas (servidor)", type: "Analítica (sin cookies)", purpose: "Estadísticas de visitas. IP completa solo con consentimiento.", duration: "13 meses", owner: "Propia" },
];
