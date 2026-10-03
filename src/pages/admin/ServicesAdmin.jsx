import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowDown, ArrowUp, ExternalLink, Pencil, Plus, Trash2, Wrench, X } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import Uploader from "../../components/admin/Uploader";
import ServiceIcon, { SERVICE_ICONS } from "../../components/site/ServiceIcon";
import { Badge, Button, Card, Empty, Input, Modal, PageLoader, Switch, Textarea } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api, cdn } from "../../services/api";

const EMPTY = { title: "", icon: "Wrench", short: "", points: [], image: null, active: true };

// FORMULARIO (SE MONTA DE NUEVO CADA VEZ QUE SE ABRE)
const ServiceForm = ({ service, onClose, onSaved }) => {
  const [form, setForm] = useState(() => ({ ...EMPTY, ...service, pointsText: (service?.points || []).join("\n") }));
  const [saving, setSaving] = useState(false);
  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const save = async () => {
    if (!form.title.trim()) return toast.error("El nombre del servicio es obligatorio.");
    setSaving(true);
    const body = {
      title: form.title,
      icon: form.icon,
      short: form.short,
      points: form.pointsText.split("\n"),
      image: form.image || null,
      active: form.active,
    };
    try {
      const res = await api(service?._id ? `/services/${service._id}` : "/services", { method: service?._id ? "PUT" : "POST", body });
      toast.success(res.message);
      onSaved();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={service?._id ? "Editar servicio" : "Nuevo servicio"}
      footer={<><Button variant="secondary" onClick={onClose}>Cancelar</Button><Button onClick={save} loading={saving}>Guardar</Button></>}
    >
      <Input label="Nombre del servicio *" value={form.title} onChange={set("title")} placeholder="Ej. Puertas de aluminio" autoFocus />
      <Textarea label="Descripción breve" rows={2} maxLength={300} value={form.short} onChange={set("short")} hint="Aparece en la tarjeta del servicio en la página de inicio." />
      <Textarea label="Qué incluye" rows={5} value={form.pointsText} onChange={set("pointsText")} hint="Una línea por cada punto. Se muestran en la página de Servicios." />

      <div className="field">
        <span className="field__label">Icono</span>
        <div className="icon-picker" role="radiogroup" aria-label="Icono">
          {Object.keys(SERVICE_ICONS).map((name) => (
            <button key={name} type="button" role="radio" aria-checked={form.icon === name} aria-label={name} onClick={() => setForm((f) => ({ ...f, icon: name }))}>
              <ServiceIcon name={name} />
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="field__label">Foto (opcional)</span>
        {form.image?.url ? (
          <div className="media-item" style={{ maxWidth: 260 }}>
            <img src={cdn(form.image.url, 500)} alt="" />
            <div className="media-item__actions" style={{ opacity: 1 }}>
              <Button size="sm" variant="secondary" icon={X} aria-label="Quitar foto" onClick={() => setForm((f) => ({ ...f, image: null }))} />
            </div>
          </div>
        ) : (
          <Uploader multiple={false} label="Sube una foto del servicio" onUploaded={([img]) => setForm((f) => ({ ...f, image: { url: img.url, publicId: img.publicId } }))} />
        )}
      </div>

      <Switch label="Visible en la web" checked={form.active} onChange={set("active")} />
    </Modal>
  );
};

const ServicesAdmin = () => {
  useSeo("Servicios");
  const { data, loading, reload, setData } = useApi("/services/admin/all");
  const [editing, setEditing] = useState(null); // null | {} | service
  const services = data?.data || [];

  const move = async (index, dir) => {
    const list = [...services];
    [list[index], list[index + dir]] = [list[index + dir], list[index]];
    setData((d) => ({ ...d, data: list }));
    try {
      await api("/services/reorder", { method: "PUT", body: { ids: list.map((s) => s._id) } });
    } catch (err) {
      toast.error(err.message);
      reload();
    }
  };

  const toggle = async (service) => {
    try {
      await api(`/services/${service._id}`, { method: "PUT", body: { active: !service.active } });
      setData((d) => ({ ...d, data: d.data.map((s) => (s._id === service._id ? { ...s, active: !s.active } : s)) }));
      toast.success(service.active ? "Servicio oculto en la web." : "Servicio visible en la web.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (service) => {
    if (!window.confirm(`¿Eliminar el servicio «${service.title}»? Si solo quieres quitarlo de la web, ocúltalo.`)) return;
    try {
      await api(`/services/${service._id}`, { method: "DELETE" });
      toast.success("Servicio eliminado.");
      reload();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="stack">
      <PageHeader
        title="Servicios"
        description="Los servicios que ofreces. Aparecen en la página de inicio, en «Servicios», en el pie de página y en el formulario de contacto."
        actions={
          <>
            <Button variant="ghost" icon={ExternalLink} href="/servicios" target="_blank">Ver en la web</Button>
            <Button icon={Plus} onClick={() => setEditing({})}>Nuevo servicio</Button>
          </>
        }
      />
      <Card bodyClass="">
        {loading && !data ? (
          <PageLoader />
        ) : services.length ? (
          <ul className="list">
            {services.map((s, i) => (
              <li key={s._id} className="list-item" style={{ opacity: s.active ? 1 : 0.6 }}>
                <span className="service-admin__icon"><ServiceIcon name={s.icon} /></span>
                <div className="list-item__main">
                  <span className="list-item__title">{s.title}</span>
                  <span className="list-item__sub">{s.short || "Sin descripción"} · {s.points?.length || 0} puntos</span>
                </div>
                {s.active ? <Badge tone="success">Visible</Badge> : <Badge>Oculto</Badge>}
                <div style={{ display: "flex", gap: 2 }}>
                  <Button size="sm" variant="ghost" icon={ArrowUp} aria-label="Subir" disabled={i === 0} onClick={() => move(i, -1)} />
                  <Button size="sm" variant="ghost" icon={ArrowDown} aria-label="Bajar" disabled={i === services.length - 1} onClick={() => move(i, 1)} />
                  <Switch checked={s.active} onChange={() => toggle(s)} aria-label={s.active ? "Ocultar" : "Mostrar"} />
                  <Button size="sm" variant="ghost" icon={Pencil} aria-label="Editar" onClick={() => setEditing(s)} />
                  <Button size="sm" variant="ghost" icon={Trash2} aria-label="Eliminar" onClick={() => remove(s)} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <Empty icon={Wrench} title="No hay servicios" action={<Button icon={Plus} onClick={() => setEditing({})}>Añadir servicio</Button>} />
        )}
      </Card>
      {editing && <ServiceForm service={editing} onClose={() => setEditing(null)} onSaved={reload} />}
    </div>
  );
};

export default ServicesAdmin;
