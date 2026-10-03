import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Archive, ArrowLeft, CircleAlert, Mail, Paperclip, PenSquare, RefreshCw, Reply, Search, Send, Star, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Button, Empty, Input, Modal, PageLoader, Segmented, Spinner, Textarea } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api, API_URL, getToken } from "../../services/api";
import { dateTime, parseAddress, relative } from "../../lib/format";

const FOLDERS = [
  { value: "inbox", label: "Recibidos" },
  { value: "unread", label: "No leídos" },
  { value: "starred", label: "Destacados" },
  { value: "sent", label: "Enviados" },
];

// HTML DEL EMAIL AISLADO EN UN IFRAME SIN SCRIPTS
const MailFrame = ({ html }) => {
  const ref = useRef(null);
  const resize = () => {
    const doc = ref.current?.contentDocument;
    if (doc) ref.current.style.height = `${Math.min(doc.documentElement.scrollHeight + 8, 4000)}px`;
  };
  return (
    <iframe
      ref={ref}
      title="Contenido del email"
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      srcDoc={`<!doctype html><html><head><base target="_blank"><meta charset="utf-8"><style>body{margin:16px;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#12151a;word-break:break-word}img{max-width:100%;height:auto}</style></head><body>${html}</body></html>`}
      onLoad={resize}
    />
  );
};

