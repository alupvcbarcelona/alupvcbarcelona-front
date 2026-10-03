import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, MessageSquareQuote, Trash2 } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Badge, Button, Card, Empty, PageLoader, Segmented, Stars } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api } from "../../services/api";
import { date } from "../../lib/format";

const ReviewsAdmin = () => {
  useSeo("Reseñas");
  const { data, loading, setData } = useApi("/reviews/admin/all");
  const [filter, setFilter] = useState("pending");
  const all = data?.data || [];
  const isPublic = (r) => r.approved !== false;
  const list = filter === "pending" ? all.filter((r) => !isPublic(r)) : filter === "public" ? all.filter(isPublic) : all;

  const update = async (review, approved) => {
    try {
      const res = await api(`/reviews/${review._id}`, { method: "PATCH", body: { approved } });
      setData((d) => ({ ...d, data: d.data.map((r) => (r._id === review._id ? res.review : r)) }));
      toast.success(res.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const remove = async (review) => {
    if (!window.confirm("¿Eliminar esta reseña definitivamente?")) return;
    try {
      await api(`/reviews/${review._id}`, { method: "DELETE" });
      setData((d) => ({ ...d, data: d.data.filter((r) => r._id !== review._id) }));
      toast.success("Reseña eliminada.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="stack">
      <PageHeader
        title="Reseñas"
        description="Las opiniones nuevas no se publican hasta que las apruebes."
        actions={
          <Segmented
            label="Filtro"
            value={filter}
            onChange={setFilter}
            options={[
              { value: "pending", label: `Pendientes (${all.filter((r) => !isPublic(r)).length})` },
              { value: "public", label: "Publicadas" },
              { value: "all", label: "Todas" },
            ]}
          />
        }
      />
      {loading ? (
        <PageLoader />
      ) : list.length ? (
        <div className="stack" style={{ gap: 12 }}>
          {list.map((r) => (
            <Card key={r._id}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                    <Stars value={r.stars} />
                    {isPublic(r) ? <Badge tone="success">Publicada</Badge> : <Badge tone="warning">Pendiente</Badge>}
                    <span className="small muted">{r.username}{r.location ? ` · ${r.location}` : ""} · {date(r.createdAt)}</span>
                  </div>
                  <h3 style={{ fontSize: 15, marginBottom: 4 }}>{r.title}</h3>
                  <p className="small" style={{ whiteSpace: "pre-wrap" }}>{r.description}</p>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  {isPublic(r) ? (
                    <Button size="sm" variant="secondary" icon={EyeOff} onClick={() => update(r, false)}>Ocultar</Button>
                  ) : (
                    <Button size="sm" icon={Eye} onClick={() => update(r, true)}>Publicar</Button>
                  )}
                  <Button size="sm" variant="ghost" icon={Trash2} aria-label="Eliminar" onClick={() => remove(r)} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Empty icon={MessageSquareQuote} title={filter === "pending" ? "No hay reseñas pendientes" : "No hay reseñas"} />
      )}
    </div>
  );
};

export default ReviewsAdmin;
