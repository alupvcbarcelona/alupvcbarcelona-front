import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button, Input } from "../../components/ui";
import { LogoMark } from "../../components/site/Logo";
import { useAuth } from "../../context/AuthContext";
import { useSeo } from "../../hooks/useDocumentTitle";

const Login = () => {
  useSeo("Acceso administrador");
  const { login, status } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (status === "auth") return <Navigate to={location.state?.from || "/admin"} replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate(location.state?.from || "/admin", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <aside className="login__aside">
        <span style={{ color: "#fff" }}><LogoMark className="admin-sidebar__logo" /></span>
        <div>
          <h2>Panel de gestión</h2>
          <p>Solicitudes, presupuestos, facturas, agenda, correo y trabajos publicados en un solo sitio.</p>
        </div>
        <span className="small">© {new Date().getFullYear()} AluPVC Barcelona</span>
      </aside>
      <main className="login__main">
        <form className="login__form" onSubmit={submit}>
          <div>
            <h1>Iniciar sesión</h1>
            <p className="muted small">Acceso exclusivo para el administrador.</p>
          </div>
          <Input label="Email" type="email" autoComplete="username" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Contraseña" type="password" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button type="submit" size="lg" icon={LogIn} loading={loading} block>Entrar</Button>
        </form>
      </main>
    </div>
  );
};

export default Login;
