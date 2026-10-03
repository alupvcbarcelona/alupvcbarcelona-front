import { Button } from "../../components/ui";
import { useSeo } from "../../hooks/useDocumentTitle";

const NotFound = () => {
  useSeo("Página no encontrada");
  return (
    <section className="container not-found">
      <div>
        <strong>404</strong>
        <h1>Esta página no existe</h1>
        <p className="muted">Puede que el enlace haya cambiado o que la página se haya eliminado.</p>
        <Button to="/">Volver al inicio</Button>
      </div>
    </section>
  );
};

export default NotFound;
