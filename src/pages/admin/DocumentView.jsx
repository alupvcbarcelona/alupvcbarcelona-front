import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Ban, CalendarPlus, CircleAlert, Copy, Pencil, Printer, Receipt, RotateCcw, Send, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import EventModal from "../../components/admin/EventModal";
import { LogoMark } from "../../components/site/Logo";
import { Badge, Button, Empty, Input, Modal, PageLoader, Textarea } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api } from "../../services/api";
import { date, dateTime, money } from "../../lib/format";
import { DOC_LABEL, DOC_STATUS, STATUS_BY_TYPE } from "../../lib/labels";

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, setData } = useApi(`/documents/${id}`);
  const [sendOpen, setSendOpen] = useState(false);
  const [sendForm, setSendForm] = useState({ email: "", message: "" });
  const [busy, setBusy] = useState("");
  const [eventOpen, setEventOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [reason, setReason] = useState("");
  const doc = data?.data;
  useSeo(doc ? `${DOC_LABEL[doc.type]} ${doc.number}` : "Documento");

  if (loading) return <PageLoader />;
  if (error || !doc) return <Empty title="Documento no encontrado">{error?.message}</Empty>;

  const isQuote = doc.type === "presupuesto";
  const c = doc.company || {};
  const taxes = doc.taxBreakdown?.length ? doc.taxBreakdown : [{ rate: 21, amount: doc.totalIVA }];
  const cancelled = (!isQuote && doc.status === "anulado") || (isQuote && doc.status === "rechazado");

  const run = async (key, fn) => {
    setBusy(key);
    try {
      await fn();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy("");
    }
  };

  const setStatus = (status) =>
    run("status", async () => {
      const res = await api(`/documents/${id}`, { method: "PUT", body: { status } });
      setData(res);
      toast.success(`Estado: ${DOC_STATUS[status].label}`);
    });

  const send = () =>
    run("send", async () => {
      const res = await api(`/documents/${id}/send`, { method: "POST", body: sendForm });
      setData(res);
      setSendOpen(false);
      toast.success(res.message);
    });

  const cancel = () =>
    run("cancel", async () => {
      const res = await api(`/documents/${id}/cancel`, { method: "POST", body: { reason } });
      setData(res);
      setCancelOpen(false);
      setReason("");
      toast.success(res.message);
    });

  const toInvoice = () =>
    run("invoice", async () => {
      try {
        const res = await api(`/documents/${id}/invoice`, { method: "POST" });
        toast.success(res.message);
        navigate(`/admin/documentos/${res.data._id}`);
      } catch (err) {
        if (err.status === 409 && err.data?.data?._id) {
          toast.info(err.message);
          navigate(`/admin/documentos/${err.data.data._id}`);
        } else throw err;
      }
    });

  const duplicate = () => {
    const params = new URLSearchParams({ tipo: "presupuesto", nombre: doc.client.name, email: doc.client.email || "", telefono: doc.client.phone || "", ciudad: doc.client.city || "", titulo: doc.title || "" });
    navigate(`/admin/documentos/nuevo?${params}`);
  };

  const remove = () =>
    run("delete", async () => {
      if (!window.confirm(`¿Eliminar ${DOC_LABEL[doc.type].toLowerCase()} ${doc.number}?`)) return;
      await api(`/documents/${id}`, { method: "DELETE" });
      toast.success("Documento eliminado.");
      navigate(isQuote ? "/admin/presupuestos" : "/admin/facturas");
    });

  return (
    <div className="stack">
      <div className="no-print">
        <PageHeader
          back={<Link to={isQuote ? "/admin/presupuestos" : "/admin/facturas"} className="back-link"><ArrowLeft /> {isQuote ? "Presupuestos" : "Facturas"}</Link>}
          title={`${DOC_LABEL[doc.type]} ${doc.number}`}
          description={`${doc.client.name} · ${money(doc.grandTotal)}${doc.sentAt ? ` · enviado ${dateTime(doc.sentAt)}` : ""}`}
          actions={
            <>
              <select className="select select--sm" style={{ width: "auto" }} value={doc.status} onChange={(e) => setStatus(e.target.value)} aria-label="Estado" disabled={busy === "status"}>
                {[...new Set([...STATUS_BY_TYPE[doc.type], doc.status])].map((s) => <option key={s} value={s}>{DOC_STATUS[s]?.label || s}</option>)}
              </select>
              <Button variant="secondary" size="sm" icon={Printer} onClick={() => window.print()}>Imprimir / PDF</Button>
              {!cancelled && <Button variant="secondary" size="sm" icon={Pencil} to={`/admin/documentos/${id}/editar`}>Modificar</Button>}
              {!cancelled ? (
                <Button variant="danger" size="sm" icon={Ban} onClick={() => setCancelOpen(true)}>{isQuote ? "Cancelar" : "Anular factura"}</Button>
              ) : (
                <Button variant="secondary" size="sm" icon={RotateCcw} onClick={() => setStatus(isQuote ? "borrador" : "pendiente")}>Reactivar</Button>
              )}
              <Button size="sm" icon={Send} onClick={() => { setSendForm({ email: doc.client.email || "", message: "" }); setSendOpen(true); }}>Enviar</Button>
            </>
          }
        />
        <div className="toolbar">
          <Badge tone={DOC_STATUS[doc.status]?.tone}>{DOC_STATUS[doc.status]?.label || doc.status}</Badge>
          {doc.relatedDocument && (
            <Link to={`/admin/documentos/${doc.relatedDocument._id}`} className="small" style={{ color: "var(--accent)" }}>
              {DOC_LABEL[doc.relatedDocument.type]} {doc.relatedDocument.number}
            </Link>
          )}
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {isQuote && <Button size="sm" variant="secondary" icon={Receipt} onClick={toInvoice} loading={busy === "invoice"}>Convertir en factura</Button>}
            <Button size="sm" variant="ghost" icon={CalendarPlus} onClick={() => setEventOpen(true)}>Agendar</Button>
            {isQuote && <Button size="sm" variant="ghost" icon={Copy} onClick={duplicate}>Nuevo para este cliente</Button>}
            {(isQuote || doc.status === "borrador") && <Button size="sm" variant="ghost" icon={Trash2} onClick={remove}>Eliminar</Button>}
          </div>
        </div>
      </div>

      {cancelled && (
        <div className="notice no-print">
          <CircleAlert aria-hidden="true" />
          <div>
            <strong>{isQuote ? "Presupuesto cancelado." : "Factura anulada."}</strong>{" "}
            {isQuote ? "Ya no se puede aceptar." : "Conserva su número para mantener la numeración correlativa. Si hay que corregirla, crea una nueva factura."}
          </div>
        </div>
      )}

      <article className={`paper ${cancelled ? "paper--cancelled" : ""}`} data-stamp={isQuote ? "CANCELADO" : "ANULADA"}>
        <header className="paper__head">
          <div className="paper__brand"><LogoMark className="paper__logo" animated={false} /><div><strong>AluPVC</strong><span>Barcelona</span></div></div>
          <div className="paper__company">
            <strong>{c.name}</strong><br />
            {c.owner}<br />
            NIF {c.nif}<br />
            {c.address}{c.postalCode ? `, ${c.postalCode}` : ""} {c.city}<br />
            {c.phone} · {c.email}
          </div>
        </header>

        <div className="paper__title">
          <h2>{DOC_LABEL[doc.type]}</h2>
          <dl>
            <dt>Número</dt><dd><strong>{doc.number}</strong></dd>
            <dt>Fecha</dt><dd>{date(doc.issueDate, { day: "2-digit", month: "2-digit", year: "numeric" })}</dd>
            {isQuote && doc.expiryDate && <><dt>Válido hasta</dt><dd>{date(doc.expiryDate, { day: "2-digit", month: "2-digit", year: "numeric" })}</dd></>}
            {!isQuote && doc.dueDate && <><dt>Vencimiento</dt><dd>{date(doc.dueDate, { day: "2-digit", month: "2-digit", year: "numeric" })}</dd></>}
          </dl>
        </div>

        <div className="paper__parties">
          <div>
            <span className="paper__label">Cliente</span>
            <strong>{doc.client.name}</strong><br />
            {doc.client.nif && <>NIF {doc.client.nif}<br /></>}
            {doc.client.address && <>{doc.client.address}<br /></>}
            {[doc.client.postalCode, doc.client.city].filter(Boolean).join(" ")}
            {(doc.client.email || doc.client.phone) && <><br />{[doc.client.email, doc.client.phone].filter(Boolean).join(" · ")}</>}
          </div>
          {(doc.title || doc.workAddress) && (
            <div>
              <span className="paper__label">Trabajo</span>
              {doc.title && <strong>{doc.title}</strong>}
              {doc.workAddress && <><br />{doc.workAddress}</>}
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr><th>Concepto</th><th className="right">Cant.</th><th className="right">Precio</th><th className="right">Dto.</th><th className="right">IVA</th><th className="right">Importe</th></tr>
          </thead>
          <tbody>
            {doc.items.map((it, i) => (
              <tr key={i}>
                <td>{it.description}</td>
                <td className="right">{it.quantity.toLocaleString("es-ES")} {it.unit}</td>
                <td className="right">{money(it.unitPrice)}</td>
                <td className="right">{it.discount ? `${it.discount}%` : "—"}</td>
                <td className="right">{it.iva}%</td>
                <td className="right">{money(it.subtotal ?? it.quantity * it.unitPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div><span>Base imponible</span><span>{money(doc.subtotal)}</span></div>
          {taxes.map((t) => <div key={t.rate}><span>IVA {t.rate}%{doc.taxBreakdown?.length > 1 ? ` (base ${money(t.base)})` : ""}</span><span>{money(t.amount)}</span></div>)}
          {doc.irpf > 0 && <div><span>Retención IRPF {doc.irpf}%</span><span>−{money(doc.irpfAmount)}</span></div>}
          <div className="totals__grand"><span>Total</span><span>{money(doc.grandTotal)}</span></div>
        </div>

        <div className="paper__notes">
          {doc.observations && <div><span className="paper__label">Observaciones</span>{doc.observations}</div>}
          {doc.conditions && <div><span className="paper__label">{isQuote ? "Condiciones" : "Forma de pago"}</span>{doc.conditions}</div>}
          {!isQuote && c.iban && <div><span className="paper__label">Cuenta para transferencia</span><strong>{c.iban}</strong></div>}
          {isQuote && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 24 }}>
              <div><span className="paper__label">Aceptación del cliente</span><div style={{ borderBottom: "1px solid var(--line-strong)", height: 48 }} /><span className="small muted">Firma y fecha</span></div>
            </div>
          )}
        </div>

        <footer className="paper__footer">{c.name} · {c.website?.replace(/^https?:\/\//, "")}</footer>
      </article>

      <Modal
        open={sendOpen}
        onClose={() => setSendOpen(false)}
        title={`Enviar ${DOC_LABEL[doc.type].toLowerCase()} por email`}
        footer={<><Button variant="secondary" onClick={() => setSendOpen(false)}>Cancelar</Button><Button icon={Send} onClick={send} loading={busy === "send"} disabled={!sendForm.email}>Enviar</Button></>}
      >
        <Input label="Email del cliente" type="email" value={sendForm.email} onChange={(e) => setSendForm({ ...sendForm, email: e.target.value })} />
        <Textarea label="Mensaje (opcional)" rows={4} value={sendForm.message} onChange={(e) => setSendForm({ ...sendForm, message: e.target.value })} hint="Si lo dejas vacío se usa un texto estándar. Recibirás una copia en el correo de la empresa." />
      </Modal>

      <Modal
        open={cancelOpen}
        onClose={() => setCancelOpen(false)}
        title={isQuote ? `Cancelar presupuesto ${doc.number}` : `Anular factura ${doc.number}`}
        footer={<><Button variant="secondary" onClick={() => setCancelOpen(false)}>Volver</Button><Button variant="danger" icon={Ban} onClick={cancel} loading={busy === "cancel"}>{isQuote ? "Cancelar presupuesto" : "Anular factura"}</Button></>}
      >
        <p className="small">
          {isQuote
            ? "El presupuesto quedará como rechazado/cancelado. Podrás reactivarlo más adelante."
            : "La factura quedará anulada y dejará de contar como pendiente de cobro. No se elimina: las facturas emitidas deben conservar su número. Si necesitas corregirla, anúlala y crea una nueva, o simplemente pulsa «Modificar»."}
        </p>
        <Textarea label="Motivo (opcional)" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} hint="Se añade a las observaciones del documento." />
      </Modal>

      <EventModal
        open={eventOpen}
        onClose={() => setEventOpen(false)}
        defaults={{
          summary: `${isQuote ? "Medición" : "Instalación"} · ${doc.client.name}`,
          type: isQuote ? "medicion" : "instalacion",
          location: doc.workAddress || [doc.client.address, doc.client.city].filter(Boolean).join(", "),
          description: `${DOC_LABEL[doc.type]} ${doc.number}${doc.title ? ` · ${doc.title}` : ""}\n${doc.client.phone || ""}`,
          attendeeEmail: doc.client.email,
          documentId: doc._id,
        }}
      />
    </div>
  );
};

export default DocumentView;
