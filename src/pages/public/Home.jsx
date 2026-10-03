import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, MapPin, Phone, Plus } from "lucide-react";
import { Button, Stars } from "../../components/ui";
import SectionHeader from "../../components/site/SectionHeader";
import ServiceIcon from "../../components/site/ServiceIcon";
import WorkCard from "../../components/site/WorkCard";
import ReviewCard from "../../components/site/ReviewCard";
import Lightbox from "../../components/site/Lightbox";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { useCompany, useServices } from "../../context/CompanyContext";
import { cdn } from "../../services/api";
import { AREA, DIFFERENCES, FALLBACK_IMAGES, FAQS, PROCESS, SPACES } from "../../config/site";

export const CtaBand = () => {
  const company = useCompany();
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>¿Necesitas un presupuesto?</h2>
            <p>Cuéntanos qué necesitas y te preparamos un presupuesto detallado.</p>
          </div>
          <div className="cta-band__actions">
            <Button to="/contacto" variant="light" size="lg">Pedir presupuesto</Button>
            <Button href={`tel:${company.phone.replace(/\s/g, "")}`} variant="secondary" size="lg" icon={Phone}>
              Llamar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  useSeo(
    "Instalación y reparación de ventanas de aluminio y PVC en Barcelona y el Maresme",
    "Especialistas en instalación, reparación y mantenimiento de ventanas de aluminio y PVC en Barcelona y el Maresme. También instalamos y reparamos persianas y mosquiteras a medida con materiales de primera calidad y un excelente aislamiento térmico y acústico.",
  );
  const posts = useApi("/posts?limit=6", { auth: false });
  const reviews = useApi("/reviews", { auth: false });
  const [lightbox, setLightbox] = useState(null);
  const services = useServices();
  const company = useCompany();

  const works = posts.data?.data || [];
  const reviewList = (reviews.data?.data || []).slice(0, 3);
  const gallery = FALLBACK_IMAGES.slice(0, 8).map((url) => ({ url, alt: "Instalación de ventanas, persianas y mosquiteras · AluPVC Barcelona" }));

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="fade-up">
            <span className="eyebrow">Barcelona y Maresme</span>
            <h1>Ventanas, persianas y mosquiteras a medida</h1>
            <p className="lead">
              Nos especializamos en la instalación de ventanas, persianas y mosquiteras a medida para viviendas, oficinas
              y locales comerciales en Barcelona y el Maresme.
            </p>
            <p className="lead" style={{ marginTop: 12 }}>
              Instalamos, reparamos y realizamos el mantenimiento de ventanas de aluminio y PVC, persianas y mosquiteras,
              incluso si fueron instaladas por otra empresa.
            </p>
            <div className="hero__actions">
              <Button to="/contacto" size="lg" iconRight={ArrowRight}>Pedir presupuesto</Button>
              <Button to="/trabajos" size="lg" variant="secondary">Ver trabajos</Button>
            </div>
            <ul className="hero__trust">
              <li><Check aria-hidden="true" /> Aluminio y PVC</li>
              <li><Check aria-hidden="true" /> Materiales de primera calidad</li>
              <li><Check aria-hidden="true" /> Reparamos cualquier instalación</li>
            </ul>
          </div>
          <div className="hero__media fade-up" style={{ animationDelay: "0.1s" }}>
            <img src={cdn(FALLBACK_IMAGES[0], 1100)} alt="Instalación de ventanas de aluminio y PVC en Barcelona y el Maresme" fetchPriority="high" />
            {reviews.data?.total > 0 && (
              <div className="hero__badge">
                <strong>{reviews.data.average.toLocaleString("es-ES")}</strong>
                <div>
                  <Stars value={reviews.data.average} size={14} />
                  <div className="small muted">{reviews.data.total} opiniones</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PARA CUALQUIER ESPACIO */}
      <section className="section section--soft">
        <div className="container split">
          <div>
            <span className="eyebrow">Para cualquier espacio</span>
            <h2 style={{ margin: "12px 0 16px" }}>Ventanas, persianas y mosquiteras para cualquier espacio</h2>
            <p className="muted">
              Ofrecemos soluciones totalmente personalizadas para viviendas, oficinas y locales comerciales en Barcelona y
              el Maresme. Trabajamos con materiales de primera calidad para conseguir instalaciones duraderas, seguras y
              con un excelente aislamiento térmico y acústico.
            </p>
          </div>
          <ul className="spaces">
            {SPACES.map((sp) => (
              <li key={sp.title}>
                <ServiceIcon name={sp.icon} />
                <span>{sp.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Nuestros servicios" title="Un servicio integral para tus cerramientos" action={<Button to="/servicios" variant="secondary">Todos los servicios</Button>}>
            Realizamos un servicio integral para que tus cerramientos se mantengan siempre en perfecto estado.
          </SectionHeader>
          <div className="services-grid">
            {services.map((s) => (
              <Link key={s.slug} to={`/servicios#${s.slug}`} className="service-card">
                <ServiceIcon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <span className="service-card__more">Más información <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ NOS DIFERENCIA */}
      <section className="section section--soft">
        <div className="container split">
          <div>
            <span className="eyebrow">¿Qué nos diferencia?</span>
            <h2 style={{ margin: "12px 0 16px" }}>Instalamos y, sobre todo, reparamos</h2>
            <p className="muted">
              Además de instalar ventanas de aluminio y PVC, somos especialistas en su reparación y mantenimiento.
              Reparamos ventanas, persianas y mosquiteras aunque hayan sido instaladas por otras empresas, ofreciendo
              soluciones eficaces que alargan su vida útil y evitan sustituciones innecesarias.
            </p>
            <div className="hero__actions">
              <Button to="/contacto">Contáctanos</Button>
              <Button href={`tel:${company.phone.replace(/\s/g, "")}`} variant="secondary" icon={Phone}>Llámanos</Button>
            </div>
          </div>
          <ol className="differences">
            {DIFFERENCES.map((d) => (
              <li key={d}><Check aria-hidden="true" />{d}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROCESO */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Cómo trabajamos" title="Del primer contacto al trabajo terminado" />
          <ol className="process">
            {PROCESS.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TRABAJOS */}
      <section className="section section--soft">
        <div className="container">
          <SectionHeader eyebrow="Galería" title="Trabajos realizados" action={<Button to="/trabajos" variant="secondary">Ver todos</Button>} />
          {works.length > 0 ? (
            <div className="works-grid">
              {works.slice(0, 6).map((post) => <WorkCard key={post._id} post={post} />)}
            </div>
          ) : (
            <div className="gallery-grid">
              {gallery.map((img, i) => (
                <button key={img.url} onClick={() => setLightbox(i)} aria-label="Ampliar foto">
                  <img src={cdn(img.url, 500)} alt={img.alt} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OPINIONES */}
      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Opiniones"
            title="Lo que opinan nuestros clientes"
            action={
              reviews.data?.total > 0 ? (
                <div className="rating-summary">
                  <strong>{reviews.data.average.toLocaleString("es-ES")}</strong>
                  <div>
                    <Stars value={reviews.data.average} />
                    <span>{reviews.data.total} opiniones · <Link to="/opiniones" style={{ textDecoration: "underline" }}>ver todas</Link></span>
                  </div>
                </div>
              ) : (
                <Button to="/opiniones#escribir" variant="secondary">Deja tu opinión</Button>
              )
            }
          />
          {reviewList.length > 0 ? (
            <div className="reviews-grid">
              {reviewList.map((r) => <ReviewCard key={r._id} review={r} />)}
            </div>
          ) : (
            <p className="muted">¿Hemos trabajado para ti? <Link to="/opiniones#escribir" style={{ textDecoration: "underline" }}>Cuéntanos tu experiencia</Link>.</p>
          )}
        </div>
      </section>

      {/* ZONA + FAQ */}
      <section className="section section--soft">
        <div className="container split">
          <div>
            <span className="eyebrow">Preguntas frecuentes</span>
            <h2 style={{ margin: "12px 0 16px" }}>Resolvemos tus dudas</h2>
            <p className="muted"><MapPin size={16} style={{ display: "inline", verticalAlign: "-3px", marginRight: 6 }} />Trabajamos en {AREA}.</p>
          </div>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Plus aria-hidden="true" /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {/* ÁREA PRIVADA (INFORMACIÓN REQUERIDA PARA LA VERIFICACIÓN DE GOOGLE) */}
      <section className="container private-note">
        <h2>Área privada de administración</h2>
        <p>
          AluPVC Barcelona dispone de un área privada destinada exclusivamente al administrador de la empresa para la
          gestión interna de la actividad. La conexión con la cuenta de Google de la empresa (Gmail y Google Calendar) se
          utiliza únicamente para enviar y recibir correos con los clientes, enviar presupuestos y facturas y organizar las
          citas de trabajo. Los clientes no necesitan iniciar sesión ni utilizar una cuenta de Google para solicitar
          información, contactar con la empresa o pedir un presupuesto. Más información en la{" "}
          <Link to="/politicas-privacidad">política de privacidad</Link>.
        </p>
      </section>

      <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </>
  );
};

export default Home;
