import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FileText, Plus, Receipt, Search } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Badge, Button, Card, Empty, PageLoader } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { date, money } from "../../lib/format";
import { DOC_STATUS, STATUS_BY_TYPE } from "../../lib/labels";

const Documents = ({ type }) => {
  const isQuote = type === "presupuesto";
  useSeo(isQuote ? "Presupuestos" : "Facturas");
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const status = params.get("estado") || "";
  const year = params.get("año") || "";
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setQuery(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const { data, loading } = useApi(`/documents?type=${type}&status=${status}&year=${year}&q=${encodeURIComponent(query)}`);
  const docs = data?.data || [];
  const total = docs.filter((d) => d.status !== "anulado").reduce((s, d) => s + (d.grandTotal || 0), 0);
  const years = Array.from({ length: 4 }, (_, i) => new Date().getFullYear() - i);

  const setFilter = (name, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(name, value) : next.delete(name);
    setParams(next, { replace: true });
  };

  return (
    <div className="stack">
      <PageHeader
        title={isQuote ? "Presupuestos" : "Facturas"}
        description={isQuote ? "Crea, envía y haz seguimiento de tus presupuestos." : "Facturas emitidas y control de cobros."}
        actions={<Button icon={Plus} to={`/admin/documentos/nuevo?tipo=${type}`}>{isQuote ? "Nuevo presupuesto" : "Nueva factura"}</Button>}
      />

      <div className="toolbar">
        <div className="search">
          <Search aria-hidden="true" />
          <input className="input" placeholder="Buscar por número, cliente o trabajo" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <select className="select select--sm" style={{ width: "auto" }} value={status} onChange={(e) => setFilter("estado", e.target.value)} aria-label="Estado">
          <option value="">Todos los estados</option>
          {STATUS_BY_TYPE[type].map((s) => <option key={s} value={s}>{DOC_STATUS[s].label}</option>)}
        </select>
        <select className="select select--sm" style={{ width: "auto" }} value={year} onChange={(e) => setFilter("año", e.target.value)} aria-label="Año">
          <option value="">Todos los años</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <span className="small muted" style={{ marginLeft: "auto" }}>{docs.length} documentos · {money(total)}</span>
      </div>

      <Card bodyClass="table-wrap">
        {loading && !data ? (
          <PageLoader />
        ) : docs.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>Número</th><th>Cliente</th><th>Trabajo</th><th>Fecha</th>
                <th>{isQuote ? "Válido hasta" : "Vencimiento"}</th><th>Estado</th><th className="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d._id} className="is-link" onClick={() => navigate(`/admin/documentos/${d._id}`)}>
                  <td><strong>{d.number}</strong></td>
                  <td>{d.client?.name}</td>
                  <td className="muted">{d.title || "—"}</td>
                  <td className="nowrap">{date(d.issueDate)}</td>
                  <td className="nowrap">{date(isQuote ? d.expiryDate : d.dueDate)}</td>
                  <td><Badge tone={DOC_STATUS[d.status]?.tone}>{DOC_STATUS[d.status]?.label || d.status}</Badge></td>
                  <td className="right num"><strong>{money(d.grandTotal)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Empty
            icon={isQuote ? FileText : Receipt}
            title={isQuote ? "No hay presupuestos" : "No hay facturas"}
            action={<Button size="sm" to={`/admin/documentos/nuevo?tipo=${type}`}>Crear el primero</Button>}
          />
        )}
      </Card>
    </div>
  );
};

export default Documents;
