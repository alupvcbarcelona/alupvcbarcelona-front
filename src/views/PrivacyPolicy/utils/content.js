const PRIVACY_CONTENT = (PATH) => {
  const content = {
    title: "Política de Privacidad",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        content: `El responsable del tratamiento de los datos personales facilitados a través de esta página web es:

Responsable: Keiner José Castañeda Navarro
NIF: 60428129E
Domicilio profesional: Calle Bergantí Caupolicán, número 30, El Masnou, Barcelona
Teléfono: 631 95 73 78
Correo electrónico: alupvcbarcelona@gmail.com`,
      },
      {
        title: "2. Datos personales tratados",
        subsections: [
          {
            subtitle: "Datos que pueden recopilarse",
            content: `A través de la página web podrán tratarse los siguientes datos:

- Nombre.
- Correo electrónico.
- Teléfono.
- Dirección postal.
- Información sobre la consulta o solicitud de presupuesto.
- Consultas y comunicaciones mantenidas con el cliente.`,
          },
          {
            subtitle: "Información adicional",
            content: `El usuario deberá abstenerse de facilitar datos que no sean necesarios para atender su consulta o elaborar el presupuesto.`,
          },
        ],
      },
      {
        title: "3. Finalidades del tratamiento",
        content: `Los datos personales se utilizarán para:

- Atender consultas y solicitudes de información.
- Contactar con las personas interesadas.
- Concertar visitas o mediciones.
- Elaborar, enviar y gestionar presupuestos.
- Gestionar la aceptación del presupuesto.
- Prestar los servicios contratados.
- Gestionar la facturación y el cobro.
- Cumplir las obligaciones fiscales, contables y administrativas.
- Atender incidencias, reclamaciones y garantías.

Los datos no se utilizarán para enviar publicidad sin una base jurídica válida o sin la autorización correspondiente.`,
      },
      {
        title: "4. Base jurídica",
        content: `El tratamiento de los datos se fundamenta en:

- La aplicación de medidas precontractuales solicitadas por el interesado, cuando pide información o un presupuesto.
- La ejecución del contrato, cuando el presupuesto es aceptado.
- El cumplimiento de obligaciones legales, especialmente fiscales y contables.
- El consentimiento del interesado, cuando sea necesario para una finalidad concreta.`,
      },
      {
        title: "5. Conservación de los datos",
        content: `Los datos se conservarán durante el tiempo necesario para atender la consulta o gestionar el presupuesto.

Cuando el presupuesto sea aceptado, se conservarán durante la relación contractual y, posteriormente, durante los plazos exigidos por la normativa fiscal, contable y de prescripción de responsabilidades.

Los presupuestos no aceptados se conservarán durante un plazo razonable para su seguimiento y para atender posibles consultas o reclamaciones. Finalizado dicho plazo, serán eliminados.`,
      },
      {
        title: "6. Destinatarios",
        subsections: [
          {
            subtitle: "Comunicación de datos",
            content: `Los datos no se venderán ni se cederán a terceros, salvo obligación legal o cuando resulte necesario para prestar el servicio.`,
          },
          {
            subtitle: "Podrán tener acceso a los datos",
            content: `- La asesoría fiscal o contable.
- El proveedor de alojamiento de la página web.
- El proveedor de correo electrónico.
- El profesional encargado del mantenimiento informático.
- Los proveedores o colaboradores que deban intervenir en la ejecución del trabajo.
- Las administraciones públicas y autoridades competentes cuando exista una obligación legal.

Los proveedores que traten datos por cuenta del responsable deberán hacerlo conforme a sus instrucciones y a la normativa de protección de datos.`,
          },
        ],
      },
      {
        title: "7. Transferencias internacionales",
        content: `En principio, no se prevé realizar transferencias internacionales de datos.

No obstante, si alguno de los proveedores tecnológicos trata información fuera del Espacio Económico Europeo, se comprobará que existan las garantías exigidas por la normativa.`,
      },
      {
        title: "8. Derechos de los interesados",
        content: `El interesado puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad.

Para ello, puede enviar una solicitud a:

Correo electrónico: alupvcbarcelona@gmail.com
Dirección postal: Calle Bergantí Caupolicán, número 30, El Masnou, Barcelona.

La solicitud deberá identificar al interesado e indicar el derecho que desea ejercer.

También podrá presentar una reclamación ante la Agencia Española de Protección de Datos.`,
      },
      {
        title: "9. Seguridad de la información",
        content: `El responsable adoptará las medidas técnicas y organizativas necesarias para proteger los datos personales frente a su pérdida, alteración, acceso no autorizado o divulgación.`,
      },
      {
        title: "10. Exactitud de los datos",
        content: `El usuario garantiza que los datos proporcionados son verdaderos, exactos y están actualizados.

Cuando facilite datos de otra persona, declara disponer de autorización para ello.`,
      },
      {
        title: "11. Menores de edad",
        content: `Los servicios ofrecidos en esta página web no están dirigidos específicamente a menores de edad.

Los menores no deberán facilitar datos personales sin autorización de sus padres o representantes legales.`,
      },
      {
        title: "12. Modificación de la política",
        content: `La presente Política de Privacidad podrá actualizarse cuando resulte necesario por cambios normativos, técnicos o en los servicios ofrecidos.

La versión vigente será la que se encuentre publicada en la página web.`,
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
          "política de privacidad, RGPD, protección de datos, LOPDGDD, AluPVC Barcelona, ventanas PVC, ventanas aluminio, cerramientos, presupuestos",
      },
      canonical: `https://alupvcbarcelona.com/${PATH}`,
    },
  };

  return content;
};

export default PRIVACY_CONTENT;
