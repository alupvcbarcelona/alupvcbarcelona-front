export const COOKIES_CONTENT = (PATH) => {
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
}