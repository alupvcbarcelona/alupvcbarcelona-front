import { useState } from "react";
import { Check } from "lucide-react";
import { Button, Empty, Modal, PageLoader } from "../ui";
import { useApi } from "../../hooks/useApi";
import { cdn } from "../../services/api";

// ELEGIR FOTOS YA SUBIDAS A CLOUDINARY
const MediaPicker = ({ open, onClose, onPick, exclude = [] }) => {
  const { data, loading, error } = useApi("/media", { skip: !open });
  const [selected, setSelected] = useState([]);
  const images = (data?.data?.images || []).filter((i) => !exclude.includes(i.publicId));

  const toggle = (img) => setSelected((s) => (s.some((x) => x.publicId === img.publicId) ? s.filter((x) => x.publicId !== img.publicId) : [...s, img]));

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Biblioteca de fotos"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button disabled={!selected.length} onClick={() => { onPick(selected.map((s) => ({ url: s.url, publicId: s.publicId, alt: "" }))); setSelected([]); onClose(); }}>
            Añadir {selected.length || ""}
          </Button>
        </>
      }
    >
      {loading ? (
        <PageLoader />
      ) : error ? (
        <Empty title="No se pudo cargar la biblioteca">{error.message}</Empty>
      ) : images.length ? (
        <div className="media-grid">
          {images.map((img) => {
            const isSel = selected.some((s) => s.publicId === img.publicId);
            return (
              <button key={img.publicId} type="button" className={`media-item ${isSel ? "is-selected" : ""}`} onClick={() => toggle(img)}>
                <img src={cdn(img.url, 300)} alt="" loading="lazy" />
                {isSel && <span className="media-item__check"><Check /></span>}
                <span className="media-item__meta"><span>{img.usedBy || "Sin usar"}</span></span>
              </button>
            );
          })}
        </div>
      ) : (
        <Empty title="No hay fotos en la biblioteca" />
      )}
    </Modal>
  );
};

export default MediaPicker;
