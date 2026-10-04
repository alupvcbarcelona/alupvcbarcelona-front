import { Component } from "react";

// ----------------------
// EVITA LA PANTALLA EN BLANCO: SI UNA PANTALLA FALLA, MUESTRA UN AVISO CON BOTÓN DE RECARGA
// ----------------------
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Error en la interfaz:", error);
    // ARCHIVO DE UNA VERSIÓN ANTERIOR (TRAS UN DESPLIEGUE): RECARGAR UNA VEZ CON LA VERSIÓN NUEVA
    if (/dynamically imported module|Importing a module script failed|Failed to fetch|ChunkLoadError/i.test(error?.message || "")) {
      if (!sessionStorage.getItem("alupvc_reloaded")) {
        sessionStorage.setItem("alupvc_reloaded", "1");
        window.location.reload();
      }
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="page-loader" style={{ minHeight: "60vh", padding: 24, textAlign: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, marginBottom: 8 }}>Algo no ha cargado bien</h1>
          <p className="muted" style={{ marginBottom: 20 }}>Puede que haya una versión nueva de la web. Recarga la página para continuar.</p>
          <button className="btn btn--primary" onClick={() => window.location.reload()}>Recargar</button>
        </div>
      </div>
    );
  }
}
