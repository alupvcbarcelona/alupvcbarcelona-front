import { Link } from "react-router-dom";
import { Eye, Hammer, Plus, Star } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Badge, Button, Empty, PageLoader } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { cdn } from "../../services/api";
import { date } from "../../lib/format";

const Works = () => {
  useSeo("Trabajos");
  const { data, loading } = useApi("/posts/admin/all");
  const posts = data?.data || [];

  return (
    <div className="stack">
      <PageHeader
        title="Trabajos"
        description="Publica tus trabajos con fotos. Aparecen en la web en «Trabajos» y en la página de inicio."
        actions={<Button icon={Plus} to="/admin/trabajos/nuevo">Nuevo trabajo</Button>}
      />
      {loading ? (
        <PageLoader />
      ) : posts.length ? (
        <div className="media-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {posts.map((p) => (
            <Link key={p._id} to={`/admin/trabajos/${p._id}`} className="work-admin-card">
              {p.images?.[0] ? <img src={cdn(p.images[0].url, 600)} alt="" loading="lazy" /> : <div className="ph" />}
              <div className="work-admin-card__body">
                <span className="eyebrow">{p.category}</span>
                <h3>{p.title}</h3>
                <span className="small muted">{p.location || "Sin ubicación"} · {p.images?.length || 0} fotos</span>
              </div>
              <div className="work-admin-card__foot">
                {p.published ? <Badge tone="success">Publicado</Badge> : <Badge>Borrador</Badge>}
                <span className="small muted" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {p.featured && <Star size={14} aria-label="Destacado" />}
                  {date(p.updatedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <Empty icon={Hammer} title="Aún no has publicado trabajos" action={<Button icon={Plus} to="/admin/trabajos/nuevo">Publicar el primero</Button>}>
          Sube fotos de tus instalaciones y reformas para que los clientes vean tu trabajo.
        </Empty>
      )}
      {posts.some((p) => p.published) && (
        <div><Button variant="ghost" icon={Eye} href="/trabajos" target="_blank">Ver en la web</Button></div>
      )}
    </div>
  );
};

export default Works;
