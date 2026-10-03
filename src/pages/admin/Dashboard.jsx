import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, FilePlus2, FileText, Inbox, MousePointerClick, Plus, Receipt } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { AreaChart, BarChart, Stat } from "../../components/admin/Charts";
import { Badge, Button, Card, Empty, PageLoader } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useAuth } from "../../context/AuthContext";
import { useSeo } from "../../hooks/useDocumentTitle";
import { date, money, number, relative, time } from "../../lib/format";
import { DOC_LABEL, DOC_STATUS, EVENT_TYPES } from "../../lib/labels";

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const shortDay = (d, long) => new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", long ? { weekday: "short", day: "numeric", month: "short" } : { day: "numeric", month: "short" });

const greeting = () => {
  const h = new Date().getHours();
  return h < 14 ? "Buenos días" : h < 21 ? "Buenas tardes" : "Buenas noches";
};

const Dashboard = () => {
  useSeo("Panel");
  const { user } = useAuth();
  const navigate = useNavigate();
  const summary = useApi("/settings/dashboard");
  const visits = useApi("/visits/stats?days=30");
  const [range] = useState(() => ({ from: new Date().toISOString(), to: new Date(Date.now() + 14 * 86400000).toISOString() }));
  const events = useApi(`/calendar/events?from=${range.from}&to=${range.to}`);

  if (summary.loading) return <PageLoader />;
  const s = summary.data?.data;
  if (!s) return <Empty title="No se pudo cargar el panel">{summary.error?.message}</Empty>;

  const upcoming = (events.data?.data || []).slice(0, 5);

  return (
    <div className="stack">
      <PageHeader
        title={`${greeting()}, ${user?.name || ""}`}
        description={new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
        actions={
          <>
            <Button variant="secondary" icon={CalendarDays} to="/admin/agenda?nueva=1">Nueva cita</Button>
            <Button icon={Plus} to="/admin/documentos/nuevo?tipo=presupuesto">Nuevo presupuesto</Button>
          </>
        }
      />

      <div className="stats">
        <Stat label="Solicitudes nuevas" value={number(s.messages.unread)} hint="pendientes de leer" icon={Inbox} to="/admin/solicitudes" />
        <Stat label="Visitas (30 días)" value={number(s.visits.last30)} hint={`${number(s.visits.visitors30)} visitantes únicos`} icon={MousePointerClick} to="/admin/analitica" />
        <Stat label="Presupuestos abiertos" value={money(s.quotes.openAmount)} hint={`${s.quotes.open} ${s.quotes.open === 1 ? "presupuesto" : "presupuestos"}${s.quotes.acceptanceRate !== null ? ` · ${s.quotes.acceptanceRate}% aceptados este año` : ""}`} icon={FileText} to="/admin/presupuestos" />
        <Stat label="Pendiente de cobro" value={money(s.invoices.pendingAmount)} hint={`${s.invoices.pending} ${s.invoices.pending === 1 ? "factura" : "facturas"}`} icon={Receipt} to="/admin/facturas?estado=pendiente" />
      </div>

      <div className="admin-grid">
        <Card className="col-8" title="Visitas a la web" actions={<Link to="/admin/analitica" className="small muted">Ver analítica</Link>}>
          {visits.data ? (
            <AreaChart data={visits.data.data.byDay} x="date" y="views" label="Visitas" formatX={shortDay} format={(v) => number(v)} />
          ) : (
            <p className="muted small">{visits.loading ? "Cargando…" : "Sin datos de visitas."}</p>
          )}
        </Card>

        <Card className="col-4" title="Próximas citas" actions={<Link to="/admin/agenda" className="small muted">Agenda</Link>} bodyClass="">
          {events.error ? (
            <div className="card__body"><p className="muted small">{events.error.message}</p></div>
          ) : upcoming.length ? (
            <ul className="list agenda-list">
              {upcoming.map((e) => (
                <li key={e.id} className={`list-item event-type--${e.type}`}>
                  <div className="agenda-date">
                    <strong>{new Date(e.start).getDate()}</strong>
                    <span>{new Date(e.start).toLocaleDateString("es-ES", { month: "short" })}</span>
                  </div>
                  <div className="list-item__main">
                    <span className="list-item__title">{e.summary}</span>
                    <span className="list-item__sub">{e.allDay ? "Todo el día" : time(e.start)} · {EVENT_TYPES[e.type]}{e.location ? ` · ${e.location}` : ""}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty icon={CalendarDays} title="Sin citas en los próximos 14 días" action={<Button size="sm" variant="secondary" to="/admin/agenda?nueva=1">Agendar</Button>} />
          )}
        </Card>

        <Card className="col-7" title={`Facturación ${new Date().getFullYear()}`} actions={<span className="small muted">Base imponible</span>}>
          <div style={{ display: "flex", gap: 32, marginBottom: 16, flexWrap: "wrap" }}>
            <div><span className="small muted">Facturado</span><div className="stat__value num">{money(s.invoices.yearInvoiced)}</div></div>
            <div><span className="small muted">Cobrado</span><div className="stat__value num">{money(s.invoices.yearPaid)}</div></div>
          </div>
          <BarChart
            data={s.invoices.byMonth}
            x="month"
            series={[{ key: "invoiced", label: "Facturado" }, { key: "paid", label: "Cobrado" }]}
            formatX={(m, long) => (long ? new Date(2000, m - 1).toLocaleDateString("es-ES", { month: "long" }) : MONTHS[m - 1])}
            format={(v, axis) => (axis ? (v >= 1000 ? `${(v / 1000).toLocaleString("es-ES", { maximumFractionDigits: 1 })}k` : number(v)) : money(v))}
          />
        </Card>

        <Card className="col-5" title="Últimas solicitudes" actions={<Link to="/admin/solicitudes" className="small muted">Ver todas</Link>} bodyClass="">
          {s.messages.latest.length ? (
            <ul className="list">
              {s.messages.latest.map((m) => (
                <li key={m._id}>
                  <Link to={`/admin/solicitudes/${m._id}`} className="list-item">
                    <span className={`dot ${m.status === "nuevo" ? "" : "dot--off"}`} />
                    <div className="list-item__main">
                      <span className="list-item__title">{m.name}{m.service ? ` · ${m.service}` : ""}</span>
                      <span className="list-item__sub">{m.message}</span>
                    </div>
                    <span className="list-item__meta">{relative(m.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty icon={Inbox} title="Sin solicitudes todavía" />
          )}
        </Card>

        <Card className="col-12" title="Últimos documentos" actions={<Button size="sm" variant="secondary" icon={FilePlus2} to="/admin/documentos/nuevo?tipo=factura">Nueva factura</Button>} bodyClass="table-wrap">
          {s.latestDocuments.length ? (
            <table className="table">
              <thead><tr><th>Número</th><th>Tipo</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th className="right">Total</th></tr></thead>
              <tbody>
                {s.latestDocuments.map((d) => (
                  <tr key={d._id} className="is-link" onClick={() => navigate(`/admin/documentos/${d._id}`)}>
                    <td><strong><Link to={`/admin/documentos/${d._id}`}>{d.number}</Link></strong></td>
                    <td>{DOC_LABEL[d.type]}</td>
                    <td>{d.client?.name}</td>
                    <td>{date(d.issueDate)}</td>
                    <td><Badge tone={DOC_STATUS[d.status]?.tone}>{DOC_STATUS[d.status]?.label || d.status}</Badge></td>
                    <td className="right num">{money(d.grandTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <Empty icon={FileText} title="Aún no hay presupuestos ni facturas" />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
