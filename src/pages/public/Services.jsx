import { Check } from "lucide-react";
import ServiceIcon from "../../components/site/ServiceIcon";
import { Button } from "../../components/ui";
import { CtaBand } from "./Home";
import { useSeo } from "../../hooks/useDocumentTitle";
import { useServices } from "../../context/CompanyContext";
import { cdn } from "../../services/api";

const Services = () => {
  const services = useServices();
  useSeo("Servicios", "Ventanas de aluminio y PVC, persianas, mosquiteras, cerramientos, reparaciones y reformas en Barcelona y el Maresme.");
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Servicios</span>
          <h1>Instalación, reparación y reformas</h1>
          <p className="lead">Instalamos, reparamos y realizamos el mantenimiento de ventanas de aluminio y PVC, persianas y mosquiteras, incluso si fueron instaladas por otra empresa.</p>
        </div>
      </section>
      <div className="container">
        {services.map((s) => (
          <section key={s.slug} id={s.slug} className="service-detail">
            <div className="service-detail__head">
              <ServiceIcon name={s.icon} />
              <h2>{s.title}</h2>
              <p className="muted">{s.short}</p>
              <Button to={`/contacto?servicio=${encodeURIComponent(s.title)}`} variant="secondary" size="sm" style={{ marginTop: 20 }}>
                Solicitar presupuesto
              </Button>
            </div>
            <div>
              {s.image?.url && <img src={cdn(s.image.url, 1000)} alt={s.title} className="service-detail__image" loading="lazy" />}
              <ul>
              {(s.points || []).map((p) => (
                <li key={p}><Check aria-hidden="true" />{p}</li>
              ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <CtaBand />
    </>
  );
};

export default Services;
