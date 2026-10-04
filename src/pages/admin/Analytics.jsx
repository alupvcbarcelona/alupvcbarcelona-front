import { useState } from "react";
import { toast } from "react-toastify";
import { MapPinned } from "lucide-react";
import { Globe, MonitorSmartphone, MousePointerClick, Users } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { AreaChart, BarList, Stat } from "../../components/admin/Charts";
import { Button, Card, Empty, PageLoader, Segmented } from "../../components/ui";
import { api } from "../../services/api";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { country, dateTime, DEVICE_LABEL, number, percentChange } from "../../lib/format";

const RANGES = [
  { value: 7, label: "7 días" },
  { value: 30, label: "30 días" },
  { value: 90, label: "90 días" },
  { value: 365, label: "12 meses" },
];

const shortDay = (d, long) =>
  new Date(`${d}T12:00:00`).toLocaleDateString("es-ES", long ? { weekday: "short", day: "numeric", month: "short", year: "numeric" } : { day: "numeric", month: "short" });

const Analytics = () => {
  useSeo("Analítica");
  const [days, setDays] = useState(30);
  const [metric, setMetric] = useState("views");
  const { data, loading, error, reload } = useApi(`/visits/stats?days=${days}`);
  const [fixing, setFixing] = useState(false);
  const s = data?.data;

  // VUELVE A GEOLOCALIZAR LAS VISITAS GUARDADAS COMO RUMANÍA O SIN PAÍS (IPs DE DIGI ESPAÑA)
  const relocate = async () => {
    setFixing(true);
    try {
      const res = await api("/visits/relocate", { method: "POST", body: {} });
      toast.success(res.data.remaining ? `${res.message} Quedan ${res.data.remaining} IPs: vuelve a pulsar.` : res.message);
      reload();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setFixing(false);
    }
  };

  return (
    <div className="stack">
      <PageHeader
        title="Analítica"
        description="Visitas a la web pública: de dónde llegan, qué páginas ven y con qué dispositivo."
        actions={
          <>
            <Button variant="secondary" size="sm" icon={MapPinned} onClick={relocate} loading={fixing} title="Vuelve a calcular la ubicación de las visitas guardadas como Rumanía o sin país">
              Corregir ubicaciones
            </Button>
            <Segmented label="Periodo" value={days} onChange={setDays} options={RANGES} />
          </>
        }
      />

      {loading && !s ? (
        <PageLoader />
      ) : error ? (
        <Empty title="No se pudieron cargar las estadísticas">{error.message}</Empty>
      ) : (
        <>
          <div className="stats">
            <Stat label="Páginas vistas" value={number(s.totals.views)} change={percentChange(s.totals.views, s.previous.views)} hint="vs. periodo anterior" icon={MousePointerClick} />
            <Stat label="Visitantes únicos" value={number(s.totals.visitors)} change={percentChange(s.totals.visitors, s.previous.visitors)} hint="vs. periodo anterior" icon={Users} />
            <Stat label="Páginas por visitante" value={s.totals.visitors ? (s.totals.views / s.totals.visitors).toLocaleString("es-ES", { maximumFractionDigits: 1 }) : "0"} hint="media del periodo" icon={Globe} />
            <Stat label="Desde móvil" value={`${s.totals.views ? Math.round(((s.devices.find((d) => d.name === "mobile")?.views || 0) / s.totals.views) * 100) : 0}%`} hint="de las páginas vistas" icon={MonitorSmartphone} />
          </div>

          <Card
            title="Evolución"
            actions={<Segmented label="Métrica" value={metric} onChange={setMetric} options={[{ value: "views", label: "Páginas vistas" }, { value: "visitors", label: "Visitantes" }]} />}
          >
            <AreaChart data={s.byDay} x="date" y={metric} label={metric === "views" ? "Páginas vistas" : "Visitantes"} formatX={shortDay} format={(v) => number(v)} height={260} />
          </Card>

          <div className="admin-grid">
            <Card className="col-6" title="Países">
              <BarList items={s.countries} label={(i) => country(i.name)} format={number} />
            </Card>
            <Card className="col-6" title="Ciudades">
              <BarList items={s.cities} label={(i) => `${i.name} (${i.country})`} format={number} />
            </Card>
            <Card className="col-6" title="Páginas más vistas">
              <BarList items={s.pages} format={number} />
            </Card>
            <Card className="col-6" title="Origen de las visitas">
              <BarList items={s.referrers} format={number} empty="Todas las visitas son directas" />
            </Card>
            <Card className="col-4" title="Dispositivos">
              <BarList items={s.devices} label={(i) => DEVICE_LABEL[i.name] || i.name} format={number} />
            </Card>
            <Card className="col-4" title="Navegadores">
              <BarList items={s.browsers} format={number} />
            </Card>
            <Card className="col-4" title="Sistemas">
              <BarList items={s.os} format={number} />
            </Card>
            <Card className="col-12" title="Horas con más visitas">
              <BarList items={s.byHour.filter((h) => h.views).sort((a, b) => b.views - a.views).slice(0, 8)} label={(h) => `${String(h.hour).padStart(2, "0")}:00 – ${String(h.hour).padStart(2, "0")}:59`} format={number} />
            </Card>
          </div>

          <Card title="Últimas visitas" bodyClass="table-wrap">
            {s.recent.length ? (
              <table className="table">
                <thead><tr><th>Fecha</th><th>Página</th><th>Ubicación</th><th>IP</th><th>Dispositivo</th><th>Origen</th></tr></thead>
                <tbody>
                  {s.recent.map((v) => (
                    <tr key={v._id}>
                      <td className="nowrap">{dateTime(v.createdAt)}</td>
                      <td><strong>{v.path}</strong></td>
                      <td>{[v.city, country(v.country)].filter(Boolean).join(", ")}</td>
                      <td className="num nowrap" title={v.consent ? "IP completa (con consentimiento)" : "IP anonimizada"}>{v.ip || "—"}</td>
                      <td>{DEVICE_LABEL[v.device] || v.device} · {v.browser}</td>
                      <td>{v.referrer || "Directo"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Empty icon={MousePointerClick} title="Aún no hay visitas registradas" />
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default Analytics;
