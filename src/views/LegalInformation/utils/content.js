/* const LEGAL_CONTENT = (PATH) => {
  const content = {
    title: "Aviso Legal",
    sections: [
      {
        title: "1. Identificación del titular",
        content: `En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y del comercio electrónico, se informa de que el titular de esta página web es:

Titular: Keiner José Castañeda Navarro
NIF: 60428129E
Domicilio profesional: Calle Bergantí Caupolicán, número 30, El Masnou, Barcelona
Teléfono: 631 95 73 78
Correo electrónico: alupvcbarcelona@gmail.com
Página web: https://alupvcbarcelona.com
Actividad: Fabricación, suministro e instalación de ventanas, cerramientos y otros elementos de carpintería metálica y aluminio.`,
      },
      {
        title: "2. Finalidad de la página web",
        content: `La página web tiene como finalidad informar sobre los servicios profesionales prestados por su titular y permitir que los usuarios puedan realizar consultas, solicitar información o pedir presupuestos.

La solicitud de información o de un presupuesto a través de la página web no implica la contratación automática del servicio. La contratación se entenderá formalizada cuando el cliente acepte expresamente el presupuesto y las condiciones comunicadas por el titular.`,
      },
      {
        title: "3. Condiciones de uso",
        subsections: [
          {
            subtitle: "Uso de la página web",
            content: `El acceso y utilización de esta página web atribuye la condición de usuario e implica la aceptación de las presentes condiciones.

El usuario se compromete a utilizar la página web y sus contenidos de forma lícita, diligente y conforme a la buena fe.`,
          },
          {
            subtitle: "Queda prohibido",
            content: `- Utilizar la web para realizar actividades ilícitas.
- Introducir virus o programas que puedan dañar su funcionamiento.
- Intentar acceder sin autorización a los sistemas o bases de datos.
- Facilitar datos falsos o pertenecientes a terceras personas sin autorización.`,
          },
        ],
      },
      {
        title: "4. Propiedad intelectual e industrial",
        content: `Los textos, fotografías, diseños, logotipos y demás contenidos de esta página web son propiedad de su titular o se utilizan con la correspondiente autorización.

No está permitida su reproducción, distribución, transformación o utilización con fines comerciales sin autorización previa y por escrito del titular.`,
      },
      {
        title: "5. Responsabilidad",
        subsections: [
          {
            subtitle: "Información publicada",
            content: `El titular procura que la información publicada sea correcta y esté actualizada. No obstante, no puede garantizar la inexistencia de errores ni la disponibilidad permanente de la página web.`,
          },
          {
            subtitle: "Limitación de responsabilidad",
            content: `El titular no será responsable de los daños derivados de interrupciones del servicio, errores técnicos, virus, actuaciones de terceros o utilización indebida de la información publicada.

Los enlaces a páginas de terceros, en caso de existir, se incluyen únicamente con carácter informativo. El titular no será responsable de sus contenidos ni de sus condiciones de uso.`,
          },
        ],
      },
      {
        title: "6. Presupuestos",
        content: `Los presupuestos se elaborarán de acuerdo con la información facilitada por el cliente y, cuando sea necesario, con las mediciones, visitas o comprobaciones efectuadas en el lugar de realización del trabajo.

Los precios, materiales, plazos y demás condiciones aplicables serán los que figuren en cada presupuesto.`,
      },
      {
        title: "7. Protección de datos",
        content: `Los datos personales facilitados por los usuarios serán tratados conforme a la Política de Privacidad publicada en esta página web.`,
      },
      {
        title: "8. Cookies",
        content: `La página web podrá utilizar cookies técnicas necesarias para su funcionamiento y, en su caso, otras cookies sometidas al consentimiento del usuario.

La información sobre las cookies utilizadas se incluirá en la correspondiente Política de Cookies.`,
      },
      {
        title: "9. Legislación aplicable",
        content: `Las presentes condiciones se rigen por la legislación española.

Cualquier controversia se someterá a los juzgados y tribunales que resulten competentes conforme a la normativa aplicable, especialmente cuando el usuario tenga la condición de consumidor.`,
      },
    ],
    helmet: {
      title: "AluPVC Barcelona | Aviso Legal",
      description: {
        name: "description",
        content:
          "Aviso Legal de AluPVC Barcelona. Información sobre el titular del sitio web, condiciones de uso, propiedad intelectual, responsabilidad, protección de datos y legislación aplicable.",
      },
      keywords: {
        name: "keywords",
        content:
          "aviso legal, condiciones de uso, LSSI, propiedad intelectual, protección de datos, AluPVC Barcelona, ventanas PVC, ventanas aluminio, cerramientos",
      },
      canonical: `https://alupvcbarcelona.com/${PATH}`,
    },
  };

  return content;
};

export default LEGAL_CONTENT; */


