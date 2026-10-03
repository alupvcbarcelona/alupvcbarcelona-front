import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Lightbox from "../../components/site/Lightbox";
import WorkCard from "../../components/site/WorkCard";
import { Button, Empty, PageLoader } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { cdn } from "../../services/api";
import { date } from "../../lib/format";

const WorkDetail = () => {
  const { slug } = useParams();
  const { data, loading, error } = useApi(`/posts/${slug}`, { auth: false });
  const [lightbox, setLightbox] = useState(null);
  const post = data?.data;
  useSeo(post?.title || "Trabajo", post?.excerpt);

  if (loading) return <PageLoader />;
  if (error || !post) {
    return (
      <div className="container section">
        <Empty title="Trabajo no encontrado" action={<Button to="/trabajos" variant="secondary">Ver todos los trabajos</Button>} />
      </div>
    );
  }

  const images = post.images || [];
  const visible = images.slice(0, 3);
  const paragraphs = (post.content || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <section className="container" style={{ paddingTop: 40 }}>
        <Link to="/trabajos" className="small muted" style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <ArrowLeft size={16} /> Trabajos
        </Link>
        <span className="eyebrow" style={{ display: "block", marginTop: 24 }}>{post.category}</span>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", margin: "12px 0", maxWidth: "22ch" }}>{post.title}</h1>
        {post.excerpt && <p className="lead">{post.excerpt}</p>}

        {images.length > 0 && (
          <div className="work-detail__gallery">
            {visible.map((img, i) => (
              <button key={img.url} onClick={() => setLightbox(i)} aria-label={`Ampliar foto ${i + 1}`}>
                <img src={cdn(img.url, i === 0 ? 1400 : 700)} alt={img.alt || post.title} />
                {i === visible.length - 1 && images.length > visible.length && (
                  <span className="work-detail__more">+{images.length - visible.length} fotos</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="work-detail__layout">
          <div className="work-detail__content">
            {paragraphs.length ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p className="muted">Consulta las fotos del trabajo.</p>}
          </div>
          <aside className="work-detail__aside">
            <dl className="work-detail__meta">
              <div><dt>Categoría</dt><dd>{post.category}</dd></div>
              {post.location && <div><dt>Ubicación</dt><dd>{post.location}</dd></div>}
              {post.workDate && <div><dt>Fecha</dt><dd>{date(post.workDate, { month: "long", year: "numeric" })}</dd></div>}
              <div><dt>Fotos</dt><dd>{images.length}</dd></div>
            </dl>
            <p className="small muted">¿Quieres un trabajo similar?</p>
            <Button to="/contacto" block>Pedir presupuesto</Button>
          </aside>
        </div>
      </section>

      {data.related?.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 style={{ marginBottom: 32 }}>Trabajos relacionados</h2>
            <div className="works-grid">
              {data.related.map((p) => <WorkCard key={p._id} post={p} />)}
            </div>
          </div>
        </section>
      )}
      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </>
  );
};

export default WorkDetail;
