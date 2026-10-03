import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowDown, ArrowLeft, ArrowUp, Plus, Save, Send, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Button, Card, Input, PageLoader, Select, Switch, Textarea } from "../../components/ui";
import { api } from "../../services/api";
import { useSeo } from "../../hooks/useDocumentTitle";
import { money, toInputDate } from "../../lib/format";
import { DOC_LABEL } from "../../lib/labels";

const UNITS = ["ud", "m", "m²", "ml", "h", "partida"];
const IVAS = [21, 10, 4, 0];
const round = (v) => Math.round((v + Number.EPSILON) * 100) / 100;
const newLine = (iva = 21) => ({ quantity: 1, unit: "ud", description: "", unitPrice: "", discount: 0, iva });

const calc = (items, irpf) => {
  const taxes = new Map();
  let base = 0;
  items.forEach((i) => {
    const sub = round((Number(i.quantity) || 0) * (Number(i.unitPrice) || 0) * (1 - (Number(i.discount) || 0) / 100));
    base += sub;
    taxes.set(i.iva, round((taxes.get(i.iva) || 0) + (sub * i.iva) / 100));
  });
  base = round(base);
  const iva = round([...taxes.values()].reduce((s, v) => s + v, 0));
  const ret = round((base * (Number(irpf) || 0)) / 100);
  return { base, taxes: [...taxes.entries()].sort((a, b) => b[0] - a[0]), iva, ret, total: round(base + iva - ret) };
};

