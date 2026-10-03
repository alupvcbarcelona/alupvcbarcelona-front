export const DOC_STATUS = {
  borrador: { label: "Borrador", tone: null },
  enviado: { label: "Enviado", tone: "info" },
  pendiente: { label: "Pendiente", tone: "warning" },
  aceptado: { label: "Aceptado", tone: "success" },
  rechazado: { label: "Rechazado", tone: "danger" },
  pagado: { label: "Pagada", tone: "success" },
  vencido: { label: "Vencido", tone: "danger" },
  anulado: { label: "Anulada", tone: null },
};

export const STATUS_BY_TYPE = {
  presupuesto: ["borrador", "enviado", "aceptado", "rechazado", "vencido"],
  factura: ["pendiente", "enviado", "pagado", "vencido", "anulado"],
};

export const MESSAGE_STATUS = {
  nuevo: { label: "Nuevo", tone: "accent" },
  leido: { label: "Leído", tone: null },
  respondido: { label: "Respondido", tone: "success" },
  archivado: { label: "Archivado", tone: null },
};

export const EVENT_TYPES = {
  visita: "Visita",
  medicion: "Medición",
  instalacion: "Instalación",
  reparacion: "Reparación",
  otro: "Otro",
};

export const DOC_LABEL = { presupuesto: "Presupuesto", factura: "Factura" };
