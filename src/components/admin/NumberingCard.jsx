import { useState } from "react";
import { toast } from "react-toastify";
import { Hash } from "lucide-react";
import { Button, Card, Input, PageLoader } from "../ui";
import { useApi } from "../../hooks/useApi";
import { api } from "../../services/api";

const LABEL = { factura: "Facturas", presupuesto: "Presupuestos" };
const PREFIX = { factura: "F", presupuesto: "P" };
const format = (type, year, n) => `${PREFIX[type]}-${year}-${String(n || 0).padStart(4, "0")}`;

// ----------------------
// NUMERACIÓN DE DOCUMENTOS: SIGUIENTE NÚMERO DE FACTURA / PRESUPUESTO DEL AÑO EN CURSO
// ----------------------
const NumberingRow = ({ state, onSaved }) => {
  const [next, setNext] = useState(String(state.next));
  const [saving, setSaving] = useState(false);
  const value = Number(next);
  const valid = Number.isInteger(value) && value >= state.minNext && value <= 9999;

  const save = async () => {
    setSaving(true);
    try {
      const res = await api("/documents/numbering", { method: "PUT", body: { type: state.type, year: state.year, next: value } });
      toast.success(res.message);
      onSaved();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="numbering-row">
      <div>
        <strong>{LABEL[state.type]} {state.year}</strong>
        <span className="small muted">Último emitido: {state.last ? format(state.type, state.year, state.last) : "ninguno"}</span>
      </div>
      <Input
        label="Siguiente número"
        type="number"
        min={state.minNext}
        max={9999}
        value={next}
        onChange={(e) => setNext(e.target.value)}
        hint={valid ? `El próximo será ${format(state.type, state.year, value)}` : `Mínimo ${state.minNext}`}
        error={next && !valid ? `Debe ser ${state.minNext} o mayor` : ""}
      />
      <Button variant="secondary" onClick={save} loading={saving} disabled={!valid || value === state.next}>Aplicar</Button>
    </div>
  );
};

const NumberingCard = () => {
  const { data, loading, reload } = useApi("/documents/numbering");
  return (
    <Card title={<h2 className="card__title" style={{ display: "flex", gap: 8, alignItems: "center" }}><Hash size={18} /> Numeración de documentos</h2>}>
      <p className="small muted" style={{ marginBottom: 16 }}>
        Si ya emitiste facturas o presupuestos fuera del panel, indica aquí por qué número debe seguir la serie de este
        año. Solo se puede avanzar: no se permite un número igual o inferior a uno ya emitido, para no duplicar.
      </p>
      {loading && !data ? (
        <PageLoader />
      ) : (
        <div className="stack" style={{ gap: 12 }}>
          {(data?.data || []).map((state) => (
            <NumberingRow key={`${state.type}-${state.next}`} state={state} onSaved={reload} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default NumberingCard;
