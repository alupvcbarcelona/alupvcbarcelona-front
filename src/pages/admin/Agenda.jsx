import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarDays, ChevronLeft, ChevronRight, CircleAlert, Plus } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import EventModal from "../../components/admin/EventModal";
import { Button, Card, Empty } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { time } from "../../lib/format";
import { EVENT_TYPES } from "../../lib/labels";

const DOW = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const pad = (n) => String(n).padStart(2, "0");
const key = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const Agenda = () => {
  useSeo("Agenda");
  const [params, setParams] = useSearchParams();
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [modal, setModal] = useState(params.get("nueva") ? { event: null, defaults: {} } : null);

  // GRID: SEMANAS COMPLETAS (LUNES A DOMINGO)
  const days = useMemo(() => {
    const start = new Date(month);
    start.setDate(1 - ((start.getDay() + 6) % 7));
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
  }, [month]);

  const from = days[0].toISOString();
  const to = new Date(days[41].getTime() + 86400000).toISOString();
  const { data, error, reload } = useApi(`/calendar/events?from=${from}&to=${to}`);
  const events = useMemo(() => data?.data || [], [data]);

  // CITAS POR DÍA (LAS DE DÍA COMPLETO OCUPAN DEL INICIO AL FIN, QUE ES EXCLUSIVO)
  const byDay = useMemo(() => {
    const map = new Map();
    const push = (k, e) => map.set(k, [...(map.get(k) || []), e]);
    events.forEach((e) => {
      if (!e.allDay) return push(key(new Date(e.start)), e);
      const end = new Date(`${e.end}T00:00`);
      for (let d = new Date(`${e.start}T00:00`); d < end; d.setDate(d.getDate() + 1)) push(key(d), e);
    });
    return map;
  }, [events]);

  const today = key(new Date());
  const upcoming = events.filter((e) => new Date(e.end || e.start) >= new Date()).slice(0, 8);

  const closeModal = () => {
    setModal(null);
    if (params.get("nueva")) setParams({}, { replace: true });
  };

  return (
    <div className="stack">
      <PageHeader
        title="Agenda"
        description="Citas sincronizadas con Google Calendar."
        actions={<Button icon={Plus} onClick={() => setModal({ event: null, defaults: {} })}>Nueva cita</Button>}
      />

      {error && (
        <div className="notice"><CircleAlert aria-hidden="true" /><div><strong>No se pudo conectar con Google Calendar.</strong> {error.message}</div></div>
      )}

      <div className="admin-grid">
        <div className="col-8 calendar">
          <div className="calendar__head">
            <h2>{month.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}</h2>
            <div style={{ display: "flex", gap: 4 }}>
              <Button variant="ghost" size="sm" icon={ChevronLeft} aria-label="Mes anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} />
              <Button variant="secondary" size="sm" onClick={() => setMonth(new Date(new Date().getFullYear(), new Date().getMonth(), 1))}>Hoy</Button>
              <Button variant="ghost" size="sm" icon={ChevronRight} aria-label="Mes siguiente" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} />
            </div>
          </div>
          <div className="calendar__grid">
            {DOW.map((d) => <div key={d} className="calendar__dow">{d}</div>)}
            {days.map((d) => {
              const list = byDay.get(key(d)) || [];
              return (
                <div
                  key={key(d)}
                  role="button"
                  tabIndex={0}
                  className={`calendar__day ${d.getMonth() !== month.getMonth() ? "is-other" : ""} ${key(d) === today ? "is-today" : ""}`}
                  onClick={() => setModal({ event: null, defaults: { date: key(d) } })}
                  onKeyDown={(e) => e.key === "Enter" && setModal({ event: null, defaults: { date: key(d) } })}
                  aria-label={`${d.toLocaleDateString("es-ES", { day: "numeric", month: "long" })}, ${list.length} citas`}
                >
                  <span className="calendar__num">{d.getDate()}</span>
                  {list.slice(0, 3).map((e) => (
                    <button
                      key={e.id}
                      className={`event-pill event-type--${e.type}`}
                      onClick={(ev) => {
                        ev.stopPropagation();
                        setModal({ event: e });
                      }}
                      title={e.summary}
                    >
                      {!e.allDay && `${time(e.start)} `}{e.summary}
                    </button>
                  ))}
                  {list.length > 3 && <span className="calendar__more">+{list.length - 3} más</span>}
                </div>
              );
            })}
          </div>
        </div>

        <Card className="col-4" title="Próximas citas" bodyClass="">
          {upcoming.length ? (
            <ul className="list agenda-list">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <button className={`list-item event-type--${e.type}`} style={{ width: "100%", textAlign: "left" }} onClick={() => setModal({ event: e })}>
                    <div className="agenda-date">
                      <strong>{new Date(e.allDay ? `${e.start}T00:00` : e.start).getDate()}</strong>
                      <span>{new Date(e.allDay ? `${e.start}T00:00` : e.start).toLocaleDateString("es-ES", { month: "short" })}</span>
                    </div>
                    <div className="list-item__main">
                      <span className="list-item__title">{e.summary}</span>
                      <span className="list-item__sub">{e.allDay ? "Todo el día" : `${time(e.start)} – ${time(e.end)}`} · {EVENT_TYPES[e.type]}</span>
                      {e.location && <span className="list-item__sub">{e.location}</span>}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <Empty icon={CalendarDays} title="No hay citas próximas este mes" />
          )}
        </Card>
      </div>

      <EventModal open={Boolean(modal)} event={modal?.event} defaults={modal?.defaults} onClose={closeModal} onSaved={reload} />
    </div>
  );
};

export default Agenda;
