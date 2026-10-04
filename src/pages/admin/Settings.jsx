import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KeyRound, Save } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { Button, Card, Input, PageLoader, Select, Textarea } from "../../components/ui";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useSeo } from "../../hooks/useDocumentTitle";

const Settings = () => {
  useSeo("Ajustes");
  const { user, setUser } = useAuth();
  const [company, setCompany] = useState(null);
  const [profile, setProfile] = useState({ name: user?.name || "", lastname: user?.lastname || "", email: user?.email || "" });
  const [password, setPassword] = useState({ currentPassword: "", password: "", confirm: "" });
  const [busy, setBusy] = useState("");

  useEffect(() => {
    api("/settings").then(({ data }) => setCompany(data)).catch((e) => toast.error(e.message));
  }, []);

  if (!company) return <PageLoader />;
  const set = (name) => (e) => setCompany((c) => ({ ...c, [name]: e.target.value }));

  const run = async (key, fn) => {
    setBusy(key);
    try {
      await fn();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy("");
    }
  };

  const saveCompany = (e) => {
    e.preventDefault();
    run("company", async () => {
      const res = await api("/settings", { method: "PUT", body: { ...company, defaultIva: Number(company.defaultIva) } });
      setCompany(res.data);
      toast.success(res.message);
    });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    run("profile", async () => {
      const res = await api("/user/profile", { method: "PUT", body: profile });
      setUser(res.user);
      toast.success(res.message);
    });
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (password.password !== password.confirm) return toast.error("Las contraseñas no coinciden.");
    run("password", async () => {
      const res = await api("/user/update-password", { method: "PUT", body: password });
      setPassword({ currentPassword: "", password: "", confirm: "" });
      toast.success(res.message);
    });
  };

  return (
    <div className="stack">
      <PageHeader title="Ajustes" description="Datos de la empresa que aparecen en la web, en los emails y en presupuestos y facturas." />

      <form onSubmit={saveCompany} className="stack">
        <Card title="Datos de la empresa" actions={<Button type="submit" size="sm" icon={Save} loading={busy === "company"}>Guardar</Button>}>
          <div className="grid-2">
            <Input label="Nombre comercial" value={company.name} onChange={set("name")} />
            <Input label="Titular" value={company.owner} onChange={set("owner")} />
            <Input label="NIF" value={company.nif} onChange={set("nif")} />
            <Input label="Teléfono" value={company.phone} onChange={set("phone")} />
            <Input label="Email" type="email" value={company.email} onChange={set("email")} hint="Recibe las copias de presupuestos y los avisos de contacto." />
            <Input label="Web" value={company.website} onChange={set("website")} />
            <Input label="Dirección" className="span-2" value={company.address} onChange={set("address")} />
            <Input label="Código postal" value={company.postalCode} onChange={set("postalCode")} />
            <Input label="Localidad" value={company.city} onChange={set("city")} />
            <Input label="Logo (URL)" className="span-2" value={company.logo} onChange={set("logo")} hint="Se usa en la cabecera de los emails." />
          </div>
        </Card>

        <Card title="Google (Maps y reseñas)" actions={<Button type="submit" size="sm" icon={Save} loading={busy === "company"}>Guardar</Button>}>
          <div className="grid-2">
            <Input label="Enlace a Google Maps" className="span-2" value={company.googleMapsUrl || ""} onChange={set("googleMapsUrl")} hint="Se muestra como «Ver en Google Maps» / «Cómo llegar» en la web." />
            <Input label="Enlace para dejar reseñas" className="span-2" value={company.googleReviewUrl || ""} onChange={set("googleReviewUrl")} hint="Recomendado: en tu Perfil de Empresa de Google pulsa «Pedir reseñas» y pega aquí el enlace (g.page/r/…/review). Así el cliente va directo a escribir la reseña." />
          </div>
        </Card>

        <Card title="Presupuestos y facturas" actions={<Button type="submit" size="sm" icon={Save} loading={busy === "company"}>Guardar</Button>}>
          <div className="grid-2">
            <Input label="IBAN para transferencias" value={company.iban || ""} onChange={set("iban")} placeholder="ES00 0000 0000 0000 0000 0000" hint="Aparece en las facturas." />
            <Select label="IVA por defecto" value={company.defaultIva} onChange={set("defaultIva")} options={[{ value: 21, label: "21% general" }, { value: 10, label: "10% reformas de vivienda" }, { value: 4, label: "4%" }, { value: 0, label: "0% exento" }]} />
            <Textarea label="Condiciones por defecto de los presupuestos" className="span-2" rows={4} value={company.quoteConditions} onChange={set("quoteConditions")} />
            <Textarea label="Notas por defecto de las facturas" className="span-2" rows={3} value={company.invoiceNotes} onChange={set("invoiceNotes")} />
          </div>
        </Card>
      </form>

      <div className="admin-grid">
        <form className="col-6" onSubmit={saveProfile}>
          <Card title="Tu perfil" actions={<Button type="submit" size="sm" variant="secondary" loading={busy === "profile"}>Guardar</Button>}>
            <div className="grid-2">
              <Input label="Nombre" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              <Input label="Apellidos" value={profile.lastname} onChange={(e) => setProfile({ ...profile, lastname: e.target.value })} />
              <Input label="Email de acceso" type="email" className="span-2" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
            </div>
          </Card>
        </form>
        <form className="col-6" onSubmit={savePassword}>
          <Card title="Cambiar contraseña" actions={<Button type="submit" size="sm" variant="secondary" icon={KeyRound} loading={busy === "password"}>Actualizar</Button>}>
            <div className="stack" style={{ gap: 16 }}>
              <Input label="Contraseña actual" type="password" autoComplete="current-password" value={password.currentPassword} onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
              <div className="grid-2">
                <Input label="Nueva contraseña" type="password" autoComplete="new-password" minLength={8} value={password.password} onChange={(e) => setPassword({ ...password, password: e.target.value })} hint="Mínimo 8 caracteres." />
                <Input label="Repetir" type="password" autoComplete="new-password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} />
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Settings;
