import { useState } from "react";
import { Images } from "lucide-react";
import WorkCard from "../../components/site/WorkCard";
import Lightbox from "../../components/site/Lightbox";
import { CtaBand } from "./Home";
import { Empty, PageLoader } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { cdn } from "../../services/api";
import { FALLBACK_IMAGES } from "../../config/site";

const Works = () => {
  useSeo("Trabajos realizados", "Galería de trabajos de instalación y reparación de ventanas, persianas, mosquiteras y reformas en Barcelona y el Maresme.");
  const [category, setCategory] = useState("");
  const [lightbox, setLightbox] = useState(null);
  const { data, loading } = useApi(`/posts${category ? `?category=${encodeURIComponent(category)}` : ""}`, { auth: false });

  const posts = data?.data || [];
  const categories = data?.categories || [];
  const gallery = FALLBACK_IMAGES.map((url) => ({ url, alt: "Trabajo de AluPVC Barcelona" }));
  const showFallback = !loading && posts.length === 0 && !category;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Trabajos</span>
          <h1>Proyectos que hablan por nosotros</h1>
          <p className="lead">Una selección de instalaciones, reparaciones y reformas realizadas para nuestros clientes.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container">
          {categories.length > 1 && (
            <div className="filters" role="group" aria-label="Filtrar por categoría">
              <button className="chip" aria-pressed={!category} onClick={() => setCategory("")}>Todos</button>
              {categories.map((c) => (
                <button key={c} className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
              ))}
            </div>
          )}

          {loading ? (
            <PageLoader />
          ) : showFallback ? (
            <div className="gallery-grid">
              {gallery.map((img, i) => (
                <button key={img.url} onClick={() => setLightbox(i)} aria-label="Ampliar foto">
                  <img src={cdn(img.url, 500)} alt={img.alt} loading="lazy" />
                </button>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <Empty icon={Images} title="Todavía no hay trabajos en esta categoría" />
          ) : (
            <div className="works-grid">
              {posts.map((post) => <WorkCard key={post._id} post={post} />)}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
      <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </>
  );
};

export default Works;
