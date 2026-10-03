import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { Button, Input, Modal, Select, Switch, Textarea } from "../ui";
import { api } from "../../services/api";
import { EVENT_TYPES } from "../../lib/labels";

const pad = (n) => String(n).padStart(2, "0");
const toLocalDate = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toLocalTime = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

const fromEvent = (event, defaults = {}) => {
  const start = event?.start ? new Date(event.start) : defaults.date ? new Date(`${defaults.date}T09:00`) : new Date(Date.now() + 86400000);
  if (!event?.start && !defaults.date) start.setHours(9, 0, 0, 0);
  const end = event?.end ? new Date(event.end) : new Date(start.getTime() + 3600000);
  if (event?.allDay) end.setDate(end.getDate() - 1);
  return {
    summary: event?.summary || defaults.summary || "",
    type: event?.type || defaults.type || "visita",
    date: toLocalDate(start),
    startTime: toLocalTime(start),
    endTime: toLocalTime(end),
    allDay: Boolean(event?.allDay),
    location: event?.location || defaults.location || "",
    description: event?.description || defaults.description || "",
    attendeeEmail: event?.attendees?.[0]?.email || defaults.attendeeEmail || "",
    notify: false,
    messageId: event?.messageId || defaults.messageId,
    documentId: event?.documentId || defaults.documentId,
  };
};

// ----------------------
// CREAR / EDITAR CITA EN GOOGLE CALENDAR
// ----------------------
// EL FORMULARIO SE MONTA DE NUEVO CADA VEZ QUE SE ABRE (ESTADO LIMPIO)
const EventModal = (props) => (props.open ? <EventForm key={props.event?.id || JSON.stringify(props.defaults || {})} {...props} /> : null);

const EventForm = ({ open, onClose, event, defaults, onSaved }) => {
  const [form, setForm] = useState(() => fromEvent(event, defaults));
  const [saving, setSaving] = useState(false);

  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async () => {
    if (!form.summary.trim()) return toast.error("Indica un título para la cita.");
    setSaving(true);
    const body = {
      summary: form.summary,
      type: form.type,
      allDay: form.allDay,
      start: form.allDay ? form.date : new Date(`${form.date}T${form.startTime}`).toISOString(),
      end: form.allDay ? form.date : new Date(`${form.date}T${form.endTime}`).toISOString(),
      location: form.location,
      description: form.description,
      attendeeEmail: form.attendeeEmail,
      notify: form.notify,
      messageId: form.messageId,
      documentId: form.documentId,
    };
    try {
      const res = await api(event?.id ? `/calendar/events/${event.id}` : "/calendar/events", { method: event?.id ? "PUT" : "POST", body });
      toast.success(res.message);
      onSaved?.(res.data);
      onClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("¿Eliminar esta cita de Google Calendar?")) return;
    try {
      await api(`/calendar/events/${event.id}?notify=${Boolean(event.attendees?.length)}`, { method: "DELETE" });
      toast.success("Cita eliminada.");
      onSaved?.(null);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={event?.id ? "Editar cita" : "Nueva cita"}
      footer={
        <>
          {event?.id && <Button variant="danger" icon={Trash2} onClick={remove} style={{ marginRight: "auto" }}>Eliminar</Button>}
          {event?.htmlLink && <Button variant="ghost" href={event.htmlLink} target="_blank" rel="noopener noreferrer">Abrir en Google</Button>}
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={save} loading={saving}>Guardar</Button>
        </>
      }
    >
      <Input label="Título *" value={form.summary} onChange={set("summary")} placeholder="Ej. Medición ventanas · Ana López" autoFocus />
      <div className="grid-2">
        <Select label="Tipo" value={form.type} onChange={set("type")} options={Object.entries(EVENT_TYPES).map(([value, label]) => ({ value, label }))} />
        <Input label="Fecha" type="date" value={form.date} onChange={set("date")} />
        {!form.allDay && (
          <>
            <Input label="Inicio" type="time" value={form.startTime} onChange={set("startTime")} />
            <Input label="Fin" type="time" value={form.endTime} onChange={set("endTime")} />
          </>
        )}
      </div>
      <Switch label="Todo el día" checked={form.allDay} onChange={set("allDay")} />
      <Input label="Dirección" value={form.location} onChange={set("location")} placeholder="Calle, número, localidad" />
      <Textarea label="Notas" rows={3} value={form.description} onChange={set("description")} />
      <Input label="Email del cliente" type="email" value={form.attendeeEmail} onChange={set("attendeeEmail")} hint="Opcional. Se añade como invitado a la cita." />
      {form.attendeeEmail && <Switch label="Enviar invitación por email al cliente" checked={form.notify} onChange={set("notify")} />}
    </Modal>
  );
};

export default EventModal;
