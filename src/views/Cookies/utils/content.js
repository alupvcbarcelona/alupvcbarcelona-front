/* export const COOKIES_CONTENT = (PATH) => {
  const content = {
    body: {
      title: 'Política de Cookies',
      description:
        'Este sitio web no utiliza cookies propias ni de terceros para recopilar información de los usuarios.'
    },
    content: [
      {
        title: 'Uso de cookies',
        description: `AluPVC Barcelona informa a los usuarios de que este sitio web no utiliza cookies propias ni de terceros para recoger información personal, realizar análisis de navegación o mostrar publicidad personalizada.`
      },
      {
        title: '¿Qué son las cookies?',
        description: `Las cookies son pequeños archivos que los sitios web almacenan en el dispositivo del usuario para recordar información sobre su navegación o mejorar determinados servicios. Actualmente, este sitio web no utiliza este tipo de tecnologías.`
      },
      {
        title: 'Cookies utilizadas',
        description: `Actualmente este sitio web no instala ningún tipo de cookie en el navegador del usuario.`
      },
      {
        title: 'Cambios en esta política',
        description: `AluPVC Barcelona podrá actualizar esta Política de Cookies si en el futuro incorpora cookies o tecnologías similares. En ese caso, la política se adaptará a la normativa vigente y se informará adecuadamente a los usuarios.`
      }
    ],
    helmet: {
      title: 'AluPVC Barcelona | Política de Cookies',
      description: {
        name: 'description',
        content:
          'Política de Cookies de AluPVC Barcelona.'
      },
      keywords: {
        name: 'keywords',
        content:
          'cookies, política de cookies, AluPVC Barcelona'
      },
      canonical: `https://alupvcbarcelona.com${PATH}`
    }
  }

  return content
} */

export const COOKIES_CONTENT = (PATH) => {
  const content = {
    body: {
      title: "Política de Cookies",
      description:
        "Este sitio web no utiliza cookies propias ni de terceros para recopilar información de los usuarios.",
    },

    content: [
      {
        title: "1. Responsable",
        description: `El responsable de este sitio web es:

Titular: Keiner José Castañeda Navarro
NIF: 60428129E
Correo electrónico: keinercastanedanavarro@gmail.com
Sitio web: https://alupvcbarcelona.com`,
      },

      {
        title: "2. ¿Qué son las cookies?",
        description: `Las cookies son pequeños archivos o dispositivos de almacenamiento que una página web puede instalar o leer en el dispositivo del usuario durante la navegación.

Pueden utilizarse, entre otras funciones, para permitir el funcionamiento técnico de la web, recordar preferencias, reforzar la seguridad, obtener estadísticas de uso o integrar servicios de terceros.`,
      },

      {
        title: "3. Cookies utilizadas",
        description: `Actualmente, este sitio web no utiliza cookies propias ni de terceros para recopilar información de los usuarios.

La página web tampoco utiliza actualmente cookies de análisis, medición, publicidad comportamental o personalización.

Por este motivo, en el momento actual no se requiere un mecanismo de consentimiento para cookies opcionales.`,
      },

      {
        title: "4. Servicios de terceros",
        description: `Actualmente, el sitio web no integra servicios de terceros que utilicen cookies para realizar análisis de navegación, publicidad personalizada o seguimiento de los usuarios.

En caso de incorporar en el futuro servicios de terceros que utilicen cookies o tecnologías similares, esta Política de Cookies será actualizada para identificar dichos servicios, sus finalidades, duración y demás información que resulte necesaria.`,
      },

      {
        title: "5. Consentimiento y configuración",
        description: `Dado que actualmente el sitio web no utiliza cookies que requieran el consentimiento del usuario, no se muestra un banner específico de consentimiento de cookies.

Si en el futuro se incorporasen cookies no necesarias, estas no se instalarán hasta que el usuario haya prestado el consentimiento cuando este resulte legalmente exigible. En ese caso, se habilitará el mecanismo correspondiente para aceptar, rechazar o configurar las cookies opcionales.`,
      },

      {
        title: "6. Cómo bloquear o eliminar cookies",
        description: `Aunque actualmente este sitio web no utiliza cookies propias ni de terceros, el usuario puede configurar su navegador para permitir, bloquear o eliminar las cookies almacenadas en su dispositivo.

La configuración de las cookies depende del navegador utilizado por el usuario.`,
      },

      {
        title: "7. Actualización de la Política de Cookies",
        description: `Esta Política de Cookies podrá modificarse cuando cambien las cookies utilizadas, los servicios de terceros, la configuración de la web o la normativa aplicable.

La versión vigente será la publicada en esta página web.`,
      },
    ],

    helmet: {
      title: "AluPVC Barcelona | Política de Cookies",

      description: {
        name: "description",
        content:
          "Política de Cookies de AluPVC Barcelona. Actualmente este sitio web no utiliza cookies propias ni de terceros.",
      },

      keywords: {
        name: "keywords",
        content: "política de cookies, cookies, privacidad, AluPVC Barcelona",
      },

      canonical: `https://alupvcbarcelona.com${PATH}`,
    },
  };

  return content;
};
