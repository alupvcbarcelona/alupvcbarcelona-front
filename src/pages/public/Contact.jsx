import { useSearchParams } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "../../components/site/ContactForm";
import GoogleLinks from "../../components/site/GoogleLinks";
import { useCompany } from "../../context/CompanyContext";
import { useSeo } from "../../hooks/useDocumentTitle";

const Contact = () => {
  useSeo("Contacto y presupuesto", "Solicita presupuesto para ventanas de aluminio y PVC, persianas, mosquiteras o reformas en Barcelona y el Maresme.");
  const company = useCompany();
  const [params] = useSearchParams();
  const tel = company.phone.replace(/\s/g, "");
  const mapsUrl = company.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.address}, ${company.city}`)}`;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Contacto</span>
          <h1>Solicita tu presupuesto</h1>
          <p className="lead">Cuéntanos qué necesitas: tipo de trabajo, medidas aproximadas o fotos. Te responderemos lo antes posible.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="contact-info__item">
              <Phone aria-hidden="true" />
              <div><span>Teléfono</span><a href={`tel:${tel}`}>{company.phone}</a></div>
            </div>
            <div className="contact-info__item">
              <MessageCircle aria-hidden="true" />
              <div><span>WhatsApp</span><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a></div>
            </div>
            <div className="contact-info__item">
              <Mail aria-hidden="true" />
              <div><span>Email</span><a href={`mailto:${company.email}`}>{company.email}</a></div>
            </div>
            <div className="contact-info__item">
              <MapPin aria-hidden="true" />
              <div>
                <span>Dirección</span>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{company.address}, {company.city}</a>
              </div>
            </div>
            <div>
              <span className="small muted" style={{ display: "block", marginBottom: 8 }}>Encuéntranos en Google</span>
              <GoogleLinks size="sm" />
            </div>
          </div>
          <div className="contact-panel">
            <ContactForm initialService={params.get("servicio") || ""} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
