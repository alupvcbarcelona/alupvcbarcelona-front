const PRIVACY_CONTENT = (PATH) => {
  const content = {
    title: 'Política de Privacidad de Packeo.es',
    sections: [
      {
        title:
          '1. Identidad y Datos de Contacto del Responsable del Tratamiento',
        content: `En cumplimiento de lo dispuesto en el Reglamento General de Protección de Datos (Reglamento UE 2016/679, en adelante RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (Ley 3/2018, en adelante LOPDGDD), informamos que los datos personales facilitados a través de la plataforma Packeo.es serán tratados por:
          
Responsable del tratamiento: Packeo.es
Correo electrónico de contacto: packeo.es@gmail.com`
      },
      {
        title:
          '2. Datos Personales que Recopilamos y Finalidad del Tratamiento',
        subsections: [
          {
            subtitle: 'Datos Recopilados',
            content: `Para el correcto uso de nuestra plataforma y la prestación de los servicios ofrecidos, recopilamos los siguientes datos personales de los usuarios:

- Nombre completo.
- Dirección de correo electrónico.
- Número de teléfono.
- Contraseña para el acceso a la cuenta.

`
          },
          {
            subtitle: 'Finalidades del Tratamiento',
            content: `Los datos recopilados se utilizarán con las siguientes finalidades:
- Gestión de cuentas de usuario: Para permitir el registro, acceso y uso de los servicios ofrecidos por Packeo.es.
- Asignación de combos: Permitir que los restaurantes o establecimientos comerciales asignen combos a los usuarios registrados.
- Comunicación con los usuarios: Responder a consultas, dudas o incidencias relacionadas con el uso de la plataforma.
- Cumplimiento de obligaciones legales: Para garantizar el cumplimiento de las normativas vigentes aplicables.`
          }
        ]
      },
      {
        title: '3. Legitimación para el Tratamiento de Datos',
        content: `El tratamiento de los datos personales de los usuarios se realiza con base en las siguientes legitimaciones:

- Ejecución de un contrato: Para la prestación de los servicios solicitados a través de la plataforma Packeo.es.
- Consentimiento del usuario: Mediante la aceptación expresa de estas políticas de privacidad en el momento de registro en la plataforma.
- Interés legítimo: Para garantizar la seguridad de los datos y el correcto funcionamiento de los servicios.`
      },
      {
        title: '4. Comunicación de los Datos a Terceros',
        content: `Los datos personales de los usuarios no serán cedidos a terceros sin su consentimiento previo, salvo en los casos en que sea necesario para el cumplimiento de obligaciones legales.

En el caso de los restaurantes o establecimientos comerciales asociados a Packeo.es, únicamente tendrán acceso al nombre, correo electrónico y número de teléfono de los usuarios registrados para gestionar los combos asignados. Estos establecimientos son responsables del uso adecuado de los datos personales conforme a la normativa vigente.`
      },
      {
        title: '5. Conservación de los Datos',
        content: `Los datos personales serán conservados durante el tiempo necesario para cumplir con las finalidades descritas en estas políticas de privacidad, mientras exista una relación contractual con el usuario, y durante el período exigido para el cumplimiento de obligaciones legales o para la defensa ante posibles reclamaciones.`
      },
      {
        title: '6. Derechos de los Usuarios',
        content: `Los usuarios de Packeo.es tienen derecho a:

- Acceso: Obtener confirmación sobre si estamos tratando sus datos personales y acceder a los mismos.
- Rectificación: Solicitar la corrección de datos inexactos o incompletos.
- Supresión: Solicitar la eliminación de sus datos personales cuando ya no sean necesarios para los fines para los que fueron recogidos.
- Oposición: Oponerse al tratamiento de sus datos personales por motivos relacionados con su situación particular.
- Portabilidad: Solicitar la transferencia de sus datos a otro responsable del tratamiento, cuando sea técnicamente posible.
- Limitación del tratamiento: Solicitar que limitemos el uso de sus datos en determinadas circunstancias.

Para ejercer estos derechos, los usuarios pueden contactar al correo electrónico: packeo.es@gmail.com. Es posible que solicitemos documentación para verificar la identidad del solicitante antes de proceder con su solicitud.`
      },
      {
        title: '7. Medidas de Seguridad',
        content: `Packeo.es se compromete a garantizar la seguridad y confidencialidad de los datos personales de los usuarios. Para ello, hemos implementado medidas técnicas y organizativas adecuadas para prevenir el acceso no autorizado, pérdida, alteración o divulgación indebida de los datos.`
      },
      {
        title: '8. Modificaciones a la Política de Privacidad',
        content: `Packeo.es se reserva el derecho de modificar esta Política de Privacidad en cualquier momento. En caso de cambios significativos, notificaremos a los usuarios a través de la plataforma o mediante el correo electrónico registrado.`
      },
      {
        title: '9. Contacto para Dudas o Consultas',
        content: `Si los usuarios tienen dudas, comentarios o inquietudes relacionadas con esta Política de Privacidad, pueden contactar con nosotros a través del correo electrónico: packeo.es@gmail.com.`
      }
    ],
    helmet: {
      title: 'Packeo | Politicas Privacidad',
      description: {
        name: 'description',
        content: 'Packeo: Nuestras politicas de privacidad.'
      },
      keywords: {
        name: 'keywords',
        content:
          'Privacidad, seguridad, confianza, Packeo, ahorro, packs, restauración, cafeterías, té, bebidas, descuentos, lealtad de clientes, marketing, negocios, fidelizar clientes'
      },
      canonical: `https://packeo.es${PATH}`
    }
  }
  return content
} 

export default PRIVACY_CONTENT