const DocumentEditor = () => {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [saving, setSaving] = useState(false);
  const [send, setSend] = useState(false);
  const type = doc?.type || params.get("tipo") || "presupuesto";
  useSeo(id ? "Editar documento" : `Nuevo ${DOC_LABEL[type].toLowerCase()}`);

  useEffect(() => {
    if (id) {
      api(`/documents/${id}`).then(({ data }) => setDoc({ ...data, irpf: data.irpf || 0 })).catch((e) => toast.error(e.message));
      return;
    }
    api("/settings").then(({ data: settings }) => {
      const isQuote = type === "presupuesto";
      setDoc({
        type,
        title: params.get("titulo") || "",
        issueDate: new Date().toISOString(),
        client: {
          name: params.get("nombre") || "",
          nif: "",
          email: params.get("email") || "",
          phone: params.get("telefono") || "",
          address: "",
          postalCode: "",
          city: params.get("ciudad") || "",
        },
        workAddress: "",
        items: [newLine(settings.defaultIva)],
        irpf: 0,
        observations: "",
        conditions: isQuote ? settings.quoteConditions : settings.invoiceNotes,
        defaultIva: settings.defaultIva,
      });
    }).catch(() => setDoc({ type, client: { name: "" }, items: [newLine()], irpf: 0, issueDate: new Date().toISOString() }));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const totals = useMemo(() => (doc ? calc(doc.items, doc.irpf) : null), [doc]);
  if (!doc) return <PageLoader />;

  const isQuote = type === "presupuesto";
  const set = (name) => (e) => setDoc((d) => ({ ...d, [name]: e.target.value }));
  const setClient = (name) => (e) => setDoc((d) => ({ ...d, client: { ...d.client, [name]: e.target.value } }));
  const setLine = (index, name, value) => setDoc((d) => ({ ...d, items: d.items.map((it, i) => (i === index ? { ...it, [name]: value } : it)) }));
  const move = (index, dir) =>
    setDoc((d) => {
      const items = [...d.items];
      const [item] = items.splice(index, 1);
      items.splice(index + dir, 0, item);
      return { ...d, items };
    });

  const save = async (e) => {
    e?.preventDefault();
    if (!doc.client.name?.trim()) return toast.error("Indica el nombre del cliente.");
    if (!isQuote && !doc.client.nif?.trim()) return toast.error("El NIF del cliente es obligatorio en una factura.");
    if (doc.items.some((i) => !i.description.trim() || !(Number(i.quantity) > 0) || i.unitPrice === "")) {
      return toast.error("Revisa los conceptos: todos necesitan descripción, cantidad y precio.");
    }
    if (send && !doc.client.email) return toast.error("Para enviarlo, indica el email del cliente.");

    setSaving(true);
    const body = {
      type,
      title: doc.title,
      issueDate: doc.issueDate,
      expiryDate: doc.expiryDate || undefined,
      dueDate: doc.dueDate || undefined,
      client: doc.client,
      workAddress: doc.workAddress,
      items: doc.items.map((i) => ({ ...i, quantity: Number(i.quantity), unitPrice: Number(i.unitPrice), discount: Number(i.discount) || 0, iva: Number(i.iva) })),
      irpf: Number(doc.irpf) || 0,
      observations: doc.observations,
      conditions: doc.conditions,
      send,
    };
    try {
      const res = await api(id ? `/documents/${id}` : "/documents", { method: id ? "PUT" : "POST", body });
      if (id && send) await api(`/documents/${id}/send`, { method: "POST", body: {} });
      toast.success(send ? (res.emailSent === false ? "Guardado, pero no se pudo enviar el email." : "Guardado y enviado al cliente.") : res.message);
      navigate(`/admin/documentos/${res.data._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="stack" onSubmit={save}>
      <PageHeader
        back={<Link to={id ? `/admin/documentos/${id}` : isQuote ? "/admin/presupuestos" : "/admin/facturas"} className="back-link"><ArrowLeft /> Volver</Link>}
        title={id ? `Editar ${DOC_LABEL[type].toLowerCase()} ${doc.number}` : `Nuevo ${DOC_LABEL[type].toLowerCase()}`}
        description={id ? null : "El número se asigna automáticamente al guardar."}
        actions={
          <>
            <Switch label="Enviar al cliente al guardar" checked={send} onChange={(e) => setSend(e.target.checked)} />
            <Button type="submit" icon={send ? Send : Save} loading={saving}>{send ? "Guardar y enviar" : "Guardar"}</Button>
          </>
        }
      />

      {id && doc.type === "factura" && doc.status === "pagado" && (
        <div className="notice">
          <strong>Esta factura ya está marcada como pagada.</strong> Si cambias los importes, recuerda comunicárselo al cliente y a la gestoría.
        </div>
      )}

      <div className="admin-grid">
        <Card className="col-8" title="Cliente">
          <div className="grid-2">
            <Input label="Nombre o razón social *" value={doc.client.name} onChange={setClient("name")} />
            <Input label={isQuote ? "NIF / CIF" : "NIF / CIF *"} value={doc.client.nif || ""} onChange={setClient("nif")} />
            <Input label="Email" type="email" value={doc.client.email || ""} onChange={setClient("email")} />
            <Input label="Teléfono" value={doc.client.phone || ""} onChange={setClient("phone")} />
            <Input label="Dirección" className="span-2" value={doc.client.address || ""} onChange={setClient("address")} />
            <Input label="Código postal" value={doc.client.postalCode || ""} onChange={setClient("postalCode")} />
            <Input label="Localidad" value={doc.client.city || ""} onChange={setClient("city")} />
          </div>
        </Card>
        <Card className="col-4" title="Datos del documento">
          <div className="stack" style={{ gap: 16 }}>
            <Input label="Trabajo" value={doc.title || ""} onChange={set("title")} placeholder="Ej. Cambio de ventanas del salón" />
            <Input label="Dirección de la obra" value={doc.workAddress || ""} onChange={set("workAddress")} hint="Si es distinta de la del cliente." />
            <Input label="Fecha" type="date" value={toInputDate(doc.issueDate)} onChange={(e) => setDoc({ ...doc, issueDate: e.target.value })} disabled={Boolean(id)} />
            {isQuote ? (
              <Input label="Válido hasta" type="date" value={toInputDate(doc.expiryDate)} onChange={set("expiryDate")} hint="Por defecto, 30 días." />
            ) : (
              <Input label="Vencimiento" type="date" value={toInputDate(doc.dueDate)} onChange={set("dueDate")} hint="Por defecto, 15 días." />
            )}
          </div>
        </Card>
      </div>

      <Card title="Conceptos" actions={<Button size="sm" variant="secondary" icon={Plus} onClick={() => setDoc({ ...doc, items: [...doc.items, newLine(doc.defaultIva || 21)] })}>Añadir línea</Button>}>
        <div className="lines">
          <div className="line-row line-row--head">
            <span /><span>Descripción</span><span>Cantidad</span><span>Unidad</span><span>Precio (sin IVA)</span><span>Dto. %</span><span>IVA</span><span style={{ textAlign: "right" }}>Importe</span><span />
          </div>
          {doc.items.map((item, i) => {
            const sub = (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0) * (1 - (Number(item.discount) || 0) / 100);
            return (
              <div key={i} className="line-row">
                <span className="line-row__num">{i + 1}</span>
                <textarea className="input" rows={1} aria-label="Descripción" placeholder="Descripción del trabajo o material" value={item.description} onChange={(e) => setLine(i, "description", e.target.value)} />
                <input className="input" type="number" min="0" step="any" aria-label="Cantidad" value={item.quantity} onChange={(e) => setLine(i, "quantity", e.target.value)} />
                <select className="select" aria-label="Unidad" value={item.unit} onChange={(e) => setLine(i, "unit", e.target.value)}>
                  {UNITS.map((u) => <option key={u}>{u}</option>)}
                </select>
                <input className="input" type="number" min="0" step="0.01" aria-label="Precio unitario" placeholder="0,00" value={item.unitPrice} onChange={(e) => setLine(i, "unitPrice", e.target.value)} />
                <input className="input" type="number" min="0" max="100" step="any" aria-label="Descuento" value={item.discount} onChange={(e) => setLine(i, "discount", e.target.value)} />
                <select className="select" aria-label="IVA" value={item.iva} onChange={(e) => setLine(i, "iva", Number(e.target.value))}>
                  {IVAS.map((v) => <option key={v} value={v}>{v}%</option>)}
                </select>
                <span className="line-row__total">{money(sub)}</span>
                <div className="line-row__move">
                  {doc.items.length > 1 ? (
                    <>
                      <Button size="sm" variant="ghost" icon={i === 0 ? ArrowDown : ArrowUp} aria-label="Mover" onClick={() => move(i, i === 0 ? 1 : -1)} />
                      <Button size="sm" variant="ghost" icon={Trash2} aria-label="Eliminar línea" onClick={() => setDoc({ ...doc, items: doc.items.filter((_, j) => j !== i) })} />
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginTop: 24, alignItems: "flex-start" }}>
          <Select label="Retención IRPF" value={doc.irpf} onChange={set("irpf")} style={{ width: 200 }} hint="Solo si el cliente es empresa o profesional.">
            <option value={0}>Sin retención</option>
            <option value={7}>7%</option>
            <option value={15}>15%</option>
          </Select>
          <div className="totals">
            <div><span>Base imponible</span><span>{money(totals.base)}</span></div>
            {totals.taxes.map(([rate, amount]) => <div key={rate}><span>IVA {rate}%</span><span>{money(amount)}</span></div>)}
            {totals.ret > 0 && <div><span>Retención IRPF {doc.irpf}%</span><span>−{money(totals.ret)}</span></div>}
            <div className="totals__grand"><span>Total</span><span>{money(totals.total)}</span></div>
          </div>
        </div>
      </Card>

      <div className="admin-grid">
        <Card className="col-6" title="Observaciones">
          <Textarea rows={5} value={doc.observations || ""} onChange={set("observations")} aria-label="Observaciones" placeholder="Detalles del trabajo, plazos, materiales…" />
        </Card>
        <Card className="col-6" title={isQuote ? "Condiciones" : "Forma de pago y notas"}>
          <Textarea rows={5} value={doc.conditions || ""} onChange={set("conditions")} aria-label="Condiciones" hint="El texto por defecto se cambia en Ajustes." />
        </Card>
      </div>
    </form>
  );
};

export default DocumentEditor;
