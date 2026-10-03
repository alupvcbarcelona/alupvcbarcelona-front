import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Archive, ArrowLeft, CalendarPlus, FilePlus2, Inbox, Mail, Phone, Search, Send, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import EventModal from "../../components/admin/EventModal";
import { Badge, Button, Empty, Input, PageLoader, Segmented, Spinner, Textarea } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api } from "../../services/api";
import { country, dateTime, DEVICE_LABEL, relative } from "../../lib/format";
import { MESSAGE_STATUS } from "../../lib/labels";

const FILTERS = [
  { value: "", label: "Bandeja" },
  { value: "nuevo", label: "Nuevas" },
  { value: "respondido", label: "Respondidas" },
  { value: "archivado", label: "Archivadas" },
];

const Detail = ({ id, onChange, onBack }) => {
  const { data, loading, error, setData } = useApi(`/contact/${id}`);
  const loaded = Boolean(data?.data);

  // AL ABRIRLA SE MARCA COMO LEÍDA: REFRESCAR LA LISTA
  useEffect(() => {
    if (loaded) onChange();
  }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="inbox__empty"><Spinner /></div>;
  if (error || !data?.data) return <Empty title="Solicitud no encontrada" />;
  return <DetailBody m={data.data} setData={setData} onChange={onChange} onBack={onBack} />;
};

const DetailBody = ({ m, setData, onChange, onBack }) => {
  const navigate = useNavigate();
  const [reply, setReply] = useState(() => ({
    subject: `Re: tu solicitud${m.service ? ` de ${m.service.toLowerCase()}` : ""}`,
    body: `Hola ${m.name.split(" ")[0]},\n\n`,
  }));
  const [notes, setNotes] = useState(m.notes || "");
  const [sending, setSending] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  const update = async (body, message) => {
    try {
      const res = await api(`/contact/${m._id}`, { method: "PATCH", body });
      setData(res);
      onChange();
      if (message) toast.success(message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sendReply = async () => {
    setSending(true);
    try {
      const res = await api(`/contact/${m._id}/reply`, { method: "POST", body: reply });
      setData(res);
      onChange();
      toast.success("Respuesta enviada.");
      setReply((r) => ({ ...r, body: "" }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  const remove = async () => {
    if (!window.confirm("¿Eliminar esta solicitud definitivamente?")) return;
    await api(`/contact/${m._id}`, { method: "DELETE" });
    toast.success("Solicitud eliminada.");
    onChange();
    navigate("/admin/solicitudes");
  };

  const toQuote = () => {
    const params = new URLSearchParams({ tipo: "presupuesto", nombre: m.name, email: m.email, telefono: m.phone || "", ciudad: m.city || "", titulo: m.service || "" });
    navigate(`/admin/documentos/nuevo?${params}`);
  };

  return (
    <div className="message-view">
      <Button variant="ghost" size="sm" icon={ArrowLeft} className="inbox__back" onClick={onBack}>Volver</Button>
      <div className="message-view__head">
        <div>
          <h2>{m.name}</h2>
          <p className="small muted">{dateTime(m.createdAt)} · {m.service || "Consulta general"}</p>
        </div>
        <Badge tone={MESSAGE_STATUS[m.status].tone}>{MESSAGE_STATUS[m.status].label}</Badge>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button size="sm" icon={FilePlus2} onClick={toQuote}>Crear presupuesto</Button>
        <Button size="sm" variant="secondary" icon={CalendarPlus} onClick={() => setEventOpen(true)}>Agendar visita</Button>
        {m.phone && <Button size="sm" variant="secondary" icon={Phone} href={`tel:${m.phone}`}>Llamar</Button>}
        {m.status !== "archivado" ? (
          <Button size="sm" variant="ghost" icon={Archive} onClick={() => update({ status: "archivado" }, "Archivada.")}>Archivar</Button>
        ) : (
          <Button size="sm" variant="ghost" icon={Inbox} onClick={() => update({ status: "leido" }, "Movida a la bandeja.")}>Desarchivar</Button>
        )}
        <Button size="sm" variant="ghost" icon={Trash2} onClick={remove} aria-label="Eliminar" />
      </div>

      <dl className="message-meta">
        <div><dt>Email</dt><dd><a href={`mailto:${m.email}`}>{m.email}</a></dd></div>
        <div><dt>Teléfono</dt><dd>{m.phone || "—"}</dd></div>
        <div><dt>Localidad</dt><dd>{m.city || "—"}</dd></div>
        <div><dt>Enviado desde</dt><dd>{[m.meta?.city, country(m.meta?.country)].filter(Boolean).join(", ")} · {DEVICE_LABEL[m.meta?.device] || m.meta?.device}</dd></div>
      </dl>

      <div className="message-view__body">{m.message}</div>

      {m.replies?.length > 0 && (
        <div className="stack" style={{ gap: 12 }}>
          {m.replies.map((r, i) => (
            <div key={i} className="thread-message">
              <div className="thread-message__head"><strong>Tu respuesta · {r.subject}</strong><span className="muted">{dateTime(r.sentAt)}</span></div>
              <div className="thread-message__text">{r.body}</div>
            </div>
          ))}
        </div>
      )}

      <div className="reply-box">
        <h3 className="small" style={{ fontWeight: 600 }}>Responder por email</h3>
        <Input label="Asunto" value={reply.subject} onChange={(e) => setReply({ ...reply, subject: e.target.value })} />
        <Textarea rows={6} value={reply.body} onChange={(e) => setReply({ ...reply, body: e.target.value })} aria-label="Respuesta" />
        <div><Button icon={Send} onClick={sendReply} loading={sending} disabled={!reply.body.trim()}>Enviar respuesta</Button></div>
      </div>

      <div className="reply-box">
        <Textarea label="Notas internas" hint="Solo las ves tú." rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div><Button variant="secondary" size="sm" onClick={() => update({ notes }, "Notas guardadas.")} disabled={notes === (m.notes || "")}>Guardar notas</Button></div>
      </div>

      <EventModal
        open={eventOpen}
        onClose={() => setEventOpen(false)}
        defaults={{ summary: `Visita · ${m.name}`, type: "visita", location: m.city || "", description: `${m.service || ""}\n${m.phone || ""} · ${m.email}\n\n${m.message}`.trim(), attendeeEmail: m.email, messageId: m._id }}
      />
    </div>
  );
};

const Requests = () => {
  useSeo("Solicitudes");
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const { data, loading, reload } = useApi(`/contact?status=${status}&q=${encodeURIComponent(query)}`);

  useEffect(() => {
    const t = setTimeout(() => setQuery(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const messages = data?.data || [];

  return (
    <div className="stack">
      <PageHeader
        title="Solicitudes"
        description="Mensajes del formulario de contacto de la web. También te llegan por email."
        actions={<Button variant="secondary" icon={Mail} to="/admin/correo">Abrir correo</Button>}
      />
      <div className="toolbar">
        <Segmented label="Filtro" value={status} onChange={setStatus} options={FILTERS} />
        <div className="search">
          <Search aria-hidden="true" />
          <input className="input" placeholder="Buscar por nombre, email o texto" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        {data?.unread > 0 && <span className="small muted">{data.unread} sin leer</span>}
      </div>

      <div className={`inbox ${id ? "has-selection" : ""}`}>
        <div className="inbox__list">
          {loading && !data ? (
            <PageLoader />
          ) : messages.length ? (
            messages.map((m) => (
              <button key={m._id} className={`list-item ${m._id === id ? "is-active" : ""} ${m.status === "nuevo" ? "is-unread" : ""}`} onClick={() => navigate(`/admin/solicitudes/${m._id}`)}>
                <span className={`dot ${m.status === "nuevo" ? "" : "dot--off"}`} style={{ marginTop: 7 }} />
                <div className="list-item__main">
                  <span className="list-item__title">{m.name}</span>
                  <span className="list-item__sub" style={{ color: "var(--ink)" }}>{m.service || "Consulta general"}</span>
                  <span className="list-item__sub">{m.message}</span>
                </div>
                <span className="list-item__meta">{relative(m.createdAt)}</span>
              </button>
            ))
          ) : (
            <Empty icon={Inbox} title="No hay solicitudes" />
          )}
        </div>
        <div className="inbox__detail">
          {id ? <Detail key={id} id={id} onChange={reload} onBack={() => navigate("/admin/solicitudes")} /> : <div className="inbox__empty"><Empty icon={Inbox} title="Selecciona una solicitud" /></div>}
        </div>
      </div>
    </div>
  );
};

export default Requests;
