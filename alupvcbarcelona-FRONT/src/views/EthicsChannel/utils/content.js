export const ETHICS_CHANNEL_CONTENT = (PATH) => {
    const content = {
      body: {
        title: 'Canal Ético',
        description: `
Bienvenido al Canal Ético. Este es un espacio confidencial y seguro donde los colaboradores, clientes, proveedores o cualquier parte interesada pueden reportar conductas contrarias a los valores éticos, normas internas, o cualquier incumplimiento legal relacionado con nuestra plataforma. 

Nuestro compromiso es garantizar la integridad y la transparencia en todas nuestras acciones. A través de este canal, puedes informar sobre situaciones como:
- Fraude, corrupción o sobornos.
- Conflictos de interés.
- Discriminación, acoso o cualquier comportamiento inapropiado.
- Incumplimientos normativos o legales.
- Cualquier otra conducta que pueda comprometer la ética de nuestra organización.

Todas las comunicaciones realizadas a través de este canal serán tratadas de manera estrictamente confidencial, y se garantizará la protección de los denunciantes, conforme a la normativa vigente.

Si tienes alguna duda o prefieres comunicarte a través de otros medios, puedes contactarnos en packeo.es@gmail.com.
      `
    },
      helmet: {
        title: 'Packeo | Canal ético',
        description: {
          name: 'description',
          content: 'Packeo: El Canal Ético es un espacio confidencial y seguro para reportar conductas contrarias a los valores éticos y normativas de nuestra plataforma.'
        },
        keywords: {
          name: 'keywords',
          content:
            'canal etico, privacidad, seguridad, confianza, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
        },
        canonical: `https://packeo.es${PATH}`
      }
    }
    return content
  } 