const download = async (messageId, att) => {
  const response = await fetch(`${API_URL}/mail/attachment/${messageId}/${att.attachmentId}?name=${encodeURIComponent(att.filename)}&type=${encodeURIComponent(att.mimeType)}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!response.ok) return toast.error("No se pudo descargar el adjunto.");
  const url = URL.createObjectURL(await response.blob());
  const a = Object.assign(document.createElement("a"), { href: url, download: att.filename });
  a.click();
  URL.revokeObjectURL(url);
};

const Thread = ({ id, onChange, onBack }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useApi(`/mail/${id}`);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const messages = data?.data?.messages || [];
  const account = data?.account;

  useEffect(() => {
    if (data) onChange();
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <div className="inbox__empty"><Spinner /></div>;
  if (error) return <Empty icon={CircleAlert} title="No se pudo abrir el correo">{error.message}</Empty>;

  const last = messages[messages.length - 1];
  const lastExternal = [...messages].reverse().find((m) => !parseAddress(m.from).email.includes(account)) || last;
  const replyTo = parseAddress(lastExternal.replyTo || lastExternal.from).email;
  const starred = messages.some((m) => m.labelIds.includes("STARRED"));

  const modify = async (body, message) => {
    try {
      await api(`/mail/${id}`, { method: "PATCH", body });
      toast.success(message);
      onChange();
      if (body.archive || body.trash) navigate("/admin/correo");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const send = async () => {
    setSending(true);
    try {
      await api("/mail/send", { method: "POST", body: { to: replyTo, body, threadId: id } });
      toast.success("Respuesta enviada.");
      setBody("");
      onChange();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="message-view">
      <Button variant="ghost" size="sm" icon={ArrowLeft} className="inbox__back" onClick={onBack}>Volver</Button>
      <div className="message-view__head">
        <h2>{messages[0]?.subject || "(sin asunto)"}</h2>
        <div style={{ display: "flex", gap: 4 }}>
          <Button size="sm" variant="ghost" icon={Star} aria-label={starred ? "Quitar destacado" : "Destacar"} onClick={() => modify({ starred: !starred }, starred ? "Quitado de destacados." : "Destacado.")} style={starred ? { color: "#c9922e" } : undefined} />
          <Button size="sm" variant="ghost" icon={Archive} aria-label="Archivar" onClick={() => modify({ archive: true }, "Conversación archivada.")} />
          <Button size="sm" variant="ghost" icon={Trash2} aria-label="Papelera" onClick={() => modify({ trash: true }, "Movida a la papelera.")} />
        </div>
      </div>

      {messages.map((m) => (
        <article key={m.id} className="thread-message">
          <div className="thread-message__head">
            <div>
              <strong>{parseAddress(m.from).name}</strong> <span className="muted">&lt;{parseAddress(m.from).email}&gt;</span>
              <div className="muted">Para: {m.to}</div>
            </div>
            <span className="muted">{dateTime(m.date)}</span>
          </div>
          {m.html ? <MailFrame html={m.html} /> : <div className="thread-message__text">{m.text || m.snippet}</div>}
          {m.attachments.length > 0 && (
            <div className="attachments">
              {m.attachments.map((a) => (
                <Button key={a.attachmentId} size="sm" variant="secondary" icon={Paperclip} onClick={() => download(m.id, a)}>
                  {a.filename} <span className="muted">({Math.round(a.size / 1024)} KB)</span>
                </Button>
              ))}
            </div>
          )}
        </article>
      ))}

      <div className="reply-box">
        <h3 className="small" style={{ fontWeight: 600 }}>Responder a {replyTo}</h3>
        <Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} aria-label="Respuesta" placeholder="Escribe tu respuesta…" />
        <div><Button icon={Reply} onClick={send} loading={sending} disabled={!body.trim()}>Enviar respuesta</Button></div>
      </div>
    </div>
  );
};

const Compose = ({ open, onClose }) => {
  const [form, setForm] = useState({ to: "", subject: "", body: "" });
  const [sending, setSending] = useState(false);
  const send = async () => {
    setSending(true);
    try {
      await api("/mail/send", { method: "POST", body: form });
      toast.success("Email enviado.");
      setForm({ to: "", subject: "", body: "" });
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <Modal open={open} onClose={onClose} title="Nuevo email" size="lg" footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button icon={Send} onClick={send} loading={sending} disabled={!form.to || !form.body.trim()}>Enviar</Button></>}>
      <Input label="Para" type="email" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
      <Input label="Asunto" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
      <Textarea label="Mensaje" rows={10} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} hint="Se añadirá tu firma con los datos de la empresa." />
    </Modal>
  );
};

const MailPage = () => {
  useSeo("Correo");
  const { id } = useParams();
  const navigate = useNavigate();
  const [folder, setFolder] = useState("inbox");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");
  const [pageToken, setPageToken] = useState("");
  const [compose, setCompose] = useState(false);
  const { data, loading, error, reload } = useApi(`/mail?folder=${folder}&q=${encodeURIComponent(query)}&pageToken=${pageToken}`);

  useEffect(() => {
    const t = setTimeout(() => { setQuery(q); setPageToken(""); }, 400);
    return () => clearTimeout(t);
  }, [q]);

  const threads = data?.data || [];

  return (
    <div className="stack">
      <PageHeader
        title="Correo"
        description={data?.account ? `Cuenta de Gmail: ${data.account}` : "Bandeja de Gmail de la empresa."}
        actions={
          <>
            <Button variant="secondary" icon={RefreshCw} onClick={reload} aria-label="Actualizar" />
            <Button icon={PenSquare} onClick={() => setCompose(true)}>Redactar</Button>
          </>
        }
      />
      {error ? (
        <div className="notice"><CircleAlert aria-hidden="true" /><div><strong>No se pudo conectar con Gmail.</strong> {error.message}</div></div>
      ) : (
        <>
          <div className="toolbar">
            <Segmented label="Carpeta" value={folder} onChange={(v) => { setFolder(v); setPageToken(""); }} options={FOLDERS} />
            <div className="search">
              <Search aria-hidden="true" />
              <input className="input" placeholder="Buscar en el correo" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {data?.unread > 0 && <span className="small muted">{data.unread} sin leer</span>}
          </div>
          <div className={`inbox ${id ? "has-selection" : ""}`}>
            <div className="inbox__list">
              {loading && !data ? (
                <PageLoader />
              ) : threads.length ? (
                <>
                  {threads.map((t) => {
                    const who = folder === "sent" ? `Para: ${parseAddress(t.to).name}` : parseAddress(t.from).name;
                    return (
                      <button key={t.id} className={`list-item ${t.id === id ? "is-active" : ""} ${t.unread ? "is-unread" : ""}`} onClick={() => navigate(`/admin/correo/${t.id}`)}>
                        <span className={`dot ${t.unread ? "" : "dot--off"}`} style={{ marginTop: 7 }} />
                        <div className="list-item__main">
                          <span className="list-item__title">{who}{t.count > 1 ? ` (${t.count})` : ""}</span>
                          <span className="list-item__sub" style={{ color: "var(--ink)" }}>{t.subject}</span>
                          <span className="list-item__sub">{t.snippet}</span>
                        </div>
                        <span className="list-item__meta">{relative(t.date)}</span>
                      </button>
                    );
                  })}
                  {data.nextPageToken && (
                    <div style={{ padding: 12 }}><Button variant="secondary" block onClick={() => setPageToken(data.nextPageToken)}>Más antiguos</Button></div>
                  )}
                </>
              ) : (
                <Empty icon={Mail} title="No hay correos" />
              )}
            </div>
            <div className="inbox__detail">
              {id ? <Thread key={id} id={id} onChange={reload} onBack={() => navigate("/admin/correo")} /> : <div className="inbox__empty"><Empty icon={Mail} title="Selecciona un correo" /></div>}
            </div>
          </div>
        </>
      )}
      <Compose open={compose} onClose={() => setCompose(false)} />
    </div>
  );
};

export default MailPage;
