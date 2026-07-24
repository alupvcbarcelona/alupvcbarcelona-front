const PRIVACY_CONTENT = (PATH) => {
  const content = {
    title: "Política de Privacidad de AluPVC Barcelona",
    sections: [
      {
        title:
          "1. Identidad y Datos de Contacto del Responsable del Tratamiento",
        content: `En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), y de la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD), le informamos de que los datos personales facilitados a través del sitio web serán tratados por:

Responsable del tratamiento: AluPVC Barcelona
NIF: [COMPLETAR]
Dirección: [COMPLETAR]
Correo electrónico: [COMPLETAR]
`,
      },
      {
        title:
          "2. Datos Personales que Recopilamos y Finalidad del Tratamiento",
        subsections: [
          {
            subtitle: "Datos recopilados",
            content: `Podremos recopilar los siguientes datos personales cuando el usuario contacte con nosotros o solicite información:

- Nombre y apellidos.
- Dirección de correo electrónico.
- Número de teléfono.
- Dirección del inmueble (cuando sea necesaria para elaborar un presupuesto).
- Información facilitada voluntariamente en formularios o comunicaciones.
`,
          },
          {
            subtitle: "Finalidades del tratamiento",
            content: `Los datos personales serán tratados con las siguientes finalidades:

- Atender consultas realizadas a través del sitio web.
- Elaborar y enviar presupuestos personalizados.
- Gestionar la contratación de nuestros productos y servicios.
- Coordinar visitas técnicas e instalaciones.
- Mantener comunicaciones relacionadas con los trabajos contratados.
- Cumplir las obligaciones legales aplicables.
`,
          },
        ],
      },
      {
        title: "3. Legitimación para el Tratamiento",
        content: `La base jurídica del tratamiento de los datos es:

- El consentimiento del interesado al enviar un formulario de contacto.
- La ejecución de un contrato o la aplicación de medidas precontractuales cuando se solicita un presupuesto o se contrata un servicio.
- El cumplimiento de obligaciones legales.
- El interés legítimo del responsable para mejorar la atención al cliente y garantizar la seguridad del sitio web.`,
      },
      {
        title: "4. Comunicación de los Datos",
        content: `Los datos personales no serán cedidos a terceros salvo obligación legal o cuando sea necesario para la prestación del servicio.

En caso necesario, podrán tener acceso a los datos proveedores que actúen como encargados del tratamiento (por ejemplo, servicios de alojamiento web, correo electrónico o gestión informática), siempre bajo contrato y cumpliendo la normativa vigente en materia de protección de datos.`,
      },
      {
        title: "5. Conservación de los Datos",
        content: `Los datos personales se conservarán durante el tiempo necesario para atender la solicitud realizada o mientras exista una relación contractual.

Posteriormente permanecerán bloqueados durante los plazos legalmente establecidos para atender posibles responsabilidades legales.`,
      },
      {
        title: "6. Derechos de los Usuarios",
        content: `El usuario puede ejercer en cualquier momento los siguientes derechos:

- Acceso.
- Rectificación.
- Supresión.
- Oposición.
- Limitación del tratamiento.
- Portabilidad de los datos.

Para ejercer estos derechos puede enviar una solicitud junto con un documento acreditativo de identidad al correo electrónico del responsable.

Asimismo, si considera que el tratamiento de sus datos no se ajusta a la normativa vigente, puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).`,
      },
      {
        title: "7. Medidas de Seguridad",
        content: `AluPVC Barcelona aplica las medidas técnicas y organizativas necesarias para garantizar la confidencialidad, integridad y disponibilidad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado.`,
      },
      {
        title: "8. Modificaciones de la Política de Privacidad",
        content: `AluPVC Barcelona podrá actualizar esta Política de Privacidad para adaptarla a novedades legislativas o cambios en los servicios ofrecidos. La versión vigente será siempre la publicada en este sitio web.`,
      },
      {
        title: "9. Contacto",
        content: `Para cualquier consulta relacionada con esta Política de Privacidad o con el tratamiento de sus datos personales puede contactar con nosotros a través del correo electrónico indicado en el apartado de identificación del responsable.`,
      },
    ],
    helmet: {
      title: "AluPVC Barcelona | Política de Privacidad",
      description: {
        name: "description",
        content:
          "Política de Privacidad de AluPVC Barcelona. Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD.",
      },
      keywords: {
        name: "keywords",
        content:
          "política privacidad, protección datos, RGPD, LOPDGDD, AluPVC Barcelona, ventanas PVC, ventanas aluminio, cerramientos",
      },
      canonical: `https://alupvcbarcelona.com${PATH}`,
    },
  };

  return content;
};

export default PRIVACY_CONTENT;
