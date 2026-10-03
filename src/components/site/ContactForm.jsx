import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Send } from "lucide-react";
import { Button, Input, Select, Textarea } from "../ui";
import { api } from "../../services/api";
import { useServices } from "../../context/CompanyContext";

const EMPTY = { name: "", email: "", phone: "", city: "", service: "", message: "", privacyAccepted: false, website: "" };

const ContactForm = ({ compact, initialService = "" }) => {
  const services = useServices();
  const [form, setForm] = useState({ ...EMPTY, service: initialService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [serverError, setServerError] = useState("");

  const set = (name) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Indica tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Indica un email válido.";
    if (form.message.trim().length < 10) next.message = "Cuéntanos un poco más (mínimo 10 caracteres).";
    if (!form.privacyAccepted) next.privacyAccepted = "Debes aceptar la política de privacidad.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerError("");
    try {
      await api("/contact", { method: "POST", body: form, auth: false });
      setStatus("sent");
      setForm(EMPTY);
    } catch (error) {
      setServerError(error.message);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <h3>Solicitud enviada</h3>
        <p className="muted">Gracias. Te hemos enviado un email de confirmación y te responderemos lo antes posible.</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>Enviar otra solicitud</Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="grid-2">
        <Input label="Nombre *" name="name" autoComplete="name" value={form.name} onChange={set("name")} error={errors.name} />
        <Input label="Teléfono" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} />
        <Input label="Email *" name="email" type="email" autoComplete="email" value={form.email} onChange={set("email")} error={errors.email} />
        <Input label="Localidad" name="city" autoComplete="address-level2" value={form.city} onChange={set("city")} placeholder="Ej. El Masnou" />
        {!compact && (
          <Select label="Servicio" className="span-2" value={form.service} onChange={set("service")}>
            <option value="">Selecciona un servicio</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Otro">Otro</option>
          </Select>
        )}
        <Textarea
          label="¿En qué podemos ayudarte? *"
          className="span-2"
          rows={5}
          value={form.message}
          onChange={set("message")}
          error={errors.message}
          placeholder="Describe el trabajo: tipo de ventana, medidas aproximadas, número de unidades…"
        />
      </div>

      {/* HONEYPOT ANTI-SPAM */}
      <input type="text" name="website" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <label className="check">
        <input type="checkbox" checked={form.privacyAccepted} onChange={set("privacyAccepted")} />
        <span>
          He leído y acepto la <Link to="/politicas-privacidad">política de privacidad</Link>. Usaremos tus datos solo para
          responder a tu solicitud.
        </span>
      </label>
      {errors.privacyAccepted && <span className="field__error">{errors.privacyAccepted}</span>}
      {serverError && <p className="form-error" role="alert">{serverError}</p>}

      <Button type="submit" size="lg" icon={Send} loading={status === "sending"}>
        Enviar solicitud
      </Button>
    </form>
  );
};

export default ContactForm;