const LEGAL_CONTENT = (PATH) => {
  const content = {
    title: "Aviso Legal",

    sections: [
      {
        title: "1. Identificación del titular",
        content: `En cumplimiento de lo establecido en la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y del comercio electrónico, se informa de que el titular de esta página web es:

Titular: Keiner José Castañeda Navarro
NIF: 60428129E
Domicilio profesional: Calle Bergantí Caupolicán, 30 - El Masnou (Barcelona)
Teléfono: 631 95 73 78
Correo electrónico: keinercastanedanavarro@gmail.com
Página web: https://alupvcbarcelona.com
Actividad: Fabricación, suministro e instalación de ventanas, cerramientos y demás elementos de carpintería metálica, aluminio y PVC.`,
      },

      {
        title: "2. Finalidad de la página web",
        content: `La página web tiene como finalidad informar sobre los servicios profesionales prestados por su titular y permitir que los usuarios puedan realizar consultas, solicitar información o pedir presupuestos relacionados con trabajos de carpintería metálica, aluminio y PVC.

La solicitud de información o de un presupuesto a través de la página web no implica la contratación automática del servicio. La contratación se entenderá formalizada cuando el cliente acepte expresamente el presupuesto y las condiciones comunicadas por el titular.`,
      },

      {
        title: "3. Condiciones de uso",
        subsections: [
          {
            subtitle: "Uso de la página web",
            content: `El acceso y utilización de esta página web atribuye la condición de usuario. El usuario se compromete a utilizar la web y sus contenidos de forma lícita, diligente y conforme a la buena fe.`,
          },
          {
            subtitle: "Queda prohibido",
            content: `- Utilizar la web para realizar actividades ilícitas o contrarias a la normativa aplicable.
- Introducir virus, código malicioso o cualquier elemento que pueda dañar, alterar o impedir el funcionamiento de la web.
- Intentar acceder sin autorización a sistemas, paneles, bases de datos o zonas restringidas.
- Facilitar datos falsos o datos personales de terceras personas sin estar autorizado para ello.`,
          },
        ],
      },

      {
        title: "4. Propiedad intelectual e industrial",
        content: `Los textos, fotografías, diseños, logotipos, signos distintivos y demás contenidos de esta página web pertenecen a su titular o se utilizan con la correspondiente autorización o licencia.

No está permitida su reproducción, distribución, transformación o utilización con fines comerciales sin autorización previa y por escrito, salvo en los casos legalmente permitidos.`,
      },

      {
        title: "5. Responsabilidad",
        subsections: [
          {
            subtitle: "Información publicada",
            content: `El titular procurará que la información publicada sea correcta y se encuentre actualizada, pero no garantiza la inexistencia de errores ni la disponibilidad ininterrumpida de la página web.`,
          },
          {
            subtitle: "Limitación de responsabilidad",
            content: `El titular tampoco responderá de las consecuencias derivadas de usos ilícitos o indebidos de la web, ni de actuaciones de terceros ajenas a su control, sin perjuicio de las responsabilidades que legalmente resulten exigibles.`,
          },
          {
            subtitle: "Enlaces a terceros",
            content: `Los enlaces a páginas de terceros, si los hubiera, se facilitan con carácter informativo. El titular no controla sus contenidos, políticas o condiciones y no asume responsabilidad sobre ellos fuera de los supuestos previstos legalmente.`,
          },
        ],
      },

      {
        title: "6. Solicitudes de presupuesto",
        content: `Los presupuestos se elaborarán de acuerdo con la información facilitada por el interesado y, cuando resulte necesario, con las mediciones, visitas o comprobaciones técnicas realizadas en el lugar de ejecución de los trabajos.

Los precios, materiales, plazos, impuestos, forma de pago y demás condiciones aplicables serán los que figuren en cada presupuesto.`,
      },

      {
        title: "7. Protección de datos",
        content: `Los datos personales facilitados por los usuarios serán tratados conforme a la Política de Privacidad publicada en esta página web.`,
      },

      {
        title: "8. Cookies",
        content: `La página web podrá utilizar cookies técnicas necesarias para su funcionamiento y, en su caso, otras cookies o tecnologías similares sujetas a información y consentimiento.

La información concreta sobre las cookies utilizadas se recogerá en la Política de Cookies de la web.`,
      },

      {
        title: "9. Legislación aplicable",
        content: `Las presentes condiciones se rigen por la legislación española.

Cualquier controversia se someterá a los órganos judiciales que resulten competentes conforme a la normativa aplicable.

Cuando el usuario tenga la condición de consumidor, se respetarán en todo caso las reglas imperativas de competencia territorial y protección de consumidores.`,
      },
    ],

    helmet: {
      title: "AluPVC Barcelona | Aviso Legal",

      description: {
        name: "description",
        content:
          "Aviso Legal de AluPVC Barcelona. Información sobre el titular del sitio web, finalidad, condiciones de uso, propiedad intelectual, responsabilidad, presupuestos, protección de datos, cookies y legislación aplicable.",
      },

      keywords: {
        name: "keywords",
        content:
          "aviso legal, condiciones de uso, LSSI, propiedad intelectual, protección de datos, cookies, presupuestos, AluPVC Barcelona, ventanas PVC, ventanas aluminio, cerramientos, carpintería metálica",
      },

      canonical: `https://alupvcbarcelona.com/${PATH}`,
    },
  };

  return content;
};

export default LEGAL_CONTENT;