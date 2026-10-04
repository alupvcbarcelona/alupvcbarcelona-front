import { useState } from "react";
import { CheckCircle2, MessageSquareQuote } from "lucide-react";
import ReviewCard from "../../components/site/ReviewCard";
import { GoogleG } from "../../components/site/GoogleLinks";
import { useCompany } from "../../context/CompanyContext";
import { Button, Empty, Input, PageLoader, Stars, Textarea } from "../../components/ui";
import { useApi } from "../../hooks/useApi";
import { useSeo } from "../../hooks/useDocumentTitle";
import { api } from "../../services/api";

const EMPTY = { username: "", location: "", title: "", description: "", stars: 5, website: "" };

const ReviewForm = () => {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await api("/reviews/create-review", { method: "POST", body: form, auth: false });
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <h3>¡Gracias por tu opinión!</h3>
        <p className="muted">La publicaremos en cuanto la revisemos.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field">
        <span className="field__label">Valoración</span>
        <div className="star-picker" role="radiogroup" aria-label="Valoración">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={form.stars === n} aria-label={`${n} estrellas`} onClick={() => setForm((f) => ({ ...f, stars: n }))}>
              <Stars value={n <= form.stars ? 1 : 0} size={28} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid-2">
        <Input label="Nombre *" required value={form.username} onChange={set("username")} maxLength={80} />
        <Input label="Localidad" value={form.location} onChange={set("location")} maxLength={80} />
        <Input label="Título *" className="span-2" required value={form.title} onChange={set("title")} maxLength={120} placeholder="Ej. Cambio de ventanas impecable" />
        <Textarea label="Tu experiencia *" className="span-2" required rows={5} value={form.description} onChange={set("description")} maxLength={2000} />
      </div>
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      {error && <p className="form-error" role="alert">{error}</p>}
      <Button type="submit" loading={status === "sending"}>Enviar opinión</Button>
    </form>
  );
};

const Reviews = () => {
  useSeo("Opiniones de clientes", "Opiniones reales de clientes de AluPVC Barcelona sobre la instalación y reparación de ventanas, persianas y mosquiteras.");
  const { data, loading } = useApi("/reviews", { auth: false });
  const company = useCompany();
  const reviews = data?.data || [];

  return (
    <>
      <section className="page-hero">
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <span className="eyebrow">Opiniones</span>
            <h1>La experiencia de nuestros clientes</h1>
          </div>
          {data?.total > 0 && (
            <div className="rating-summary">
              <strong>{data.average.toLocaleString("es-ES")}</strong>
              <div>
                <Stars value={data.average} />
                <span>{data.total} opiniones</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container">
          {company.googleReviewUrl && (
            <div className="google-card" style={{ marginBottom: 32 }}>
              <div className="google-card__text">
                <GoogleG size={28} />
                <div>
                  <strong>También estamos en Google</strong>
                  <span>Consulta nuestra ficha o deja tu valoración en Google Maps.</span>
                </div>
              </div>
              <div className="google-links">
                <Button href={company.googleMapsUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">Ver ficha</Button>
                <Button href={company.googleReviewUrl} target="_blank" rel="noopener noreferrer" size="sm">Escribir reseña en Google</Button>
              </div>
            </div>
          )}
          {loading ? (
            <PageLoader />
          ) : reviews.length ? (
            <div className="reviews-grid">
              {reviews.map((r) => <ReviewCard key={r._id} review={r} />)}
            </div>
          ) : (
            <Empty icon={MessageSquareQuote} title="Aún no hay opiniones publicadas" />
          )}
        </div>
      </section>

      <section className="section section--soft" id="escribir">
        <div className="container contact-layout">
          <div>
            <span className="eyebrow">Tu opinión</span>
            <h2 style={{ margin: "12px 0" }}>¿Hemos trabajado para ti?</h2>
            <p className="muted">Nos ayuda mucho saber cómo fue tu experiencia. Revisamos todas las opiniones antes de publicarlas.</p>
          </div>
          <div className="contact-panel">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;
